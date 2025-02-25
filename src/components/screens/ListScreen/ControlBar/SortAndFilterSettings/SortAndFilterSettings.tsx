import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@radix-ui/react-hover-card";
import { Button } from "@/components/ui/button";
import { Settings2 } from "lucide-react";
import { useMemo, useState } from "react";
import {
  FilterSectionLayout,
  FrequencyRankingRangeField,
  StrokeCountField,
} from "./FilterSection";
import { FrequencyRankDataSource } from "./sections/common";
import { JLPTSelector } from "./sections/JLPTSelector";
import {
  OPTION_LABELS,
  PRIMARY_SORT_ORDER_SELECT,
  SECONDARY_SORT_ORDER_SELECT,
} from "@/lib/frequency-rank";
import {
  SortAdditionalInfo,
  SortOrderSectionLayout,
} from "./sections/SortOrderSection";
import BasicSelect from "@/components/common/BasicSelect";

import { Badge } from "@/components/ui/badge";
import { FilterSettings, SearchSettings, SortSettings } from "@/lib/constants";
import { useKanjiSearch } from "@/providers/kanji-worker-provider";

const isEqualFilters = (a: FilterSettings, b: FilterSettings): boolean => {
  if (a === null || b === null) return a === b;
  if (a === undefined || b === undefined) return a === b;

  if (a.strokeRange.min !== b.strokeRange.min) return false;
  if (a.strokeRange.max !== b.strokeRange.max) return false;

  if (a.jlpt.length !== b.jlpt.length) return false;
  for (let i = 0; i < a.jlpt.length; i++) {
    if (a.jlpt[i] !== b.jlpt[i]) return false;
  }

  if (a.freq.source !== b.freq.source) return false;
  if (a.freq.rankRange.min !== b.freq.rankRange.min) return false;
  if (a.freq.rankRange.max !== b.freq.rankRange.max) return false;

  return true;
};

export const SortAndFilterSettingsForm = ({
  initialValue,
  onSettle,
}: {
  onSettle: (x: SearchSettings) => void;
  initialValue: SearchSettings;
}) => {
  const [sortValues, setSortValues] = useState<SortSettings>(
    initialValue.sortSettings
  );
  const [filterValues, setFilterValues] = useState<FilterSettings>(
    initialValue.filterSettings
  );

  const itemCount = 143;

  const noChangeInSortValues =
    sortValues.primary === initialValue.sortSettings.primary &&
    sortValues.secondary == initialValue.sortSettings.secondary;

  const noChangeInFilterValues = isEqualFilters(
    initialValue.filterSettings,
    filterValues
  );

  const settings = useMemo(() => {
    return {
      ...initialValue,
      sortSettings: sortValues,
      filterSettings: filterValues,
    };
  }, [initialValue, sortValues, filterValues]);
  const response = useKanjiSearch(settings);
  console.log("response", response);

  const isDisabled = noChangeInFilterValues && noChangeInSortValues;
  return (
    <section className="flex flex-col items-start justify-start w-full">
      <form
        className="w-full flex flex-col space-y-4"
        onSubmit={(e) => {
          e.preventDefault();
          onSettle({
            ...initialValue,
            filterSettings: filterValues,
            sortSettings: sortValues,
          });
        }}
      >
        <SortOrderSectionLayout
          primaryField={
            <BasicSelect
              value={sortValues.primary}
              onChange={(newValue) =>
                setSortValues((prev) => {
                  return { ...prev, primary: newValue };
                })
              }
              triggerCN={"h-8 w-full"}
              options={PRIMARY_SORT_ORDER_SELECT}
              label="Primary"
              isLabelSrOnly={false}
            />
          }
          secondaryField={
            sortValues.secondary && (
              <BasicSelect
                value={sortValues.secondary}
                onChange={(newValue) =>
                  setSortValues((prev) => {
                    return { ...prev, secondary: newValue };
                  })
                }
                triggerCN={"h-8 w-full"}
                options={SECONDARY_SORT_ORDER_SELECT}
                label="Secondary"
                isLabelSrOnly={false}
              />
            )
          }
          additionalInfo={
            <SortAdditionalInfo
              val1={OPTION_LABELS?.[sortValues?.primary] ?? "None"}
              val2={
                sortValues.secondary
                  ? OPTION_LABELS[sortValues.secondary]
                  : undefined
              }
            />
          }
        />

        <FilterSectionLayout
          strokeCountField={
            <StrokeCountField
              values={[
                filterValues.strokeRange.min,
                filterValues.strokeRange.max,
              ]}
              setValues={(val) => {
                setFilterValues((prev) => {
                  return {
                    ...prev,
                    strokeRange: { min: val[0] ?? 0, max: val[1] ?? 2500 },
                  };
                });
              }}
            />
          }
          jlptField={
            <JLPTSelector
              selectedJLPT={filterValues.jlpt}
              setSelectedJLPT={(val) => {
                setFilterValues((prev) => {
                  return { ...prev, jlpt: val };
                });
              }}
            />
          }
          freqRankSourceField={
            <FrequencyRankDataSource
              value={filterValues.freq.source}
              setValue={(val) => {
                setFilterValues((prev) => {
                  return {
                    ...prev,
                    freq: {
                      ...prev.freq,
                      source: val,
                    },
                  };
                });
              }}
            />
          }
          freqRankRangeField={
            <FrequencyRankingRangeField
              values={[
                filterValues.freq.rankRange.min,
                filterValues.freq.rankRange.max,
              ]}
              setValues={(val) => {
                setFilterValues((prev) => {
                  return {
                    ...prev,
                    freq: {
                      ...prev.freq,
                      rankRange: { min: val[0] ?? 0, max: val[1] ?? 2500 },
                    },
                  };
                });
              }}
            />
          }
        />
        {!isDisabled && (
          <div className="flex w-full justify-end items-center">
            {initialValue.textSearch.text.length > 0 && (
              <>
                Considering your search text{" "}
                <Badge className="m-1 px-3 py-1 text-sm" variant={"outline"}>
                  {initialValue.textSearch.text}
                </Badge>
                ,
              </>
            )}{" "}
            a total of<span className="font-extrabold mx-1">{itemCount}</span>{" "}
            Kanji Characters match your filters{" "}
          </div>
        )}
        {isDisabled && (
          <div className="flex w-full justify-end items-center">
            There are no changes to apply yet.
          </div>
        )}
        <div className="flex justify-end space-x-1 border-t pt-3">
          <Button disabled={isDisabled} type="submit">
            Apply
          </Button>
        </div>
      </form>
    </section>
  );
};

export const SortAndFilterSettingsDialog = ({
  initialValue,
  onSettle,
}: {
  onSettle: (x: SearchSettings) => void;
  initialValue: SearchSettings;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={(state) => setIsOpen(state)}>
      <DialogTrigger asChild>
        <HoverCard openDelay={0} closeDelay={0}>
          <HoverCardTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="h-9 w-9 relative"
              onClick={() => {
                setIsOpen(true);
              }}
            >
              <Settings2 />
              <span className="sr-only">Sort and Filter Settings</span>
              <div className="absolute -top-1.5 -right-2 h-[18px] w-[18px] border-4 border-white dark:border-black bg-red-500 rounded-full font-bold flex items-center justify-center" />
            </Button>
          </HoverCardTrigger>
          <HoverCardContent className="p-2 w-24 text-xs z-50 rounded-md border bg-popover text-popover-foreground shadow-md outline-none">
            Sort and Filter Settings
          </HoverCardContent>
        </HoverCard>
      </DialogTrigger>
      <DialogContent
        className={"overflow-y-scroll overflow-x-hidden max-h-screen z-50"}
      >
        <DialogHeader>
          <DialogTitle>Sorting and Filtering Settings</DialogTitle>
          <DialogDescription className="sr-only">
            Manage your Sorting and Filtering Settings
          </DialogDescription>
        </DialogHeader>
        <SortAndFilterSettingsForm
          initialValue={initialValue}
          onSettle={(val) => {
            onSettle(val);
            setIsOpen(false);
          }}
        />
      </DialogContent>
    </Dialog>
  );
};
