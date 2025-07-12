import ItemPresentationSettingsPopover from "./ItemPresentation/ItemPresentationPopover";
import { ItemPresentationSettingsContent } from "./ItemPresentation/ItemPresentationContent";
import { SettledSearchInput } from "./SearchInput/SettledSearchInput";
import { SettledSortAndFilter } from "./SortAndFilter/SettledSortAndFilter";
import { ErrorBoundary } from "@/components/error";

export const ControlBar = () => {
  return (
    <>
      <SettledSearchInput />

      <SettledSortAndFilter />

      <ItemPresentationSettingsPopover>
        <ErrorBoundary details="ItemPresentationSettingsContent in ControlBar">
          <ItemPresentationSettingsContent />
        </ErrorBoundary>
      </ItemPresentationSettingsPopover>
    </>
  );
};
