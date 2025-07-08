import {
  FREQ_RANK_SOURCES_INFO,
  rankTypeLabel,
} from "../freq/freq-source-info";
import { SORT_OPTION_LABELS } from "./options-label-maps";
import {
  FREQ_RANK_OPTIONS,
  GROUP_OPTIONS,
  K_RANK_NONE,
  NONGROUP_OPTIONS,
} from "./options-constants";
import { FrequencyType, SortKey } from "./options-types";

const FREQUENCY_RANK_FILTER_OPTIONS: {
  value: FrequencyType;
  label: string;
}[] = FREQ_RANK_OPTIONS.map((optionValue) => {
  return {
    value: optionValue,
    label: SORT_OPTION_LABELS[optionValue] ?? "None",
  };
});

const ALL_SORT_OPTIONS: SortKey[] = [
  ...GROUP_OPTIONS,
  ...NONGROUP_OPTIONS,
  ...FREQ_RANK_OPTIONS,
];

const SORT_ORDER_SELECT = ALL_SORT_OPTIONS.map((item) => {
  const freqDesc = FREQ_RANK_SOURCES_INFO[item as FrequencyType]?.description;
  const rankType = FREQ_RANK_SOURCES_INFO[item as FrequencyType]?.rankType;

  const raw = SORT_OPTION_LABELS[item as SortKey];
  const label = item === "none" ? "None" : freqDesc ? `${raw} Rank` : raw;
  return {
    value: item,
    label,
    description: item !== "none" && freqDesc
      ? `${freqDesc} ${rankTypeLabel[rankType]}`
      : undefined,
  };
});

const FREQ_RANK_OPTIONS_NONE_REMOVED = FREQ_RANK_OPTIONS.filter(
  (option) => option != K_RANK_NONE,
);

export {
  ALL_SORT_OPTIONS,
  FREQ_RANK_OPTIONS_NONE_REMOVED,
  FREQUENCY_RANK_FILTER_OPTIONS,
  SORT_ORDER_SELECT,
};
