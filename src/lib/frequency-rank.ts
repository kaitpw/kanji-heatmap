import { ITEM_CARD_BG_CN, squareCn } from "./constants";
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

const nonFreqOptionLabels: Record<SortGroup | SortNonGroup, string> = {
  [K_JLPT]: "JLPT",
  [K_JOUYOU_KEY]: "Jouyou Grade",
  [K_STROKES]: "Stroke Count",
  [K_WK_LVL]: "Wanikani Level",
  [K_RTK_INDEX]: "RTK Index",
  [K_MEANING_KEY]: "Keyword",
};

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

type SortGroup = (typeof GROUP_OPTIONS)[number];
type SortNonGroup = (typeof NONGROUP_OPTIONS)[number];
export type FrequencyType = (typeof FREQ_RANK_OPTIONS)[number];
export type SortKey = SortGroup | SortNonGroup | FrequencyType;

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

type FreqMapInverse = Record<keyof KanjiInfoFrequency, FrequencyType>;
export const inverseFreqMap = Object.keys(freqMap).reduce((acc, item) => {
  const infoFreq = item as FrequencyType;

  if (item == null) {
    return acc;
  }

  const type = freqMap[infoFreq];

  if (type == null) {
    return acc;
  }

  acc[type] = infoFreq;

  return acc;
}, {} as FreqMapInverse);

export const frequencyRankLabels: Record<keyof KanjiInfoFrequency, string> = {
  netflix: "Netflix",
  twitter: "Twitter",
  google: "Google",
  kd: "KD",
  wikiChar: "Wikipedia Characters",
  wikiDoc: "Wikipedia Documents",
  aozoraChar: "Aozora Characters",
  aozoraDoc: "Aozora Documents",
  onlineNewsChar: "Online News Characters",
  onlineNewsDoc: "Online News Documents",
  novels5100: "5100 Novels",
  dramaSubs: "Drama Subtitles",
  kuf: "KUF",
  mcd: "MCD",
  bunka: "Bunka",
  wkfr: "WKFR",
  jisho: "Jisho",
};

const kanji_freq_desc =
  "This kanji usage frequency by Dmitry Shpika was built from sources that represent different " +
  "styles (journalistic, academic, literary) from 3.7k news articles, 100k Wikipedia articles and 17k books. Doc count " +
  "measures how many documents the kanji appears in, while char count measures how many times it appears in the source.";
const kanji_freq_links = ["https://scriptin.github.io/kanji-frequency/"];
const ultimate_kanji_desc =
  "This kanji frequency list by Patrick Kandrac used data from 7 kanji databases such as " +
  "Shibano's Google Kanji Data (133B kanji), Kanji Usage Frequency - KUF (850M kanji from Wikipedia, Aozora, e-news, " +
  "Twitter), Matsushita's Character Database (MCD).";
const ultimate_kanji_links = [
  "https://www.reddit.com/r/LearnJapanese/comments/rji33t/ultimate_kanji_frequency_list/",
  "https://www.researchgate.net/publication/357159664_2242_Kanji_Frequency_List_ver_11",
  "https://docs.google.com/spreadsheets/d/1MBYfKPrlST3F51KIKbAlsGw1x4c_atuHfPwSSRN5sLs/edit?gid=496425456#gid=496425456",
];

export const FREQ_RANK_SOURCES_INFO: Record<
  FrequencyType,
  { description: string; links: string[] }
> = {
  [K_RANK_NETFLIX]: {
    description:
      "Netflix Frequency is based on the list by OhTalkWho オタク (Dave Doebrick)",
    links: [
      "https://www.youtube.com/watch?v=DwJWld8hW0M",
      "https://www.mediafire.com/folder/mvh6jhwj6xxo6/Frequency_Lists",
      "https://drive.google.com/file/d/1qHEfYHXjEp83i6PxxMlSxluFyQg2W8Up/view",
    ],
  },
  [K_RANK_DRAMA_SUBTITLES]: {
    description:
      "This kanji frequency list by Chris Kempson is derived from 12,277 subtitles from Japanese drama, anime and films",
    links: [
      "https://github.com/chriskempson/japanese-subtitles-word-kanji-frequency-lists",
      "https://github.com/Matchoo95/JP-Subtitles",
    ],
  },
  [K_RANK_NOVELS_5100]: {
    description:
      "This kanji frequency list by Redditor Nukemarine is made from scanning 5100 novels.",
    links: [
      "https://drive.google.com/file/d/1zbClv0H5VgswEDAkVmF3ikiVnoi6yGsW/view",
      "https://www.reddit.com/r/LearnJapanese/comments/fhx27j/comment/fkdyksq/",
      "https://drive.google.com/file/d/1SWkufrYEY8Xyyjpt_g-s1Ygqt_XzkHGK/view",
    ],
  },
  [K_RANK_TWITTER]: {
    description:
      "This kanji frequency list by Dmitry Shpika was derived from Twitter messages collected by a bot " +
      "last June 2015. It processed a total of ~10M kanji.",
    links: [
      "https://github.com/scriptin/kanji-frequency/tree/master/data2015",
      "https://github.com/scriptin/kanji-frequency/blob/master/data2015/data/twitter.json",
    ],
  },
  [K_RANK_WIKIPEDIA_DOC]: {
    description: kanji_freq_desc,
    links: kanji_freq_links,
  },
  [K_RANK_WIKIPEDIA_CHAR]: {
    description: kanji_freq_desc,
    links: kanji_freq_links,
  },
  [K_RANK_ONLINE_NEWS_DOC]: {
    description: kanji_freq_desc,
    links: kanji_freq_links,
  },
  [K_RANK_ONLINE_NEWS_CHAR]: {
    description: kanji_freq_desc,
    links: kanji_freq_links,
  },
  [K_RANK_AOZORA_DOC]: {
    description: kanji_freq_desc,
    links: kanji_freq_links,
  },
  [K_RANK_AOZORA_CHAR]: {
    description: kanji_freq_desc,
    links: kanji_freq_links,
  },
  [K_RANK_GOOGLE]: {
    description: ultimate_kanji_desc,
    links: ultimate_kanji_links,
  },
  [K_RANK_KUF]: {
    description: ultimate_kanji_desc,
    links: ultimate_kanji_links,
  },
  [K_RANK_MCD]: {
    description: ultimate_kanji_desc,
    links: ultimate_kanji_links,
  },
  [K_RANK_BUNKA]: {
    description: ultimate_kanji_desc,
    links: ultimate_kanji_links,
  },
  [K_RANK_JISHO]: {
    description: ultimate_kanji_desc,
    links: ultimate_kanji_links,
  },
  [K_RANK_KD]: {
    description: ultimate_kanji_desc,
    links: ultimate_kanji_links,
  },
  [K_RANK_WKFR]: {
    description: ultimate_kanji_desc,
    links: ultimate_kanji_links,
  },
  None: { description: "", links: [] },
};

export const getFrequency = (freq: FrequencyType, info: KanjiExtendedInfo) => {
  if (info.frequency == null || freqMap[freq] == null) {
    return undefined;
  }
  return info.frequency[freqMap[freq]];
};

type OptionLabelType = Record<SortKey, string>;

export const OPTION_LABELS: OptionLabelType = Object.keys({
  ...nonFreqOptionLabels,
  ...freqMap,
}).reduce((acc: OptionLabelType, option: string) => {
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
}, {} as OptionLabelType);

export const FREQUENCY_RANK_FILTER_OPTIONS: {
  value: FrequencyType;
  label: string;
}[] = FREQ_RANK_OPTIONS.map((optionValue) => {
  return { value: optionValue, label: OPTION_LABELS[optionValue] ?? "None" };
});

export const SORT_ORDER_SELECT: { value: SortKey; label: string }[] = [
  ...GROUP_OPTIONS,
  ...NONGROUP_OPTIONS,
  ...FREQ_RANK_OPTIONS,
].map((optionValue) => {
  return {
    value: optionValue,
    label: OPTION_LABELS[optionValue as SortKey] ?? "None",
  };
});

export const freqCategoryCount = 6;

// TODO: Generate this as a function of freqCategoryCount
// generating these tw classes on the fly actually doesn't work idk why
export const freqCategoryCn: Record<number, string> = {
  0: "bg-opacity-0",
  1: "bg-opacity-20",
  2: "bg-opacity-40",
  3: "bg-opacity-60",
  4: "bg-opacity-80",
  5: "bg-opacity-100",
};

export const freqCategoryOpacity: Record<number, number> = {
  0: 0.1,
  1: 0.25,
  2: 0.45,
  3: 0.65,
  4: 0.85,
  5: 1,
};

export const getFreqCategory = (freqRank?: number) => {
  return freqRank == null || freqRank > 2250
    ? 0
    : 1700 < freqRank && freqRank <= 2250
      ? 1
      : 1100 < freqRank && freqRank <= 1700
        ? 2
        : 650 < freqRank && freqRank <= 1100
          ? 3
          : 300 < freqRank && freqRank <= 650
            ? 4
            : 5;
};

export const getFreqCnByRank = (rank: number) => {
  const freqRankCategory = rank === -1 ? 0 : getFreqCategory(rank);

  const bgColor = freqCategoryCn[freqRankCategory];
  return `${ITEM_CARD_BG_CN} ${squareCn} ${bgColor}`;
};
