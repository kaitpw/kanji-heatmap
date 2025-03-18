import { FREQ_RANK_SOURCES_INFO, rankTypeLabel } from "./freq-source-info";
import {
  freqMap,
  frequencyRankLabels,
  nonFreqOptionLabels,
} from "./label-maps";
import {
  FREQ_RANK_OPTIONS,
  FrequencyType,
  GROUP_OPTIONS,
  NONGROUP_OPTIONS,
  SortGroup,
  SortKey,
  SortNonGroup,
  SortOptionLabelType,
} from "./sort-freq-types";

export const SORT_OPTION_LABELS: SortOptionLabelType = Object.keys({
  ...nonFreqOptionLabels,
  ...freqMap,
}).reduce((acc: SortOptionLabelType, option: string) => {
  const name = freqMap[option as FrequencyType];

  if (name != null) {
    const label = frequencyRankLabels[name];
    acc[option as FrequencyType] = label;
    return acc;
  }

  const label = nonFreqOptionLabels[option as SortGroup | SortNonGroup];

  if (label != null) {
    acc[option as SortGroup | SortNonGroup] = label;
    return acc;
  }

  return acc;
}, {} as SortOptionLabelType);

export const FREQUENCY_RANK_FILTER_OPTIONS: {
  value: FrequencyType;
  label: string;
}[] = FREQ_RANK_OPTIONS.map((optionValue) => {
  return {
    value: optionValue,
    label: SORT_OPTION_LABELS[optionValue] ?? "None",
  };
});

export const ALL_SORT_OPTIONS: SortKey[] = [
  ...GROUP_OPTIONS,
  ...NONGROUP_OPTIONS,
  ...FREQ_RANK_OPTIONS,
];

export const SORT_ORDER_SELECT = ALL_SORT_OPTIONS.map((item) => {
  const freqDesc = FREQ_RANK_SOURCES_INFO[item as FrequencyType]?.description;
  const rankType = FREQ_RANK_SOURCES_INFO[item as FrequencyType]?.rankType;

  const raw = SORT_OPTION_LABELS[item as SortKey];
  const label = item === "none" ? "None" : freqDesc ? `${raw} Rank` : raw;
  return {
    value: item,
    label,
    description:
      item !== "none" ? `${freqDesc} ${rankTypeLabel[rankType]}` : undefined,
  };
});
