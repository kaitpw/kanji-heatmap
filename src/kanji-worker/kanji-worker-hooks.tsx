import { useEffect, useRef, useState } from "react";
import KANJI_WORKER_SINGLETON from "@/kanji-worker/kanji-worker-promise-wrapper";
import { useContextWithCatch } from "../providers/helpers";

import type { SearchSettings } from "@/lib/settings/settings";
import type { KanjiInfoRequestType } from "@/lib/kanji/kanji-info-types";
import type {
  Sentence,
  SentenceSearchResult,
} from "@/lib/kanji/kanji-worker-types";
import { createContext } from "react";
import { useSearchSettings } from "@/providers/search-settings-hooks";
import type { GetBasicKanjiInfo } from "@/lib/kanji/kanji-worker-types";

export type KanjiRequestFn = (
  k: string,
  type: KanjiInfoRequestType,
) => Promise<unknown>;

export const ActionContext = createContext<KanjiRequestFn | null>(null);
export const IsReadyContext = createContext<boolean>(false);
export const GetBasicKanjiInfoContext = createContext<GetBasicKanjiInfo | null>(
  null,
);

const requestWorker = KANJI_WORKER_SINGLETON.request;

type Status = "idle" | "loading" | "error" | "success";

export const useKanjiWorkerRequest = () => {
  const fn = useContextWithCatch(
    ActionContext,
    "KanjiWorker",
    "KanjirWorkerRequest",
  );
  return fn;
};

export const useIsKanjiWorkerReady = () => {
  const ready = useContextWithCatch(
    IsReadyContext,
    "KanjiWorker",
    "IsKanjiWorkerReady",
  );
  return ready;
};

export const useGetKanjiInfoFn = () => {
  const fn = useContextWithCatch(
    GetBasicKanjiInfoContext,
    "KanjiWorker",
    "GetKanjiInfoFn",
  );
  return fn;
};

export const useKanjiSearch = (searchSettings: SearchSettings) => {
  const [state, setState] = useState<{
    status: Status;
    data?: string[];
    additionalData?: unknown;
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
        const newData = result as {
          kanjis: string[];
          possibleRadicals: Set<string> | undefined;
        };
        setState({
          status: "success",
          error: null,
          data: newData.kanjis as string[],
          additionalData: newData.possibleRadicals,
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
    data?: number;
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
          data: result as number,
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
  requestType: KanjiInfoRequestType | "none",
) => {
  const [state, setState] = useState<{
    status: Status;
    data?: unknown;
    error?: { message: string } | null;
  }>({
    status: "idle",
    data: null,
  });
  const requestFn = useKanjiWorkerRequest();

  useEffect(() => {
    if (requestFn == null) {
      setState({
        status: "error",
        error: {
          message: "requestFn does not exist. Please check KanjiWorkerProvider",
        },
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

export const useSentenceSearch = (kanji: string) => {
  const [state, setState] = useState<{
    status: Status;
    data?: SentenceSearchResult;
    error?: string | null;
  }>({ status: "idle" });

  const requestFn = useKanjiWorkerRequest();

  useEffect(() => {
    if (requestFn == null) {
      setState({
        status: "error",
        error: "requestFn does not exist. Please check KanjiWorkerProvider",
      });
      return;
    }

    if (!kanji || kanji.trim() === "") {
      setState({ status: "idle" });
      return;
    }

    setState((prev) => {
      return { status: "loading", data: prev.data };
    });

    requestFn(kanji, "search-sentences")
      .then((result: unknown) => {
        setState({
          status: "success",
          error: null,
          data: result as SentenceSearchResult,
        });
      })
      .catch((error) => {
        setState({ status: "error", error });
      });
  }, [kanji, requestFn]);

  return state;
};

export const useAllSentences = () => {
  const [state, setState] = useState<{
    status: Status;
    data?: Sentence[];
    error?: string | null;
  }>({ status: "idle" });

  const requestFn = useKanjiWorkerRequest();
  const isReady = useIsKanjiWorkerReady();

  useEffect(() => {
    if (!isReady) {
      setState({ status: "idle" });
      return;
    }

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

    // Use the singleton directly since this is a special case
    KANJI_WORKER_SINGLETON.request({ type: "get-all-sentences" })
      .then((result: unknown) => {
        setState({
          status: "success",
          error: null,
          data: result as Sentence[],
        });
      })
      .catch((error) => {
        setState({ status: "error", error });
      });
  }, [requestFn, isReady]);

  return state;
};
