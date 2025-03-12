import { Button } from "@/components/ui/button";
import { useState } from "react";
import { FilterSectionLayout } from "./FilterContent/FilterContentLayout";
import { FrequencyRankDataSource } from "../../../../common/FrequencyRankDataSource";
import { JLPTSelector } from "./FilterContent/JLPTSelector";
import { SORT_ORDER_SELECT } from "@/lib/sort-freq-select-options";
import {
  SortAdditionalInfo,
  SortOrderSectionLayout,
} from "./SortContent/SortOrderLayout";
import BasicSelect from "@/components/common/BasicSelect";
import { MAX_FREQ_RANK, MAX_STROKE_COUNT } from "@/lib/constants";
import { FrequencyRankingRangeField } from "./FilterContent/FrequencyRankingRangeField";
import { StrokeCountField } from "./FilterContent/StrokeCountField";
import { FilterSettings, SearchSettings, SortSettings } from "@/lib/settings";
import { isEqualFilters } from "./helpers";
import { FreqRankTypeInfo } from "@/components/common/FreqRankTypeInfo";
import { ItemCount } from "./ItemCount";
import { FrequencyType, GROUP_OPTIONS, SortKey } from "@/lib/sort-freq-types";

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
            <FreqRankTypeInfo value={sortValues.primary} />
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
              <FreqRankTypeInfo value={sortValues.secondary} />
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
      <div className="flex justify-end border-t pt-3 px-0">
        <Button disabled={isDisabled} type="submit">
          Apply
        </Button>
      </div>
    </form>
  );
};
