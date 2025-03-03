import { JLTPTtypes } from "@/lib/constants";
import {
  ExtendedKanjiInfoItemType,
  ExtendedKanjiInfoResponseType,
  KanjiExtendedInfo,
  KanjiMainInfo,
  MainKanjiInfoResponseType,
  SegmentedVocabInfo,
  SegmentedVocabResponseType,
} from "@/lib/kanji-worker-constants";

export const kanjiMainInfoCache: Record<string, KanjiMainInfo> = {};
export const kanjiOtherInfoCache: Record<string, KanjiExtendedInfo> = {};

const MAIN_KANJI_INFO_FILE_PATH = "/json/kanji_main_reformatted.json";
const EXTENDED_KANJI_INFO_FILE_PATH = "/json/kanji_other_reformatted.json";
const PHONETIC_FILE = "/json/generated_reformatted_phonetic.json";
const PART_KEYWORD_FILE = "/json/generated_reformatted_part_keyword_info.json";
const SEGMENTED_VOCAB_FILE = "/json/vocab_segmentation.json";

const createFetch = <T>(path: string) => {
  return () =>
    fetch(path).then((response) => {
      const json = response.json();
      return json as Promise<T>;
    });
};

export const fetchMainManjiInfo = createFetch<MainKanjiInfoResponseType>(
  MAIN_KANJI_INFO_FILE_PATH
);

export const fetchExtendedKanjiInfo =
  createFetch<ExtendedKanjiInfoResponseType>(EXTENDED_KANJI_INFO_FILE_PATH);

export const fetchPhoneticInfo =
  createFetch<Record<string, string>>(PHONETIC_FILE);

export const fetchPartKeywordInfo =
  createFetch<Record<string, string>>(PART_KEYWORD_FILE);

export const fetchSegmentedVocab =
  createFetch<SegmentedVocabResponseType>(SEGMENTED_VOCAB_FILE);

export const transformToSegmentedVocab = (
  raw: [string, Record<string, string>]
): SegmentedVocabInfo => {
  const [spacedKana, kanjiReads] = raw;
  return { spacedKana, kanjis: kanjiReads };
};

export const transformToMainKanjiInfo = (
  raw: [string, string, string, number]
) => {
  const [keyword, on, kun, jlptRaw] = raw;

  const jlpt: JLTPTtypes =
    jlptRaw === 5
      ? "n5"
      : jlptRaw === 4
        ? "n4"
        : jlptRaw === 3
          ? "n3"
          : jlptRaw === 2
            ? "n2"
            : jlptRaw === 1
              ? "n1"
              : "none";

  return {
    keyword,
    on,
    kun,
    jlpt,
  };
};

export const transformToExtendedKanjiInfo = (
  item: ExtendedKanjiInfoItemType
) => {
  const [second, freq, vocab] = item;
  const v1 = vocab[0];
  const v2 = vocab[1];
  const mainVocab = {
    first: v1
      ? {
          word: v1[0],
          spacedKana: v1[1],
          meaning: v1[2],
        }
      : undefined,

    second: v2
      ? {
          word: v2[0],
          spacedKana: v2[1],
          meaning: v2[2],
        }
      : undefined,
  };

  return {
    parts: second[0],
    strokes: second[1],
    rtk: second[2],
    wk: second[3],
    jouyouGrade: second[4],
    meanings: second[5],
    allOn: second[6],
    allKun: second[7],
    frequency: {
      netflix: freq[0], //rank_netflix
      twitter: freq[1], //rank_twitter
      google: freq[2], //rank_google
      kd: freq[3], //rank_kd
      wikiChar: freq[4], //rank_wikipedia_char
      wikiDoc: freq[5], //rank_wikipedia_doc
      aozoraChar: freq[6], //rank_aozora_char
      aozoraDoc: freq[7], //rank_aozora_doc
      onlineNewsChar: freq[8], //rank_online_news_char
      onlineNewsDoc: freq[9], //rank_online_news_doc
      novels5100: freq[10], //rank_novels_5100
      dramaSubs: freq[11], //rank_drama_subtitles
      kuf: freq[12], //rank_kuf
      mdc: freq[13], //rank_mcd
      bunka: freq[14], //rank_bunka
      wkfr: freq[15], //rank_wkfr
      jishou: freq[16], //rank_jisho
    },
    mainVocab,
  };
};
