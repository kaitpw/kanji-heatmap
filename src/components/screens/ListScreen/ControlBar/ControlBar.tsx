import ItemPresentationSettingsPopover from "./ItemPresentation/ItemPresentationPopover";
import { ItemPresentationSettingsContent } from "./ItemPresentation/ItemPresentationContent";
import { SettledSearchInput } from "./SearchInput/SettledSearchInput";
import { SettledSortAndFilter } from "./SortAndFilter/SettledSortAndFilter";

export const ControlBar = () => {
  return (
    <>
      <SettledSearchInput />
      <SettledSortAndFilter />
      <ItemPresentationSettingsPopover>
        <ItemPresentationSettingsContent />
      </ItemPresentationSettingsPopover>
    </>
  );
};
