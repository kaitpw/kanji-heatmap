import { JLTPTtypes } from "./jlpt";

export type KanjiWorkerInfoRequestType = "kanji-extended";
// | "kanji-related-kanji"
// | "kanji-notes"
// | "kanji-other-vocab";

export type KanjiSearchRequestType = "search-result-count" | "search";

export type KanjiMainInfo = {
  keyword: string;
  jlpt: JLTPTtypes;
  on: string;
  kun: string;
};

export type KanjiInfoFrequency = {
  netflix: number; //rank_netflix,
  twitter: number; //rank_twitter,
  google: number; //rank_google,
  wkfr: number; //rank_wkfr,
  wikiChar: number; //rank_wikipedia_char,
  wikiDoc: number; //rank_wikipedia_doc,
  aozoraChar: number; //rank_aozora_char,
  aozoraDoc: number; //rank_aozora_doc,
  onlineNewsChar: number; //rank_online_news_char,
  onlineNewsDoc: number; //rank_online_news_doc,
  novels5100: number; //rank_novels_5100,
  dramaSubs: number; //rank_drama_subtitles,
  kuf: number; //rank_kuf,
  mcd: number; //rank_mcd,
  bunka: number; //rank_bunka,
  kd: number; //rank_kd,
  jisho: number; //rank_jisho,
};

export type KanjiExtendedInfo = {
  parts: string[];
  strokes: number;
  rtk: number;
  wk: number;
  jouyouGrade: number;
  meanings: string[];
  allOn: string[];
  allKun: string[];
  phonetic?: string;
  frequency?: KanjiInfoFrequency;
  mainVocab?: string[];
};

export type WordMeaning = string;
export type WordPartDetail = string[];
export type SegmentedVocabResponseType = Record<
  string,
  [WordMeaning, WordPartDetail[]]
>;

export type SegmentedVocabInfo = {
  meaning: WordMeaning;
  parts: WordPartDetail[];
};

export type MainKanjiInfoResponseType = Record<
  string,
  [string, string, string, number]
>;

export type ExtendedKanjiInfoItemType = [
  [
    string[], // component parts
    number, // strokes
    number, // rtk index
    number, // wk level
    number, // jouyou grade
    string[], // meanings
    string[], // on readings
    string[], // kun readings
    string, // semantic phonetic if any
  ],
  [
    number, //rank_netflix,
    number, //rank_twitter,
    number, //rank_google,
    number, //rank_wkfr,
    number, //rank_wikipedia_char,
    number, //rank_wikipedia_doc,
    number, //rank_aozora_char,
    number, //rank_aozora_doc,
    number, //rank_online_news_char,
    number, //rank_online_news_doc,
    number, //rank_novels_5100,
    number, //rank_drama_subtitles,
    number, //rank_kuf,
    number, //rank_mcd,
    number, //rank_bunka,
    number, //rank_kd,
    number, //rank_jisho,
  ],
  string[], // sample vocabulary
];

export type ExtendedKanjiInfoResponseType = Record<
  string,
  ExtendedKanjiInfoItemType
>;

export type KanjiWorkerRequestName =
  | KanjiWorkerInfoRequestType
  | KanjiSearchRequestType
  | "initialize-extended-kanji-map"
  | "initalize-segmented-vocab-map"
  | "kanji-main-map"
  | "phonetic-map"
  | "part-keyword-map";

export type KanjiWorkerRequest = {
  type: KanjiWorkerRequestName;
  payload?: unknown;
};

export type OnMessageRequestType = {
  id: number;
  data: KanjiWorkerRequest;
};

export type PostMessageResponseType = {
  id: number;
  response: {
    requestType: KanjiWorkerRequestName;
    error?: { message: string } | null;
    status: "COMPLETED" | "ERRORED";
    data?: unknown;
  };
};
