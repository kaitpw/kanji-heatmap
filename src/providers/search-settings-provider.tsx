import { ReactNode, useCallback, useLayoutEffect, useMemo } from "react";

import {
  FilterSettings,
  SearchSettings,
  SortSettings,
  TextSearch,
} from "@/lib/settings/settings";
import {
  toSearchParams,
  toSearchSettings,
} from "@/lib/settings/search-settings-adapter";
import {
  useSearchParams,
  useUrlLocation,
} from "@/components/dependent/routing/routing-hooks";
import { searchSettings } from "./search-settings-hooks";
import { URL_PARAMS } from "@/lib/settings/url-params";

const ALLOWED_LOCATIONS = ["/"];

export function SearchSettingsProvider({ children }: { children: ReactNode }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useUrlLocation();

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
    // we do not dabble with the search params on pages where we shouldn't such as `/docs`
    if (!ALLOWED_LOCATIONS.includes(location)) {
      return;
    }
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
  }, [setSearchParams, location]);

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
