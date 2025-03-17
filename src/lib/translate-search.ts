import * as wanakana from "wanakana";
import { SearchType } from "@/lib/settings";

export type TranslateType = "romaji" | "hiragana" | "katakana" | "kana";

export function translateValue(val: string, type: TranslateType) {
  // Need IMEMode option to handle single kana characters like ん and い
  if (type === "hiragana") {
    return wanakana.toHiragana(val, { IMEMode: true });
  }

  if (type === "katakana") {
    return wanakana.toKatakana(val, { IMEMode: true });
  }

  if (type === "romaji") {
    return wanakana.toRomaji(val);
  }

  return wanakana.toKana(val, { IMEMode: true });
}

export const tryConvertRomaji = (kana: string) => {
  try {
    return wanakana.toRomaji(kana);
  } catch {
    return kana;
  }
};

export const translateMap: Record<SearchType, TranslateType> = {
  keyword: "romaji",
  onyomi: "katakana",
  kunyomi: "hiragana",
  meanings: "romaji",
  readings: "hiragana",
  "multi-kanji": "kana",
};

export const placeholderMap: Record<SearchType, string> = {
  keyword: "Keyword Search",
  onyomi: "オンヨミ 検索",
  kunyomi: "くんよみ 検索",
  meanings: `e.g. "world" or "person"`,
  readings: "Any Kun or On Reading",
  "multi-kanji": "e.g paste 鼻詰まり ",
};
