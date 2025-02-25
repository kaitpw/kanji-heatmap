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

const StateContext = createContext<KanjiRequestFn | null>(null);

export function KanjiWorkerProvider({ children }: { children: ReactNode }) {
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
    });

    requestWorker({
      type: "part-keyword-map",
    }).then((r) => {
      partKeywordCacheRef.current = r as KanjiPartKeywordCacheType;
    });

    requestWorker({ type: "phonetic-map" }).then((r) => {
      phoneticCacheRef.current = r as KanjiPhoneticCacheType;
    });

    requestWorker({
      type: "initialize-extended-kanji-map",
    });
  }, []);

  // function that can accept kanji info requests
  const kanjiInfoRequest = useCallback(
    async (k: string, type: KanjiInfoRequestType) => {
      if (kanjiCacheRef.current == null) {
        throw Error("kanjiCache not initialized");
      }

      const kanjiInfo = kanjiCacheRef.current[k];
      if (kanjiInfo == null) {
        throw Error("No information about this Kanji");
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
          console.log("hover-card", kanjiInfo);
          const result = {
            ...kanjiInfo.main,
            mainVocab: kanjiInfo.extended.mainVocab,
            parts: kanjiInfo.extended.parts.map((part) => {
              return {
                part,
                keyword:
                  kanjiInfo.main.keyword ?? partKeywordCacheRef?.current?.[k],
                phonetic: phoneticCacheRef?.current?.[k],
              };
            }),
            frequency: kanjiInfo.extended.frequency,
          };
          console.log("hover card result", kanjiInfo);

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
        throw Error(`${type} Not Implemented (${k})`);
      };

      if (kanjiInfo.extended == null) {
        requestWorker({ type: "kanji-extended", payload: k }).then((r) => {
          const res = r as KanjiExtendedInfo;

          // NOTE: I don't know why typescript cant detect this
          if (kanjiCacheRef?.current?.[k] == null) {
            throw Error("No information about this Kanji");
          }

          kanjiCacheRef.current[k].extended = res;
          return getNecessaryValues();
        });
      }

      return getNecessaryValues();
    },
    []
  );

  return (
    <StateContext.Provider value={kanjiInfoRequest}>
      {children}
    </StateContext.Provider>
  );
}

export const useKanjiWorkerRequest = () => {
  const fn = useContextWithCatch(StateContext, "KanjiWorker");
  return fn;
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

    setState({ status: "loading" });

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
    setState({ status: "loading" });
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
