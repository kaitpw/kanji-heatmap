export const URL_PARAMS = {
  openKanji: "open-kanji",
  textSearch: {
    type: "search-type",
    text: "search-text",
  },
  filterSettings: {
    strokeRange: { min: "filter-stroke-min", max: "filter-stroke-max" },
    jlpt: "filter-jlpt",
    freq: {
      source: "filter-freq-source",
      rankRange: { min: "filter-freq-rank-min", max: "filter-freq-rank-max" },
    },
  },
  sortSettings: {
    primary: "sort-primary",
    secondary: "sort-secondary",
  },
} as const;
