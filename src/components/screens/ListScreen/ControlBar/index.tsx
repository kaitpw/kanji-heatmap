import { SortAndFilterSettingsDialog } from "./SortAndFilterSettings/SortAndFilterSettings";
import { SearchInput } from "./SearchInput";
import {
  useSearchSettings,
  useSearchSettingsDispatch,
} from "@/providers/search-settings-provider";
import { useEffect } from "react";

export const SortAndFilterSection = () => {
  const searchSettings = useSearchSettings();
  const dispatch = useSearchSettingsDispatch();

  useEffect(() => {
    /* when search and filter section is removed
      (<SearchInput /> is no longer in the screen)
      clear local storage searchText 

    */

    return () => {
      dispatch("textSearch", { text: "", type: "keyword" });
    };
  }, [dispatch]);

  return (
    <>
      <SearchInput
        onSettle={(text, searchType) => {
          dispatch("textSearch", { text, type: searchType });
        }}
      />
      <SortAndFilterSettingsDialog
        initialValue={searchSettings}
        onSettle={(value) => {
          dispatch("filterSettings", value.filterSettings);
          dispatch("sortSettings", value.sortSettings);
        }}
      />
    </>
  );
};

export const ItemCountBadge = () => {
  const itemCount = 0;
  return (
    <div className="px-2 rounded-lg bg-opacity-75 bg-white dark:bg-black border absolute top-[39px] text-xs font-extrabold">
      {itemCount} items match your search filters
    </div>
  );
};
