import {
  KanjiExtendedInfo,
  KanjiInfoFrequency,
} from "./kanji-worker-constants";

export const K_JLPT = "jlpt";
export const K_JOUYOU_KEY = "jouyou_grade";
export const K_ONYOMI = "onyomi";
export const K_KUNYOMI = "kunyomi";
export const K_STROKES = "strokes";
export const K_WK_LVL = "wanikani_level";

export const K_RTK_INDEX = "rtk_index";
export const K_MEANING_KEY = "meaning_key";

export const K_RANK_NETFLIX = "freq-rank-netflix";
export const K_RANK_DRAMA_SUBTITLES = "freq-rank-drama-subtitles";
export const K_RANK_NOVELS_5100 = "freq-rank-novels-5100";
export const K_RANK_TWITTER = "freq-rank-twitter";
export const K_RANK_WIKIPEDIA_DOC = "freq-rank-wikipedia-doc";
export const K_RANK_WIKIPEDIA_CHAR = "freq-rank-wikipedia-char";
export const K_RANK_ONLINE_NEWS_DOC = "freq-rank-online-news-doc";
export const K_RANK_ONLINE_NEWS_CHAR = "freq-rank-online-news-char";
export const K_RANK_AOZORA_DOC = "freq-rank-aozora-doc";
export const K_RANK_AOZORA_CHAR = "freq-rank-aozora-char";

export const K_RANK_GOOGLE = "rank_google";
export const K_RANK_KUF = "rank_kuf";
export const K_RANK_MCD = "rank_mcd";
export const K_RANK_BUNKA = "rank_bunka";
export const K_RANK_JISHO = "rank_jisho";
export const K_RANK_KD = "rank_kd";
export const K_RANK_WKFR = "rank_wkfr";

export const GROUP_OPTIONS = [
  K_JLPT,
  K_JOUYOU_KEY,
  K_STROKES,
  K_WK_LVL,
] as const; // removed K_KUNYOMI, K_ONYOMI for now

export const NONGROUP_OPTIONS = [K_RTK_INDEX, K_MEANING_KEY] as const;

export const FREQ_RANK_OPTIONS = [
  K_RANK_NETFLIX,
  K_RANK_DRAMA_SUBTITLES,
  K_RANK_NOVELS_5100,
  K_RANK_TWITTER,
  K_RANK_WIKIPEDIA_DOC,
  K_RANK_WIKIPEDIA_CHAR,
  K_RANK_ONLINE_NEWS_DOC,
  K_RANK_ONLINE_NEWS_CHAR,
  K_RANK_AOZORA_DOC,
  K_RANK_AOZORA_CHAR,
  K_RANK_GOOGLE,
  K_RANK_KUF,
  K_RANK_MCD,
  K_RANK_BUNKA,
  K_RANK_JISHO,
  K_RANK_KD,
  K_RANK_WKFR,
  "None",
] as const;

export const freqMap: Record<
  FrequencyType,
  keyof KanjiInfoFrequency | undefined
> = {
  [K_RANK_NETFLIX]: "netflix",
  [K_RANK_DRAMA_SUBTITLES]: "dramaSubs",
  [K_RANK_NOVELS_5100]: "novels5100",
  [K_RANK_TWITTER]: "twitter",
  [K_RANK_WIKIPEDIA_DOC]: "wikiDoc",
  [K_RANK_WIKIPEDIA_CHAR]: "wikiChar",
  [K_RANK_ONLINE_NEWS_DOC]: "onlineNewsDoc",
  [K_RANK_ONLINE_NEWS_CHAR]: "onlineNewsChar",
  [K_RANK_AOZORA_DOC]: "aozoraDoc",
  [K_RANK_AOZORA_CHAR]: "aozoraChar",
  [K_RANK_GOOGLE]: "google",
  [K_RANK_KUF]: "kuf",
  [K_RANK_MCD]: "mcd",
  [K_RANK_BUNKA]: "bunka",
  [K_RANK_JISHO]: "jisho",
  [K_RANK_KD]: "kd",
  [K_RANK_WKFR]: "wkfr",
  None: undefined,
};

export const getFrequency = (freq: FrequencyType, info: KanjiExtendedInfo) => {
  if (info.frequency == null || freqMap[freq] == null) {
    return undefined;
  }
  return info.frequency[freqMap[freq]];
};

export const FREQ_RANK_SOURCES_INFO: Record<
  string,
  { description: string; links: string[] }
> = {
  [K_RANK_NETFLIX]: {
    description:
      "* Netflix Frequency is based on the list by OhTalkWho オタク (Dave Doebrick)",
    links: [
      "https://www.youtube.com/watch?v=DwJWld8hW0M",
      "https://www.mediafire.com/folder/mvh6jhwj6xxo6/Frequency_Lists",
      "https://drive.google.com/file/d/1qHEfYHXjEp83i6PxxMlSxluFyQg2W8Up/view",
    ],
  },
  [K_RANK_DRAMA_SUBTITLES]: { description: "", links: [] },
  [K_RANK_NOVELS_5100]: { description: "", links: [] },
  [K_RANK_TWITTER]: { description: "", links: [] },
  [K_RANK_WIKIPEDIA_DOC]: { description: "", links: [] },
  [K_RANK_WIKIPEDIA_CHAR]: { description: "", links: [] },
  [K_RANK_ONLINE_NEWS_DOC]: { description: "", links: [] },
  [K_RANK_ONLINE_NEWS_CHAR]: { description: "", links: [] },
  [K_RANK_AOZORA_DOC]: { description: "", links: [] },
  [K_RANK_AOZORA_CHAR]: { description: "", links: [] },
  [K_RANK_GOOGLE]: { description: "", links: [] },
  [K_RANK_KUF]: { description: "", links: [] },
  [K_RANK_MCD]: { description: "", links: [] },
  [K_RANK_BUNKA]: { description: "", links: [] },
  [K_RANK_JISHO]: { description: "", links: [] },
  [K_RANK_KD]: { description: "", links: [] },
  [K_RANK_WKFR]: { description: "", links: [] },
};

export const OPTION_LABELS: Record<string, string> = {
  [K_JLPT]: "JLPT",
  [K_JOUYOU_KEY]: "Jouyou Grade",
  [K_KUNYOMI]: "Main Kunyomi Reading",
  [K_ONYOMI]: "Main Onyomi Reading",
  [K_STROKES]: "Strokes",
  [K_WK_LVL]: "Wanikani Level",
  [K_RTK_INDEX]: "RTK Index",
  [K_MEANING_KEY]: "Keyword",
  [K_RANK_NETFLIX]: "Freq Rank - Netflix",
  [K_RANK_DRAMA_SUBTITLES]: "Freq Rank - Drama Subtitles Corpus ",
  [K_RANK_NOVELS_5100]: "Freq Rank - 5100 Novels Corpus",
  [K_RANK_TWITTER]: "Freq Rank - Twitter Corpus",
  [K_RANK_WIKIPEDIA_DOC]: "Freq Rank - Wikipedia Doc Count",
  [K_RANK_WIKIPEDIA_CHAR]: "Freq Rank - Wikipedia Char Count",
  [K_RANK_ONLINE_NEWS_DOC]: "Freq Rank - Online News Doc Count",
  [K_RANK_ONLINE_NEWS_CHAR]: "Freq Rank - Online News Char Count",
  [K_RANK_AOZORA_DOC]: "Freq Rank - Aozora Doc Count",
  [K_RANK_AOZORA_CHAR]: "Freq Rank - Aozora Char Count",
  [K_RANK_GOOGLE]: "Freq Rank - Google ",
  [K_RANK_KUF]: "Freq Rank - KUF",
  [K_RANK_MCD]: "Freq Rank - MCD ",
  [K_RANK_BUNKA]: "Freq Rank - BUNKA",
  [K_RANK_JISHO]: "Freq Rank - JISHO",
  [K_RANK_KD]: "Freq Rank - KD",
  [K_RANK_WKFR]: "Freq Rank - WKFR",
  None: "None",
};

export const FREQUENCY_RANK_FILTER_OPTIONS: { value: string; label: string }[] =
  FREQ_RANK_OPTIONS.map((optionValue) => {
    return { value: optionValue, label: OPTION_LABELS[optionValue] ?? "-" };
  });

type SortGroup = (typeof GROUP_OPTIONS)[number];
type SortNonGroup = (typeof NONGROUP_OPTIONS)[number];
export type FrequencyType = (typeof FREQ_RANK_OPTIONS)[number];
export type SortKey = SortGroup | SortNonGroup | FrequencyType;

export const SORT_ORDER_SELECT: { value: string; label: string }[] = [
  ...GROUP_OPTIONS,
  ...NONGROUP_OPTIONS,
  ...FREQ_RANK_OPTIONS,
].map((optionValue) => {
  return { value: optionValue, label: OPTION_LABELS[optionValue] ?? "-" };
});
