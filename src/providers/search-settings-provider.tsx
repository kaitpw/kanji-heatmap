/* eslint-disable @typescript-eslint/no-unused-expressions */
import { ReactNode, useCallback, useLayoutEffect, useMemo } from "react";

import { createContextComponents, useContextWithCatch } from "./helpers";
import {
  FilterSettings,
  SearchSettings,
  SortSettings,
  TextSearch,
} from "@/lib/settings";
import { MAX_FREQ_RANK, MAX_STROKE_COUNT } from "@/lib/constants";
import { useSearchParams } from "wouter";
import { toSearchParams, toSearchSettings } from "@/lib/url-params-helpers";

const { StateContext, DispatchContext } =
  createContextComponents<SearchSettings>({
    textSearch: {
      type: "keyword",
      text: "",
    },
    filterSettings: {
      strokeRange: { min: 1, max: MAX_STROKE_COUNT },
      jlpt: ["n1", "n2", "n3", "n4", "n5", "none"] as const,
      freq: {
        source: "rank-netflix" as const,
        rankRange: { min: 1, max: MAX_FREQ_RANK },
      },
    },
    sortSettings: {
      primary: "none",
      secondary: "none",
    },
  });

export function SearchSettingsProvider({ children }: { children: ReactNode }) {
  const [searchParams, setSearchParams] = useSearchParams();

  const updateItem = useCallback(
    (
      key: keyof SearchSettings,
      value: TextSearch | FilterSettings | SortSettings
    ) => {
      setSearchParams((prev) => {
        return toSearchParams(prev, key, value);
      });
    },
    [setSearchParams]
  );

  useLayoutEffect(() => {
    setSearchParams(
      (prev) => {
        const searchSettings = toSearchSettings(prev);

        const partial1 = toSearchParams(
          prev,
          "textSearch",
          searchSettings.textSearch
        );
        const partial2 = toSearchParams(
          partial1,
          "filterSettings",
          searchSettings.filterSettings
        );
        const final = toSearchParams(
          partial2,
          "sortSettings",
          searchSettings.sortSettings
        );

        return final;
      },
      { replace: true }
    );
  }, [setSearchParams]);

  const storageData: SearchSettings = useMemo(() => {
    return toSearchSettings(searchParams);
  }, [searchParams]);

  return (
    <StateContext.Provider value={storageData}>
      <DispatchContext.Provider value={updateItem}>
        {children}
      </DispatchContext.Provider>
    </StateContext.Provider>
  );
}

const providerName = "SearchSettings";

export function useSearchSettings() {
  const context = useContextWithCatch(StateContext, providerName);
  return context;
}

export function useSearchSettingsDispatch() {
  const context = useContextWithCatch(
    DispatchContext,
    providerName,
    `${providerName}Dispatch`
  );
  return context;
}
