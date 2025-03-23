import { SearchType } from "@/lib/settings/settings";
import {
  useSearchSettings,
  useSearchSettingsDispatch,
} from "@/providers/search-settings-hooks";
import { SearchInput } from "./SearchInput";
import { useHasNavigatedToHomeKey } from "@/components/dependent/routing/routing-hooks";

export const SettledSearchInput = () => {
  const dispatch = useSearchSettingsDispatch();
  const settings = useSearchSettings();
  const key = useHasNavigatedToHomeKey();

  return (
    <>
      <SearchInput
        key={key}
        onSettle={(text, searchType) => {
          dispatch("textSearch", { text, type: searchType as SearchType });
        }}
        initialText={settings.textSearch.text}
        initialSearchType={settings.textSearch.type}
      />
    </>
  );
};
