import { JLTPTtypes } from "./jlpt";
import {
  KanjiExtendedInfo,
  KanjiInfoFrequency,
  KanjiMainInfo,
} from "./kanji-worker-types";

export type KanjiInfoRequestType =
  | "item-card"
  | "hover-card"
  | "general"
  | "frequency-ranks"
  | "main-plus-extended";

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
};

export type HoverItemReturnData = {
  keyword: string;
  on: string;
  kun: string;
  jlpt: JLTPTtypes;
  parts: { part: string; keyword: string }[];
  frequency?: KanjiInfoFrequency;
  phonetic?: { phonetic: string; sound: string; keyword: string };
  mainVocab: {
    first: {
      word: string;
      spacedKana: string;
      meaning: string;
      partsList: {
        kanji: string;
        keyword: string;
      }[];
    };
    second: {
      word: string;
      spacedKana: string;
      meaning: string;
      partsList: {
        kanji: string;
        keyword: string;
      }[];
    };
  };
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

export type KanjiCacheType = Record<string, KanjiCacheItem>;
export type KanjiPhoneticCacheType = Record<string, string>;
export type KanjiPartKeywordCacheType = Record<string, string>;
