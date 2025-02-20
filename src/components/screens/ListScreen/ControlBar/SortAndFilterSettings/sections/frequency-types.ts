export const K_JLPT = "jlpt";
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

export const GROUP_OPTIONS = [K_JLPT, K_KUNYOMI, K_ONYOMI, K_STROKES, K_WK_LVL];

export const NONGROUP_OPTIONS = [K_RTK_INDEX, K_MEANING_KEY];

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
];

export const OPTION_LABELS: Record<string, string> = {
  [K_JLPT]: "JLPT",
  [K_KUNYOMI]: "Kunyomi",
  [K_ONYOMI]: "Onyomi",
  [K_STROKES]: "Strokes",
  [K_WK_LVL]: "Wanikani Level",
  [K_RTK_INDEX]: "RTK Index",
  [K_MEANING_KEY]: "Meaning Key",
  [K_RANK_NETLIX]: "Frequency Rank - Netflix",
  [K_RANK_DRAMA_SUBTITLES]: "Frequency Rank - Drama Subtitles Corpus ",
  [K_RANK_NOVELS_5100]: "Frequency Rank - 5100 Novels Corpus",
  [K_RANK_TWITTER]: "Frequency Rank - Twitter Corpus",
  [K_RANK_WIKIPEDIA_DOC]: "Frequency Rank - Wikipedia Doc",
  [K_RANK_WIKIPEDIA_CHAR]: "Frequency Rank - Wikipedia Char",
  [K_RANK_ONLINE_NEWS_DOC]: "Frequency Rank - Online News Doc ",
  [K_RANK_ONLINE_NEWS_CHAR]: "Frequency Rank - Online News Doc ",
  [K_RANK_AOZORA_DOC]: "Frequency Rank - Aozora Doc",
  [K_RANK_AOZORA_CHAR]: "Frequency Rank -Aozora Docs",
  [K_RANK_NEWSPAPER_1]: "Frequency Rank - Newspaper 1",
  [K_RANK_NEWSPAPER_2]: "Frequency Rank  - Newspaper 2",
};

export const FREQUENCY_RANK_FILTER_OPTIONS: { value: string; label: string }[] =
  FREQ_RANK_OPTIONS.map((optionValue) => {
    return { value: optionValue, label: OPTION_LABELS[optionValue] ?? "-" };
  });

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
