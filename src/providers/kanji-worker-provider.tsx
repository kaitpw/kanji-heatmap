import {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { SearchSettings } from "@/lib/constants";
import KANJI_WORKER_SINGLETON from "@/lib/kanji-worker-promise-wrapper";
import { useContextWithCatch } from "./common";
import {
  KanjiCacheType,
  KanjiInfoRequestType,
  KanjiPartKeywordCacheType,
  KanjiPhoneticCacheType,
} from "@/lib/kanji-info-types";
import { KanjiExtendedInfo, KanjiMainInfo } from "@/lib/kanji-worker-constants";
import { useSearchSettings } from "./search-settings-provider";

const requestWorker = KANJI_WORKER_SINGLETON.request;
type KanjiRequestFn = (
  k: string,
  type: KanjiInfoRequestType
) => Promise<unknown>;

const ActionContext = createContext<KanjiRequestFn | null>(null);
const IsReadyContext = createContext<boolean>(false);

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

    const checkIfDone = () => {
      if (mainReady && partReady && phoneticReady && extendedReady) {
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
          const result = {
            ...kanjiInfo.main,
            mainVocab: kanjiInfo.extended.mainVocab,
            parts: kanjiInfo.extended.parts.map((part) => {
              return {
                part,
                keyword:
                  kanjiInfo.main.keyword ??
                  partKeywordCacheRef?.current?.[kanji],
                phonetic: phoneticCacheRef?.current?.[kanji],
              };
            }),
            frequency: kanjiInfo.extended.frequency,
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
          const res = r as KanjiExtendedInfo;

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

  return (
    <ActionContext.Provider value={kanjiInfoRequest}>
      <IsReadyContext.Provider value={isReady}>
        {children}
      </IsReadyContext.Provider>
    </ActionContext.Provider>
  );
}

export const useKanjiWorkerRequest = () => {
  const fn = useContextWithCatch(ActionContext, "KanjiWorker");
  return fn;
};

export const useIsKanjiWorkerReady = () => {
  const ready = useContextWithCatch(IsReadyContext, "KanjiWorker");
  return ready;
};

export type Status = "idle" | "loading" | "error" | "success";

export const useKanjiSearch = (searchSettings: SearchSettings) => {
  const [state, setState] = useState<{
    status: Status;
    data?: string[];
    error?: string | null;
  }>({
    status: "idle",
    data: [],
  });

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

export const useKanjiInfo = (
  kanji: string,
  requestType: KanjiInfoRequestType
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
        console.log("error", error);
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
