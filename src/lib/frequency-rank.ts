export const K_JLPT = "jlpt";
export const K_JOUYOU_KEY = "jouyou_grade";
export const K_ONYOMI = "onyomi";
export const K_KUNYOMI = "kunyomi";
export const K_STROKES = "strokes";
export const K_WK_LVL = "wanikani_level";

export const K_RTK_INDEX = "rtk_index";
export const K_MEANING_KEY = "meaning_key";

export const K_RANK_NETLIX = "freq-rank-netflix";
export const K_RANK_DRAMA_SUBTITLES = "freq-rank-drama-subtitles";
export const K_RANK_NOVELS_5100 = "freq-rank-novels-5100";
export const K_RANK_TWITTER = "freq-rank-twitter";
export const K_RANK_WIKIPEDIA_DOC = "freq-rank-wikipedia-doc";
export const K_RANK_WIKIPEDIA_CHAR = "freq-rank-wikipedia-char";
export const K_RANK_ONLINE_NEWS_DOC = "freq-rank-online-news-doc";
export const K_RANK_ONLINE_NEWS_CHAR = "freq-rank-online-news-char";
export const K_RANK_AOZORA_DOC = "freq-rank-aozora-doc";
export const K_RANK_AOZORA_CHAR = "freq-rank-aozora-char";
export const K_RANK_NEWSPAPER_1 = "freq-rank-newspaper-1";
export const K_RANK_NEWSPAPER_2 = "freq-rank-newspaper-2";

export const K_RANK_GOOGLE = "rank_google";
export const K_RANK_KUF = "rank_kuf";
export const K_RANK_MCD = "rank_mcd";
export const K_RANK_BUNKA = "rank_bunka";
export const K_RANK_JISHO = "rank_jisho";
export const K_RANK_KD = "rank_kd";
export const K_RANK_AVG = "rank_avg";
export const K_RANK_WEIGHTED = "rank_weighted";
export const K_RANK_WEIGHTED5 = "rank_weighted5";

export const GROUP_OPTIONS = [
  K_JLPT,
  K_JOUYOU_KEY,
  K_STROKES,
  K_WK_LVL,
] as const; // removed K_KUNYOMI, K_ONYOMI for now

export const NONGROUP_OPTIONS = [K_RTK_INDEX, K_MEANING_KEY] as const;

export const FREQ_RANK_OPTIONS = [
  K_RANK_NETLIX,
  K_RANK_DRAMA_SUBTITLES,
  K_RANK_NOVELS_5100,
  K_RANK_TWITTER,
  K_RANK_WIKIPEDIA_DOC,
  K_RANK_WIKIPEDIA_CHAR,
  K_RANK_ONLINE_NEWS_DOC,
  K_RANK_ONLINE_NEWS_CHAR,
  K_RANK_AOZORA_DOC,
  K_RANK_AOZORA_CHAR,
  K_RANK_NEWSPAPER_1,
  K_RANK_NEWSPAPER_2,
  K_RANK_GOOGLE,
  K_RANK_KUF,
  K_RANK_MCD,
  K_RANK_BUNKA,
  K_RANK_JISHO,
  K_RANK_KD,
  K_RANK_AVG,
  K_RANK_WEIGHTED,
  K_RANK_WEIGHTED5,
  "None",
] as const;

export const FREQ_RANK_SOURCES_INFO: Record<
  string,
  { description: string; links: string[] }
> = {
  [K_RANK_NETLIX]: {
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
  [K_RANK_NEWSPAPER_1]: { description: "", links: [] },
  [K_RANK_NEWSPAPER_2]: { description: "", links: [] },
  [K_RANK_GOOGLE]: { description: "", links: [] },
  [K_RANK_KUF]: { description: "", links: [] },
  [K_RANK_MCD]: { description: "", links: [] },
  [K_RANK_BUNKA]: { description: "", links: [] },
  [K_RANK_JISHO]: { description: "", links: [] },
  [K_RANK_KD]: { description: "", links: [] },
  [K_RANK_AVG]: { description: "", links: [] },
  [K_RANK_WEIGHTED]: { description: "", links: [] },
  [K_RANK_WEIGHTED5]: { description: "", links: [] },
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
  [K_RANK_NETLIX]: "Freq Rank - Netflix",
  [K_RANK_DRAMA_SUBTITLES]: "Freq Rank - Drama Subtitles Corpus ",
  [K_RANK_NOVELS_5100]: "Freq Rank - 5100 Novels Corpus",
  [K_RANK_TWITTER]: "Freq Rank - Twitter Corpus",
  [K_RANK_WIKIPEDIA_DOC]: "Freq Rank - Wikipedia Doc Count",
  [K_RANK_WIKIPEDIA_CHAR]: "Freq Rank - Wikipedia Char Count",
  [K_RANK_ONLINE_NEWS_DOC]: "Freq Rank - Online News Doc Count",
  [K_RANK_ONLINE_NEWS_CHAR]: "Freq Rank - Online News Char Count",
  [K_RANK_AOZORA_DOC]: "Freq Rank - Aozora Doc Count",
  [K_RANK_AOZORA_CHAR]: "Freq Rank - Aozora Char Count",
  [K_RANK_NEWSPAPER_1]: "Freq Rank - Newspaper 1",
  [K_RANK_NEWSPAPER_2]: "Freq Rank  - Newspaper 2",
  [K_RANK_GOOGLE]: "Freq Rank - Google ",
  [K_RANK_KUF]: "Freq Rank - KUF",
  [K_RANK_MCD]: "Freq Rank - MCD ",
  [K_RANK_BUNKA]: "Freq Rank - BUNKA",
  [K_RANK_JISHO]: "Freq Rank - JISHO",
  [K_RANK_KD]: "Freq Rank - KD",
  [K_RANK_AVG]: "Freq Rank - AVG",
  [K_RANK_WEIGHTED]: "Freq Rank - Weighted",
  [K_RANK_WEIGHTED5]: "Freq Rank - Weighted5",
  None: "None",
};

export const FREQUENCY_RANK_FILTER_OPTIONS: { value: string; label: string }[] =
  FREQ_RANK_OPTIONS.map((optionValue) => {
    return { value: optionValue, label: OPTION_LABELS[optionValue] ?? "-" };
  });

type SortGroup = (typeof GROUP_OPTIONS)[number];
type SortNonGroup = (typeof NONGROUP_OPTIONS)[number];
type SortFrequency = (typeof FREQ_RANK_OPTIONS)[number];
export type SortKey = SortGroup | SortNonGroup | SortFrequency;

export const PRIMARY_SORT_ORDER_SELECT: { value: string; label: string }[] = [
  ...GROUP_OPTIONS,
  ...NONGROUP_OPTIONS,
  ...FREQ_RANK_OPTIONS,
].map((optionValue) => {
  return { value: optionValue, label: OPTION_LABELS[optionValue] ?? "-" };
});

export const SECONDARY_SORT_ORDER_SELECT: { value: string; label: string }[] = [
  ...NONGROUP_OPTIONS,
  ...FREQ_RANK_OPTIONS,
].map((optionValue) => {
  return { value: optionValue, label: OPTION_LABELS[optionValue] ?? "-" };
});
