import { Button } from "@/components/ui/button";
import { useState } from "react";
import { FilterSectionLayout } from "./FilterContent/FilterContentLayout";
import { FrequencyRankDataSource } from "./FilterContent/FrequencyRankDataSource";
import { JLPTSelector } from "./FilterContent/JLPTSelector";
import {
  FrequencyType,
  GROUP_OPTIONS,
  SORT_ORDER_SELECT,
  SortKey,
} from "@/lib/frequency-rank";
import { SortAdditionalInfo, SortOrderSectionLayout } from "./SortOrderLayout";
import BasicSelect from "@/components/common/BasicSelect";

import { Badge } from "@/components/ui/badge";
import {
  FilterSettings,
  KANJI_COUNT,
  SearchSettings,
  SortSettings,
} from "@/lib/constants";
import { FrequencyRankingRangeField } from "./FilterContent/FrequencyRankingRangeField";
import { StrokeCountField } from "./FilterContent/StrokeCountField";

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

  const isDisabled = noChangeInFilterValues && noChangeInSortValues;
  const isGroup = (GROUP_OPTIONS as readonly string[]).includes(
    sortValues.primary
  );

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
              onChange={(newValue) => {
                const isGroup = (GROUP_OPTIONS as readonly string[]).includes(
                  newValue
                );

                setSortValues((prev) => {
                  return {
                    ...prev,
                    primary: newValue as SortKey,
                    secondary: isGroup ? prev.secondary : "None",
                  };
                });
              }}
              triggerCN={"h-8 w-full"}
              options={SORT_ORDER_SELECT}
              label="Primary"
              isLabelSrOnly={false}
            />
          }
          secondaryField={
            sortValues.secondary &&
            isGroup && (
              <BasicSelect
                value={sortValues.secondary}
                onChange={(newValue) =>
                  setSortValues((prev) => {
                    return { ...prev, secondary: newValue as SortKey };
                  })
                }
                triggerCN={"h-8 w-full"}
                options={SORT_ORDER_SELECT}
                label="Secondary"
                isLabelSrOnly={false}
              />
            )
          }
          additionalInfo={
            <SortAdditionalInfo
              val1={sortValues.primary}
              val2={sortValues.secondary}
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
                      source: val as FrequencyType,
                      rankRange:
                        val === "None"
                          ? { min: 0, max: KANJI_COUNT }
                          : prev.freq.rankRange,
                    },
                  };
                });
              }}
            />
          }
          freqRankRangeField={
            filterValues.freq.source !== "None" && (
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
            )
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
