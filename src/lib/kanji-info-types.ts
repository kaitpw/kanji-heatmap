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

export type KanjiCacheItem = {
  main: KanjiMainInfo;
  extended?: KanjiExtendedInfo;
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
