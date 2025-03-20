import { SearchType } from "@/lib/settings";
import {
  useSearchSettings,
  useSearchSettingsDispatch,
} from "@/providers/search-settings-hooks";
import { SearchInput } from "./SearchInput";

export const SettledSearchInput = () => {
  const dispatch = useSearchSettingsDispatch();
  const settings = useSearchSettings();

  return (
    <>
      <SearchInput
        onSettle={(text, searchType) => {
          dispatch("textSearch", { text, type: searchType as SearchType });
        }}
        initialText={settings.textSearch.text}
        initialSearchType={settings.textSearch.type}
      />
    </>
  );
};
