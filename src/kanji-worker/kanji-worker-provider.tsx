import {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import KANJI_WORKER_SINGLETON from "@/kanji-worker/kanji-worker-promise-wrapper";
import { useContextWithCatch } from "../providers/helpers";
import {
  KanjiCacheType,
  KanjiInfoRequestType,
  KanjiPartKeywordCacheType,
  KanjiPhoneticCacheType,
} from "@/lib/kanji-info-types";
import { KanjiExtendedInfo, KanjiMainInfo } from "@/lib/kanji-worker-constants";
import { useSearchSettings } from "../providers/search-settings-provider";
import { SearchSettings } from "@/lib/settings";

const requestWorker = KANJI_WORKER_SINGLETON.request;
type KanjiRequestFn = (
  k: string,
  type: KanjiInfoRequestType
) => Promise<unknown>;

type GetBasicKanjiInfo = (kanji: string) => KanjiMainInfo | null;

const ActionContext = createContext<KanjiRequestFn | null>(null);
const IsReadyContext = createContext<boolean>(false);
const GetBasicKanjiInfoContext = createContext<GetBasicKanjiInfo | null>(null);

export function KanjiWorkerProvider({ children }: { children: ReactNode }) {
  const [isReady, setIsReady] = useState(false);
  const hasMounted = useRef(false);

  const kanjiCacheRef = useRef<KanjiCacheType | null>(null);
  const partKeywordCacheRef = useRef<KanjiPartKeywordCacheType | null>(null);
  const phoneticCacheRef = useRef<KanjiPhoneticCacheType | null>(null);

  // populate kanji worker cache
  useEffect(() => {
    if (hasMounted.current) {
      return;
    }

    hasMounted.current = true;

    let mainReady = false;
    let partReady = false;
    let phoneticReady = false;
    let extendedReady = false;
    let segmentedVocabReady = false;

    const checkIfDone = () => {
      if (
        mainReady &&
        partReady &&
        phoneticReady &&
        extendedReady &&
        segmentedVocabReady
      ) {
        setIsReady(true);
        return;
      }
    };

    requestWorker({ type: "kanji-main-map" }).then((r) => {
      const res = r as Record<string, KanjiMainInfo>;
      kanjiCacheRef.current = {};
      Object.keys(res).map((item) => {
        const info = res[item];
        // I don't know why typescript cannot detect this
        if (kanjiCacheRef.current == null) {
          console.error(
            "Please check your logic. kanjiCacheRef.current shouldn't be null at this point"
          );
          return;
        }

        kanjiCacheRef.current[item] = { main: info };
      });
      mainReady = true;
      checkIfDone();
    });

    requestWorker({
      type: "part-keyword-map",
    }).then((r) => {
      partKeywordCacheRef.current = r as KanjiPartKeywordCacheType;
      partReady = true;
      checkIfDone();
    });

    requestWorker({ type: "phonetic-map" }).then((r) => {
      phoneticCacheRef.current = r as KanjiPhoneticCacheType;
      phoneticReady = true;
      checkIfDone();
    });

    requestWorker({
      type: "initialize-extended-kanji-map",
    }).then(() => {
      extendedReady = true;
      checkIfDone();
    });

    requestWorker({ type: "initalize-segmented-vocab-map" }).then(() => {
      segmentedVocabReady = true;
      checkIfDone();
    });
  }, []);

  // function that can accept kanji info requests
  const kanjiInfoRequest = useCallback(
    async (kanji: string, type: KanjiInfoRequestType) => {
      if (kanjiCacheRef.current == null) {
        throw Error("kanjiCache not initialized");
      }

      const kanjiInfo = kanjiCacheRef.current[kanji];
      if (kanjiInfo == null) {
        throw Error(`${kanji}:No information about this Kanji `);
      }

      if (type === "item-card") {
        return kanjiInfo.main;
      }

      const getNecessaryValues = () => {
        if (kanjiInfo.extended == null) {
          throw Error(
            "Please fix logic. By the time you get here. kanjiInfo.extended should exist"
          );
        }
        if (type === "frequency-ranks") {
          return kanjiInfo.extended.frequency;
        }

        if (type === "hover-card") {
          const vocab = kanjiInfo.extended.mainVocab;
          const phonetic =
            kanjiInfo.extended.phonetic == null
              ? undefined
              : {
                  phonetic: kanjiInfo.extended.phonetic,
                  sound:
                    phoneticCacheRef?.current?.[kanjiInfo.extended.phonetic],
                  keyword:
                    kanjiCacheRef?.current?.[kanjiInfo.extended.phonetic]?.main
                      .keyword ??
                    partKeywordCacheRef?.current?.[kanjiInfo.extended.phonetic],
                };

          const getPartsList = (word: string) => {
            const parts = word.split("");
            const partCache: Record<string, string> = {};
            parts.forEach((part) => {
              const keyword =
                kanjiCacheRef?.current?.[part]?.main.keyword ??
                partKeywordCacheRef?.current?.[part];

              if (keyword) {
                partCache[part] = keyword;
              }
            });

            return Object.keys(partCache).map((part) => {
              return { kanji: part, keyword: partCache[part] };
            });
          };
          const result = {
            ...kanjiInfo.main,
            mainVocab: {
              first: vocab?.first
                ? { ...vocab.first, partsList: getPartsList(vocab.first.word) }
                : undefined,
              second: vocab?.second
                ? {
                    ...vocab.second,
                    partsList: getPartsList(vocab.second.word),
                  }
                : undefined,
            },
            parts: kanjiInfo.extended.parts.map((part) => {
              return {
                part,
                keyword:
                  kanjiCacheRef?.current?.[part]?.main.keyword ??
                  partKeywordCacheRef?.current?.[part],
                phonetic: phoneticCacheRef?.current?.[part],
              };
            }),
            frequency: kanjiInfo.extended.frequency,
            vocabInfo: kanjiInfo?.extended?.vocabInfo,
            phonetic,
          };
          return result;
        }

        if (type === "general") {
          const { allOn, allKun, meanings, jouyouGrade, wk, rtk, strokes } =
            kanjiInfo.extended;
          return {
            allOn,
            allKun,
            meanings,
            jouyouGrade,
            wk,
            rtk,
            strokes,
          };
        }

        if (type === "main-plus-extended") {
          return kanjiInfo;
        }

        throw Error(`${type} Not Implemented (${kanji})`);
      };

      if (kanjiInfo.extended == null) {
        const result = await requestWorker({
          type: "kanji-extended",
          payload: kanji,
        }).then((r) => {
          const res = r as KanjiExtendedInfo & {
            vocabInfo: {
              first?: {
                spacedKana: string;
                kanjis: Record<string, string>;
              };
              second?: {
                spacedKana: string;
                kanjis: Record<string, string>;
              };
            };
          };

          // NOTE: I don't know why typescript cant detect this
          if (kanjiCacheRef?.current?.[kanji] == null) {
            throw Error("No information about this Kanji");
          }

          kanjiCacheRef.current[kanji].extended = res;
          return getNecessaryValues();
        });

        return result;
      }
      return getNecessaryValues();
    },
    []
  );

  const getKanjiBasicInfo: GetBasicKanjiInfo = useCallback((kanji) => {
    return kanjiCacheRef.current?.[kanji]?.main ?? null;
  }, []);

  return (
    <ActionContext.Provider value={kanjiInfoRequest}>
      <IsReadyContext.Provider value={isReady}>
        <GetBasicKanjiInfoContext.Provider value={getKanjiBasicInfo}>
          {children}
        </GetBasicKanjiInfoContext.Provider>
      </IsReadyContext.Provider>
    </ActionContext.Provider>
  );
}

export const useKanjiWorkerRequest = () => {
  const fn = useContextWithCatch(
    ActionContext,
    "KanjiWorker",
    "WorkerWorkerRequest"
  );
  return fn;
};

export const useIsKanjiWorkerReady = () => {
  const ready = useContextWithCatch(
    IsReadyContext,
    "KanjiWorker",
    "IsKanjiWorkerReady"
  );
  return ready;
};

export const useGetKanjiInfoFn = () => {
  const fn = useContextWithCatch(
    GetBasicKanjiInfoContext,
    "KanjiWorker",
    "GetKanjiInfoFn"
  );
  return fn;
};

export type Status = "idle" | "loading" | "error" | "success";

export const useKanjiSearch = (searchSettings: SearchSettings) => {
  const [state, setState] = useState<{
    status: Status;
    data?: string[];
    error?: string | null;
  }>({ status: "idle" });

  const lastRequestedSettings = useRef<null | SearchSettings>(null);

  useEffect(() => {
    const doubleRequest = lastRequestedSettings.current === searchSettings;

    if (doubleRequest) {
      return;
    }

    lastRequestedSettings.current = searchSettings;

    setState((prev) => {
      return { status: "loading", data: prev.data };
    });

    requestWorker({ type: "search", payload: searchSettings })
      .then((result: unknown) => {
        setState({
          status: "success",
          error: null,
          data: result as string[],
        });
      })
      .catch((error) => {
        setState({ status: "error", error });
      });
  }, [searchSettings]);

  return state;
};

export const useKanjiSearchCount = (searchSettings: SearchSettings) => {
  const [state, setState] = useState<{
    status: Status;
    data?: string[];
    error?: string | null;
  }>({ status: "idle" });

  const lastRequestedSettings = useRef<null | SearchSettings>(null);

  useEffect(() => {
    const doubleRequest = lastRequestedSettings.current === searchSettings;

    if (doubleRequest) {
      return;
    }

    lastRequestedSettings.current = searchSettings;

    setState((prev) => {
      return { status: "loading", data: prev.data };
    });

    requestWorker({ type: "search-result-count", payload: searchSettings })
      .then((result: unknown) => {
        setState({
          status: "success",
          error: null,
          data: result as string[],
        });
      })
      .catch((error) => {
        setState({ status: "error", error });
      });
  }, [searchSettings]);

  return state;
};

export const useKanjiInfo = (
  kanji: string,
  requestType: KanjiInfoRequestType | "none"
) => {
  const [state, setState] = useState<{
    status: Status;
    data?: unknown;
    error?: string | null;
  }>({
    status: "idle",
    data: null,
  });
  const requestFn = useKanjiWorkerRequest();

  useEffect(() => {
    if (requestFn == null) {
      setState({
        status: "error",
        error: "requestFn does not exist. Please check KanjiWorkerProvider",
      });

      return;
    }

    if (requestType === "none") {
      return;
    }

    setState((prev) => {
      return { status: "loading", data: prev.data };
    });
    requestFn(kanji, requestType)
      .then((result: unknown) => {
        setState({
          status: "success",
          error: null,
          data: result,
        });
      })
      .catch((error) => {
        setState({ status: "error", error });
      });

    return;
  }, [kanji, requestType, requestFn]);
  return state;
};

export const useKanjiSearchResult = () => {
  const searchSettings = useSearchSettings();
  const results = useKanjiSearch(searchSettings);
  return results;
};
