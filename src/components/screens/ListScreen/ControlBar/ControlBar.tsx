import ItemPresentationSettingsPopover from "./ItemPresentation/ItemPresentationPopover";
import { ItemPresentationSettingsContent } from "./ItemPresentation/ItemPresentationContent";
import { SettledSearchInput } from "./SearchInput/SettledSearchInput";
import { SettledSortAndFilter } from "./SortAndFilter/SettledSortAndFilter";
import React from "react";

export const ControlBarRaw = () => {
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

export const ControlBar = React.memo(ControlBarRaw);
