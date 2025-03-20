import ItemPresentationSettingsPopover from "./ItemPresentation/ItemPresentationPopover";
import { ItemPresentationSettingsContent } from "./ItemPresentation/ItemPresentationContent";
import { SettledSearchInput } from "./SearchInput/SettledSearchInput";
import { SettledSortAndFilter } from "./SortAndFilter/SettledSortAndFilter";
import React from "react";
import ErrorBoundary from "@/components/sections/error/ErrorBoundary";
import { ReportBugIconBtn } from "@/components/common/LinkOutSection";
import { ItemCountBadge } from "./SearchInput/ItemCountBadge";

export const ControlBarRaw = () => {
  return (
    <>
      <ErrorBoundary
        details="SettledSearchInput in ControlBar"
        fallback={
          <div className="h-full flex items-center">
            <ReportBugIconBtn cnOverride="h-9" />
          </div>
        }
      >
        <SettledSearchInput />
      </ErrorBoundary>
      <ErrorBoundary
        details="SettledSortAndFilter in ControlBar"
        fallback={
          <div className="h-full flex items-center">
            <ReportBugIconBtn cnOverride="h-9" />
          </div>
        }
      >
        <SettledSortAndFilter />
        <ItemCountBadge />
      </ErrorBoundary>
      <ErrorBoundary
        details="ItemPresentationSettings in ControlBar"
        fallback={
          <div className="h-full flex items-center">
            <ReportBugIconBtn cnOverride="h-9" />
          </div>
        }
      >
        <ItemPresentationSettingsPopover>
          <ErrorBoundary details="ItemPresentationSettingsContent in ControlBar">
            <ItemPresentationSettingsContent />
          </ErrorBoundary>
        </ItemPresentationSettingsPopover>
      </ErrorBoundary>
    </>
  );
};

export const ControlBar = React.memo(ControlBarRaw);
