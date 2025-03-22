import { KanjiInfoFrequency } from "../kanji/kanji-worker-types";
import {
  FREQ_RANK_OPTIONS,
  GROUP_OPTIONS,
  NONGROUP_OPTIONS,
} from "./options-constants";

export type SortGroup = (typeof GROUP_OPTIONS)[number];
export type SortNonGroup = (typeof NONGROUP_OPTIONS)[number];
export type FrequencyType = (typeof FREQ_RANK_OPTIONS)[number];
export type SortKey = SortGroup | SortNonGroup | FrequencyType;
export type FreqMapInverse = Record<keyof KanjiInfoFrequency, FrequencyType>;
export type SortOptionLabelType = Record<SortKey, string>;
