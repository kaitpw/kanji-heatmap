import { useState } from "react";

import { FrequencyType, SortKey } from "@/lib/options/options-types";
import { isEqualFilters } from "@/lib/results-utils";
import { SORT_ORDER_SELECT } from "@/lib/options/options-arr";
import { MAX_FREQ_RANK, MAX_STROKE_COUNT } from "@/lib/options/constants";
import {
  FilterSettings,
  SearchSettings,
  SortSettings,
} from "@/lib/settings/settings";

import { Button } from "@/components/ui/button";
import BasicSelect from "@/components/common/BasicSelect";

import { FreqRankTypeInfo } from "@/components/common/freq/FreqRankTypeInfo";
import { StrokeCountField } from "@/components/common/StrokeCountField";
import { JLPTSelector } from "@/components/common/jlpt/JLPTSelector";
import { FrequencyRankDataSource } from "@/components/common/freq/FrequencyRankDataSource";
import { FrequencyRankingRangeField } from "@/components/common/freq/FrequencyRankingRangeField";

import { FilterSectionLayout } from "./FilterContentLayout";
import { ItemCount } from "./ItemCount";
import {
  SortAdditionalInfo,
  SortOrderSectionLayout,
} from "./SortOrderPresentation";
import { GROUP_OPTIONS } from "@/lib/options/options-constants";
import {
  defaultFilterSettings,
  defaultSortSettings,
} from "@/lib/settings/search-settings-adapter";

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
    <form
      className="flex flex-col space-y-4"
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
          <>
            <BasicSelect
              value={sortValues.primary}
              onChange={(newValue) => {
                const isGroup = (GROUP_OPTIONS as readonly string[]).includes(
                  newValue
                );

                setSortValues((prev) => {
                  const newSecondary =
                    newValue === prev.secondary
                      ? "none"
                      : isGroup
                        ? prev.secondary
                        : "none";
                  return {
                    ...prev,
                    primary: newValue as SortKey,
                    secondary: newSecondary,
                  };
                });
              }}
              triggerCN={"h-8 w-full"}
              options={SORT_ORDER_SELECT}
              label="Primary"
              isLabelSrOnly={false}
            />
            <FreqRankTypeInfo value={sortValues.primary} defaultValue={null} />
          </>
        }
        secondaryField={
          sortValues.secondary &&
          isGroup && (
            <>
              <BasicSelect
                value={sortValues.secondary}
                onChange={(newValue) =>
                  setSortValues((prev) => {
                    return { ...prev, secondary: newValue as SortKey };
                  })
                }
                triggerCN={"h-8 w-full"}
                options={SORT_ORDER_SELECT.filter((item) => {
                  return item.value !== sortValues.primary;
                })}
                label="Secondary"
                isLabelSrOnly={false}
              />
              <FreqRankTypeInfo
                value={sortValues.secondary}
                defaultValue={null}
              />
            </>
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
                  strokeRange: {
                    min: val[0] ?? 0,
                    max: val[1] ?? MAX_STROKE_COUNT,
                  },
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
                      val === "none"
                        ? { min: 1, max: MAX_FREQ_RANK }
                        : prev.freq.rankRange,
                  },
                };
              });
            }}
          />
        }
        freqRankRangeField={
          filterValues.freq.source !== "none" && (
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
                      rankRange: {
                        min: val[0] ?? 1,
                        max: val[1] ?? MAX_FREQ_RANK,
                      },
                    },
                  };
                });
              }}
            />
          )
        }
      />
      {!isDisabled && (
        <ItemCount
          settings={{ ...initialValue, filterSettings: filterValues }}
        />
      )}
      {isDisabled && (
        <div className="flex w-full justify-end items-center text-xs">
          There are no changes to apply yet.
        </div>
      )}
      <div className="flex justify-end border-t pt-3 px-0 space-x-1">
        <Button
          variant="outline"
          onClick={(e) => {
            e.preventDefault();
            setSortValues(defaultSortSettings);
            setFilterValues(defaultFilterSettings);
            e.stopPropagation();
          }}
        >
          Clear all
        </Button>
        <Button disabled={isDisabled} type="submit">
          Apply
        </Button>
      </div>
    </form>
  );
};
