import {
  useSearchSettings,
  useSearchSettingsDispatch,
} from "@/providers/search-settings-hooks";
import { SortAndFilterSettingsDialog } from "./SortAndFilterDialog";

export const SettledSortAndFilter = () => {
  const searchSettings = useSearchSettings();
  const dispatch = useSearchSettingsDispatch();

  return (
    <>
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
