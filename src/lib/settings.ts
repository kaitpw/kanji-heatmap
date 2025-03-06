import { FrequencyType, SortKey } from "./frequency-rank";
import { JLTPTtypes } from "./jlpt";

export type SearchType = "keyword" | "onyomi" | "kunyomi";

export const SEARCH_TYPE_OPTIONS: {
  value: SearchType;
  label: string;
}[] = [
  { value: "keyword", label: "Keyword" },
  { value: "onyomi", label: "オンヨミ" },
  { value: "kunyomi", label: "くんよみ" },
];

export type TextSearch = {
  type: SearchType;
  text: string;
};

export type FilterSettings = {
  strokeRange: { min: number; max: number };
  jlpt: JLTPTtypes[];
  freq: {
    source: FrequencyType;
    rankRange: { min: number; max: number };
  };
};

export type SortSettings = {
  primary: SortKey;
  secondary: SortKey;
};

export type SearchSettings = {
  textSearch: TextSearch;
  filterSettings: FilterSettings;
  sortSettings: SortSettings;
};

export type ItemSettings = {
  cardType: "compact" | "expanded";
  borderColorAttached: boolean;
  backgroundColorSettingDataSource: FrequencyType;
};
