export const KANJI_COUNT = 2426; // Exclude NOMA / Repeater kanji
export const MAX_STROKE_COUNT = 30;
export const MAX_FREQ_RANK = 8000;

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

export const externalLinks: { name: string; url: (x: string) => string }[] = [
  {
    name: "Jotoba",
    url: (kanji: string) => `https://jotoba.de/search/1/${kanji}?l=en-US`,
  },
  {
    name: "The Kanji Map",
    url: (kanji: string) => `https://thekanjimap.com/${kanji}`,
  },
  {
    name: "Jisho",
    url: (kanji: string) => `https://jisho.org/search/${kanji}%20%23kanji`,
  },
  {
    name: "Kai Kanji Api",
    url: (kanji: string) => `https://kai.kanjiapi.dev/#!/${kanji}`,
  },
  {
    name: "Kanji Alive",
    url: (kanji: string) => `https://app.kanjialive.com/${kanji}`,
  },
  {
    name: "Hochanh",
    url: (kanji: string) => `https://hochanh.github.io/rtk/${kanji}/index.html`,
  },
  { name: "JPDB", url: (kanji: string) => `https://jpdb.io/kanji/${kanji}#a` },
  {
    name: "Wanikani",
    url: (kanji: string) => `https://www.wanikani.com/kanji/${kanji}`,
  },
  {
    name: "Kanshudo",
    url: (kanji: string) => `https://www.kanshudo.com/kanji/${kanji}`,
  },
  {
    name: "Kanji Garden",
    url: (kanji: string) => `https://kanji.garden/kanji?kanji=${kanji}`,
  },
  {
    name: "Wiktionary",
    url: (kanji: string) => `https://en.wiktionary.org/wiki/${kanji}`,
  },
  {
    name: "Unicode",
    url: (kanji: string) =>
      `http://www.unicode.org/cgi-bin/GetUnihanData.pl?codepoint=${kanji}&useutf8=true`,
  },
  {
    name: "Hanziyuan",
    url: (kanji: string) => `https://hanziyuan.net/#${kanji}`,
  },
];

export const outLinks = {
  githubIssue: "https://github.com/mithi/mithi/issues/3",
  koFi: "https://ko-fi.com/minimithi",
};

export const vocabExternalLinks = [
  {
    name: "Immersion Kit",
    url: (word: string) =>
      `https://www.immersionkit.com/dictionary?keyword=${word}`,
  },
  {
    name: "Tatoeba",
    url: (word: string) =>
      `https://tatoeba.org/en/sentences/search?from=jpn&query=${word}&to=eng`,
  },
  {
    name: "Jisho.org",
    url: (word: string) => `https://jisho.org/word/${word}`,
  },
  {
    name: "Jotoba",
    url: (word: string) => `https://jotoba.de/search/0/${word}?l=en-US`,
  },
  {
    name: "JPDB.io",
    url: (word: string) => `https://jpdb.io/search?q=${word}&lang=english#a`,
  },
];
