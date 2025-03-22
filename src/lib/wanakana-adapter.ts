import * as wanakana from "wanakana";

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

const wanakanaAdapter = {
  toKatakana: wanakana.toKatakana,
  toRomaji: wanakana.toRomaji,
  toHiragana: wanakana.toHiragana,
  toKana: wanakana.toKana,
  isJapanese: wanakana.isJapanese,
  isKatakana: wanakana.isKatakana,
  isHiragana: wanakana.isHiragana,
  isRomaji: wanakana.isRomaji,
};

export default wanakanaAdapter;
