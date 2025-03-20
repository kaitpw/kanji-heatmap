import * as wanakana from "wanakana";

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
