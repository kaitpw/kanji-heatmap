import { SortAndFilterSettingsDialog } from "./SortAndFilterSettings/SortAndFilterSettings";
import CardPresentationSettings, {
  CardPresentationSettingsContent,
} from "./CardPresentationSettings";
import { SearchInput } from "./SearchInput";
import {
  useSearchSettings,
  useSearchSettingsDispatch,
} from "@/providers/search-settings-provider";

const SortAndFilterSection = () => {
  const itemListSettings = useSearchSettings();
  const dispatch = useSearchSettingsDispatch();
  const itemCount = 0;

  return (
    <>
      <SearchInput
        onSettle={(text, searchType) => {
          dispatch("textSearch", { text, type: searchType });
        }}
      />
      <div className="px-2 rounded-lg bg-opacity-75 bg-white dark:bg-black border absolute top-[39px] text-xs font-extrabold">
        {itemCount} items match your search filters
      </div>
      <SortAndFilterSettingsDialog
        initialValue={itemListSettings}
        onSettle={(value) => {
          dispatch("filterSettings", value.filterSettings);
          dispatch("sortSettings", value.sortSettings);
        }}
      />
    </>
  );
};
const ControlBar = () => {
  return (
    <section className="mx-auto max-w-screen-xl flex border-0 space-x-1 sticky">
      <SortAndFilterSection />
      <CardPresentationSettings>
        <CardPresentationSettingsContent />
      </CardPresentationSettings>
    </section>
  );
};

export default ControlBar;
