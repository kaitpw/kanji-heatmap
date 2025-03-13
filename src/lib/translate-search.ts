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

  return wanakana.toRomaji(val);
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
};

export const placeholderMap: Record<SearchType, string> = {
  keyword: "Keyword Search",
  onyomi: "オンヨミ 検索",
  kunyomi: "くんよみ 検索",
};
