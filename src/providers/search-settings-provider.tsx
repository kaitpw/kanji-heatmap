import { ReactNode, useCallback, useLayoutEffect, useMemo } from "react";

import {
  FilterSettings,
  SearchSettings,
  SortSettings,
  TextSearch,
} from "@/lib/settings";
import { URL_PARAMS } from "@/lib/constants";
import { useSearchParams } from "wouter";
import { toSearchParams, toSearchSettings } from "@/lib/url-params-helpers";
import { searchSettings } from "./search-settings-hooks";

export function SearchSettingsProvider({ children }: { children: ReactNode }) {
  const [searchParams, setSearchParams] = useSearchParams();

  const updateItem = useCallback(
    (
      key: keyof SearchSettings,
      value: TextSearch | FilterSettings | SortSettings
    ) => {
      setSearchParams((prev) => {
        // if only text search type is changed, but no search text
        // then no transformation should be done in the URL
        if (key === "textSearch") {
          const newVal = value as TextSearch;
          const oldSearchText = prev.get(URL_PARAMS.textSearch.text) ?? "";
          if (newVal.text === "" && oldSearchText === "") {
            return prev;
          }
        }

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
    <searchSettings.StateContext.Provider value={storageData}>
      <searchSettings.DispatchContext.Provider value={updateItem}>
        {children}
      </searchSettings.DispatchContext.Provider>
    </searchSettings.StateContext.Provider>
  );
}
