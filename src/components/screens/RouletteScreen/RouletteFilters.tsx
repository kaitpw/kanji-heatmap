import { useSearchSettings } from "@/providers/search-settings-hooks";
import { SettledSortAndFilter } from "@/components/screens/ListScreen/ControlBar/SortAndFilter/SettledSortAndFilter";

export const RouletteFilters = () => {
    const searchSettings = useSearchSettings();

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h4 className="text-sm font-medium">Filters</h4>
                <p className="text-xs text-muted-foreground">
                    Apply the same filters as the main kanji page
                </p>
            </div>

            <div className="flex items-center space-x-2">
                <SettledSortAndFilter />
            </div>

            <div className="text-xs text-muted-foreground">
                Current filters: {searchSettings.filterSettings.jlpt.length > 0
                    ? `JLPT ${searchSettings.filterSettings.jlpt.join(", ")}`
                    : "All JLPT levels"} • Strokes:{" "}
                {searchSettings.filterSettings.strokeRange.min}-{searchSettings
                    .filterSettings.strokeRange.max} • Frequency:{" "}
                {searchSettings.filterSettings.freq.source === "none"
                    ? "All sources"
                    : searchSettings.filterSettings.freq.source}
            </div>
        </div>
    );
};
