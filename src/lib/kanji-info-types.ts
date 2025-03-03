import { KanjiExtendedInfo, KanjiMainInfo } from "./kanji-worker-constants";

export type KanjiInfoRequestType =
  | "item-card"
  | "hover-card"
  | "general"
  | "frequency-ranks"
  | "main-plus-extended";
//  | "notes"
//  | "related-kanji"
//  | "all-vocab";

type VocabExtendedInfo = {
  vocabInfo?: {
    first?: {
      spacedKana: string;
      kanjis: Record<string, string>;
    };
    second?: {
      spacedKana: string;
      kanjis: Record<string, string>;
    };
  };
};

export type KanjiCacheItem = {
  main: KanjiMainInfo;
  extended?: KanjiExtendedInfo & VocabExtendedInfo;
  //  notes?: string;
  //  otherVocab?: { word: string; spacedKana: string; meaning: string }[];
  //  relatedKanji?: {
  //    similar: string[];
  //    partOf: string[];
  //  };
};

export type KanjiCacheType = Record<string, KanjiCacheItem>;
export type KanjiPhoneticCacheType = Record<string, string>;
export type KanjiPartKeywordCacheType = Record<string, string>;
