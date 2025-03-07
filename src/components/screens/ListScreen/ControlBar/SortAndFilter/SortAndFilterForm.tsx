import { Button } from "@/components/ui/button";
import { useDeferredValue, useState } from "react";
import { FilterSectionLayout } from "./FilterContent/FilterContentLayout";
import { FrequencyRankDataSource } from "../../../../common/FrequencyRankDataSource";
import { JLPTSelector } from "./FilterContent/JLPTSelector";
import {
  FrequencyType,
  GROUP_OPTIONS,
  SORT_ORDER_SELECT,
  SortKey,
} from "@/lib/frequency-rank";
import { SortAdditionalInfo, SortOrderSectionLayout } from "./SortOrderLayout";
import BasicSelect from "@/components/common/BasicSelect";
import { KANJI_COUNT } from "@/lib/constants";
import { FrequencyRankingRangeField } from "./FilterContent/FrequencyRankingRangeField";
import { StrokeCountField } from "./FilterContent/StrokeCountField";
import { FilterSettings, SearchSettings, SortSettings } from "@/lib/settings";
import { useKanjiSearchCount } from "@/kanji-worker/kanji-worker-provider";
import { isEqualFilters, shouldShowAllKanji } from "./SortContent/helpers";
import { FreqRankTypeInfo } from "@/components/common/FreqRankTypeInfo";

const disclaimer =
  "Given your selected data source, Kanji Characters with no available rank  are excluded.";

const AllMatchMsg = () => {
  return (
    <div className="block w-full text-right text-xs">
      All available Kanji (
      {<span className="font-extrabold mx-1">{KANJI_COUNT}</span>}) characters
      match your applied filters.
    </div>
  );
};
const ItemCountComputed = ({ settings }: { settings: SearchSettings }) => {
  const data = useKanjiSearchCount(settings);

  if (data.data == null || data.error) {
    return <></>;
  }

  const textSuffix =
    settings.textSearch.text.length > 0 ? (
      <>
        Your Search Text is{" "}
        <span className="mx-1 font-extrabold">
          "{settings.textSearch.text}".
        </span>
      </>
    ) : (
      ""
    );

  if (data.data === 0) {
    return (
      <>
        {textSuffix} No Kanji characters match your applied filters. <br />
        {disclaimer}{" "}
      </>
    );
  }

  if (data.data >= KANJI_COUNT) {
    return <AllMatchMsg />;
  }

  return (
    <>
      {textSuffix} A total of{" "}
      <span className="font-extrabold mx-1">{data.data}</span> Kanji characters
      match your applied filters. <br />
      {disclaimer}
    </>
  );
};
const ItemCount = ({ settings }: { settings: SearchSettings }) => {
  const deferredSettings = useDeferredValue(settings);
  const shouldShowAll = shouldShowAllKanji(deferredSettings);

  if (shouldShowAll) {
    return <AllMatchMsg />;
  }

  return (
    <div className="block w-full text-right text-xs">
      <ItemCountComputed settings={deferredSettings} />
    </div>
  );
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
            <>
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
                          ? { min: 1, max: KANJI_COUNT }
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
                        rankRange: {
                          min: val[0] ?? 0,
                          max: val[1] ?? KANJI_COUNT,
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
