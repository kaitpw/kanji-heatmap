import { useEffect, useLayoutEffect } from "react";
import { useSearchSettingsDispatch } from "@/providers/search-settings-provider";
import { SearchInput } from "./SearchInput";
import { SearchType } from "@/lib/settings";

export const SettledSearchInput = () => {
  const dispatch = useSearchSettingsDispatch();

  useLayoutEffect(() => {
    /* Before displaying, make sure that local storage 
       text search is restored to default */
    dispatch("textSearch", { type: "keyword", text: "" });
  }, [dispatch]);

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
    <SearchInput
      onSettle={(text, searchType) => {
        dispatch("textSearch", { text, type: searchType as SearchType });
      }}
    />
  );
};
