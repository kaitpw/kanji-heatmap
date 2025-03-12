import { ITEM_CARD_BG_CN, squareCn } from "./constants";
import {
  KanjiExtendedInfo,
  KanjiInfoFrequency,
} from "./kanji-worker-constants";

export const K_JLPT = "jlpt";
export const K_JOUYOU_KEY = "jouyou-grade";
export const K_ONYOMI = "onyomi";
export const K_KUNYOMI = "kunyomi";
export const K_STROKES = "strokes";
export const K_WK_LVL = "wanikani-level";

export const K_RTK_INDEX = "rtk-index";
export const K_MEANING_KEY = "meaning-key";

export const K_RANK_NETFLIX = "rank-netflix";
export const K_RANK_DRAMA_SUBTITLES = "rank-drama-subtitles";
export const K_RANK_NOVELS_5100 = "rank-novels-5100";
export const K_RANK_TWITTER = "rank-twitter";
export const K_RANK_WIKIPEDIA_DOC = "rank-wikipedia-doc";
export const K_RANK_WIKIPEDIA_CHAR = "rank-wikipedia-char";
export const K_RANK_ONLINE_NEWS_DOC = "rank-online-news-doc";
export const K_RANK_ONLINE_NEWS_CHAR = "rank-online-news-char";
export const K_RANK_AOZORA_DOC = "rank-aozora-doc";
export const K_RANK_AOZORA_CHAR = "rank-aozora-char";

export const K_RANK_GOOGLE = "rank-google";
export const K_RANK_KUF = "rank-kuf";
export const K_RANK_MCD = "rank-mcd";
export const K_RANK_BUNKA = "rank-bunka";
export const K_RANK_JISHO = "rank-jisho";
export const K_RANK_KD = "rank-kd";
export const K_RANK_WKFR = "rank-wkfr";

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

const K_RANK_NONE = "none" as const;

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
  K_RANK_NONE,
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
  [K_RANK_NONE]: undefined,
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
  kd: "Kanji Database",
  wikiChar: "Wikipedia Characters",
  wikiDoc: "Wikipedia Documents",
  aozoraChar: "Aozora Characters",
  aozoraDoc: "Aozora Documents",
  onlineNewsChar: "Online News Characters",
  onlineNewsDoc: "Online News Documents",
  novels5100: "5100 Novels",
  dramaSubs: "Drama Subtitles",
  kuf: "Kanji Usage Frequency",
  mcd: "Matsushita's Character Database",
  bunka: "Japan's Agency for Cultural Affairs",
  wkfr: "Wikipedia Kanji Frequency Report",
  jisho: "Jisho.org",
};

const scriptin_attribute_desc = " Compiled by Dmitry Shpika.";
const doc_count_desc =
  "Document count measures how many documents the kanji appears in.";
const char_count_desc =
  "Character count measures how many times the character is used.";
const ultimate_attribute_desc = "Compiled by Patrick Kandrac.";
const ultimate_kanji_links = [
  "https://www.reddit.com/r/LearnJapanese/comments/rji33t/ultimate_kanji_frequency_list/",
  "https://www.researchgate.net/publication/357159664_2242_Kanji_Frequency_List_ver_11",
  "https://docs.google.com/spreadsheets/d/1MBYfKPrlST3F51KIKbAlsGw1x4c_atuHfPwSSRN5sLs/edit?gid=479449032#gid=479449032",
  "https://docs.google.com/spreadsheets/d/1MBYfKPrlST3F51KIKbAlsGw1x4c_atuHfPwSSRN5sLs/edit?gid=496425456#gid=496425456",
];

export const FREQ_RANK_SOURCES_INFO: Record<
  FrequencyType,
  { description: string; links: string[] }
> = {
  [K_RANK_NETFLIX]: {
    description:
      "Derived from Japanese Netflix subtitles containing about 53M total kanji occurrences. " +
      "Compiled by OhTalkWho オタク (Dave Doebrick) and published in 2019.",
    links: [
      "https://www.youtube.com/watch?v=DwJWld8hW0M",
      "https://www.mediafire.com/folder/mvh6jhwj6xxo6/Frequency_Lists",
      "https://drive.google.com/file/d/1qHEfYHXjEp83i6PxxMlSxluFyQg2W8Up/view",
    ],
  },
  [K_RANK_DRAMA_SUBTITLES]: {
    description:
      "Derived from 12,277 subtitles from Japanese drama, anime and films containing about 20.5M total kanji occurrences. " +
      "Compiled by Chris Kempson and published in 2019.",
    links: [
      "https://github.com/chriskempson/japanese-subtitles-word-kanji-frequency-lists",
      "https://github.com/Matchoo95/JP-Subtitles",
    ],
  },
  [K_RANK_NOVELS_5100]: {
    description:
      "Derived from scanning 5100 novels containing about 180M total kanji occurrences. Compiled by Redditor Nukemarine " +
      "and published in 2019.",
    links: [
      "https://drive.google.com/file/d/1zbClv0H5VgswEDAkVmF3ikiVnoi6yGsW/view",
      "https://www.reddit.com/r/LearnJapanese/comments/fhx27j/comment/fkdyksq/",
      "https://drive.google.com/file/d/1SWkufrYEY8Xyyjpt_g-s1Ygqt_XzkHGK/view",
    ],
  },
  [K_RANK_TWITTER]: {
    description:
      "Derived from Twitter messages collected last June 2015 containing about 10M total kanji occurrences. " +
      "Compiled by Dmitry Shpika.",
    links: [
      "https://github.com/scriptin/kanji-frequency/tree/master/data2015",
      "https://github.com/scriptin/kanji-frequency/blob/master/data2015/data/twitter.json",
    ],
  },
  [K_RANK_WIKIPEDIA_DOC]: {
    description:
      "Derived from 100,000 Wikipedia articles sampled in 2023 and contained 59M total kanji occurrences. " +
      doc_count_desc +
      scriptin_attribute_desc,
    links: ["https://scriptin.github.io/kanji-frequency/wikipedia/"],
  },
  [K_RANK_WIKIPEDIA_CHAR]: {
    description:
      "Derived from 100,000 Wikipedia articles sampled in 2023 and contained 59M total kanji occurrences. " +
      char_count_desc +
      scriptin_attribute_desc,
    links: ["https://scriptin.github.io/kanji-frequency/wikipedia/"],
  },
  [K_RANK_ONLINE_NEWS_DOC]: {
    description:
      "Derived from over 3,700 articles from Japanese Wikinews that were published from 2005 to 2023 and " +
      "contained 1.1M total kanji occurrences. " +
      doc_count_desc +
      scriptin_attribute_desc,
    links: ["https://scriptin.github.io/kanji-frequency/news/"],
  },
  [K_RANK_ONLINE_NEWS_CHAR]: {
    description:
      "Derived from over 3,700 articles from Japanese Wikinews that were published from 2005 to 2023 and " +
      "contained 1.1M total kanji occurrences. " +
      char_count_desc +
      scriptin_attribute_desc,
    links: ["https://scriptin.github.io/kanji-frequency/news/"],
  },
  [K_RANK_AOZORA_DOC]: {
    description:
      "Derived from over 17,000 books from Aozora Bunko, the vast majority of which are more than 70 " +
      "years old, and contained 67.8M total kanji occurrences. " +
      doc_count_desc +
      scriptin_attribute_desc,
    links: ["https://scriptin.github.io/kanji-frequency/aozora/"],
  },
  [K_RANK_AOZORA_CHAR]: {
    description:
      "Derived from over 17,000 books from Aozora Bunko, the vast majority of which are more than 70 " +
      "years old, and contained 67.8M total kanji occurrences. " +
      char_count_desc +
      scriptin_attribute_desc,
    links: ["https://scriptin.github.io/kanji-frequency/aozora/"],
  },
  [K_RANK_GOOGLE]: {
    description:
      "Kouji Shibano's Google Kanji Data from 2009 that processed 133B kanji occurrences. " +
      ultimate_attribute_desc,
    links: ultimate_kanji_links,
  },
  [K_RANK_KUF]: {
    description:
      "Kanji Usage Frequency (KUF) from 2016 that processed 850M kanji occurrences from Wikipedia, Aozora, " +
      "e-news, Twitter. " +
      ultimate_attribute_desc,
    links: ultimate_kanji_links,
  },
  [K_RANK_MCD]: {
    description:
      "Matsushita's Character Database (MCD) from 2014 that processed 33M words from sources The Balanced " +
      "Corpus of Contemporary Written Japanese (BCCWJ) and Yahoo知恵袋 aka Japanese Yahoo Answer. " +
      ultimate_attribute_desc,
    links: ultimate_kanji_links,
  },
  [K_RANK_BUNKA]: {
    description:
      "Published by the Japanese Agency for Cultural Affairs (文化庁) on 2010 that processed 1.45M kanji from " +
      "various sources including books, magazines, textbooks, newspapers such as Asahi and Yomiuri, websites, etc. " +
      ultimate_attribute_desc,
    links: ultimate_kanji_links,
  },
  [K_RANK_JISHO]: {
    description:
      "Jisho.org uses Alexandre Girardi's word frequency list published in 1998 that used 300,000 words found " +
      "in 4 years of the Mainichi Newpaper. " +
      ultimate_attribute_desc,
    links: ultimate_kanji_links,
  },
  [K_RANK_KD]: {
    description:
      "The Kanji Database (KD) or kanjidatabase.com frequency list for the 2,136 Jouyou kanji analyzed " +
      "about 300M kanji occurrences published in the Mainichi Newspaper from 2000 to 2010. " +
      ultimate_attribute_desc,
    links: ultimate_kanji_links,
  },
  [K_RANK_WKFR]: {
    description:
      "Alex Yatskov's Wikipedia Kanji Frequency Report (WKFR) published in 2010 analyzed more than 500M " +
      "kanji occurrences. " +
      ultimate_attribute_desc,
    links: ultimate_kanji_links,
  },
  [K_RANK_NONE]: {
    description: "Do not select any frequency data source.",
    links: [],
  },
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

export const ALL_SORT_OPTIONS: SortKey[] = [
  ...GROUP_OPTIONS,
  ...NONGROUP_OPTIONS,
  ...FREQ_RANK_OPTIONS,
];

export const SORT_ORDER_SELECT: { value: SortKey; label: string }[] =
  ALL_SORT_OPTIONS.map((optionValue) => {
    return {
      value: optionValue,
      label: OPTION_LABELS[optionValue as SortKey] ?? "None",
    };
  });

export const freqCategoryCount = 6;
export type FreqCategory = 0 | 1 | 2 | 3 | 4 | 5;
// TODO: Generate this as a function of freqCategoryCount
// generating these tw classes on the fly actually doesn't work idk why
export const freqCategoryCn: Record<FreqCategory, string> = {
  0: "bg-opacity-0",
  1: "bg-opacity-20",
  2: "bg-opacity-40",
  3: "bg-opacity-60",
  4: "bg-opacity-80",
  5: "bg-opacity-100",
};

export const freqCategoryOpacity: Record<FreqCategory, number> = {
  0: 0.1,
  1: 0.25,
  2: 0.45,
  3: 0.65,
  4: 0.85,
  5: 1,
};

const freqRankMaxMin: Record<FreqCategory, { min: number; max: number }> = {
  0: { min: 2250, max: Infinity },
  1: { min: 1700, max: 2250 },
  2: { min: 1100, max: 1700 },
  3: { min: 650, max: 1100 },
  4: { min: 300, max: 650 },
  5: { min: 0, max: 300 },
};

export const getFreqCategory = (freqRank?: number) => {
  return freqRank == null || freqRank > 2250
    ? 0
    : freqRankMaxMin[1].min < freqRank && freqRank <= freqRankMaxMin[1].max
      ? 1
      : freqRankMaxMin[2].min < freqRank && freqRank <= freqRankMaxMin[2].max
        ? 2
        : freqRankMaxMin[3].min < freqRank && freqRank <= freqRankMaxMin[3].max
          ? 3
          : freqRankMaxMin[4].min < freqRank &&
              freqRank <= freqRankMaxMin[4].max
            ? 4
            : 5;
};

export const getFreqCnByRank = (rank: number) => {
  const freqRankCategory = rank === -1 ? 0 : getFreqCategory(rank);

  const bgColor = freqCategoryCn[freqRankCategory];
  return `${ITEM_CARD_BG_CN} ${squareCn} ${bgColor}`;
};
