import { useSearchSettingsDispatch } from "@/providers/search-settings-provider";
import { useEffect, useLayoutEffect } from "react";
import { SearchInput } from "./SearchInput";

export const SettledSearchInput = () => {
  const dispatch = useSearchSettingsDispatch();

  useLayoutEffect(() => {
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
        dispatch("textSearch", { text, type: searchType });
      }}
    />
  );
};
