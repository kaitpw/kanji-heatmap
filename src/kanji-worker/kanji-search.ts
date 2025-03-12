import {
  getFrequency,
  K_JLPT,
  K_JOUYOU_KEY,
  K_MEANING_KEY,
  K_RANK_AOZORA_CHAR,
  K_RANK_AOZORA_DOC,
  K_RANK_BUNKA,
  K_RANK_DRAMA_SUBTITLES,
  K_RANK_GOOGLE,
  K_RANK_JISHO,
  K_RANK_KD,
  K_RANK_KUF,
  K_RANK_MCD,
  K_RANK_NETFLIX,
  K_RANK_NOVELS_5100,
  K_RANK_ONLINE_NEWS_CHAR,
  K_RANK_ONLINE_NEWS_DOC,
  K_RANK_TWITTER,
  K_RANK_WIKIPEDIA_CHAR,
  K_RANK_WIKIPEDIA_DOC,
  K_RANK_WKFR,
  K_RTK_INDEX,
  K_STROKES,
  K_WK_LVL,
  SortKey,
} from "@/lib/ranks-sorts-filters";
import { JLPTRank, JLTPTtypes } from "@/lib/jlpt";
import { KanjiExtendedInfo, KanjiMainInfo } from "@/lib/kanji-worker-constants";
import { SearchSettings } from "@/lib/settings";
import fuzzysearch from "fuzzysearch";
import * as wanakana from "wanakana";

type DataPool = {
  main: Record<string, KanjiMainInfo>;
  extended: Record<string, KanjiExtendedInfo>;
};

const jlptSort = (a: JLTPTtypes, b: JLTPTtypes) => {
  const rankA = JLPTRank[a];
  const rankB = JLPTRank[b];
  return rankA - rankB;
};

const simpleSort = (a: number, b: number) => {
  return a - b;
};

const alphaSort = (a: string, b: string) => {
  const lowerA = a.toLowerCase();
  const lowerB = b.toLowerCase();
  if (lowerA < lowerB) {
    return -1;
  }
  if (lowerA > lowerB) {
    return 1;
  }
  return 0;
};

const numericSort = (a: number, b: number) => {
  if (a == b) return 0;
  if (a == -1) return 1;
  if (b == -1) return -1;
  return a - b;
};

const freqSort = (a: number | undefined, b: number | undefined) => {
  const numA = a ?? Number.MAX_VALUE;
  const numB = b ?? Number.MAX_VALUE;
  return numA - numB;
};

export const filterKanji = (
  allKanji: string[],
  settings: SearchSettings,
  kanjiPool: DataPool
) => {
  const jlptFilters = new Set(settings.filterSettings.jlpt);
  const minStrokes = settings.filterSettings.strokeRange.min;
  const maxStrokes = settings.filterSettings.strokeRange.max;
  const freqFilter = settings.filterSettings.freq;

  return allKanji
    .filter((kanji) => {
      const textSearch = settings.textSearch;
      if (textSearch.type === "keyword") {
        const info = kanjiPool.main[kanji];
        return fuzzysearch(textSearch.text, info.keyword);
      }
      if (textSearch.text === "") {
        return true;
      }
      const exInfo = kanjiPool.extended[kanji];
      if (textSearch.type === "kunyomi") {
        return exInfo.allKun
          .map((item) => {
            return wanakana.toHiragana(item.replace(/[-.]/g, ""));
          })
          .includes(textSearch.text);
      }
      if (textSearch.type === "onyomi") {
        return exInfo.allOn
          .map((item) => {
            return wanakana.toKatakana(item);
          })
          .includes(textSearch.text);
      }
      return true;
    })
    .filter((kanji) => {
      const info = kanjiPool.main[kanji];
      if ([0, 6].includes(jlptFilters.size)) {
        return true;
      }
      return jlptFilters.has(info.jlpt);
    })
    .filter((kanji) => {
      const exInfo = kanjiPool.extended[kanji];
      const withinRange =
        maxStrokes >= exInfo.strokes && exInfo.strokes >= minStrokes;
      return withinRange;
    })
    .filter((kanji) => {
      if (freqFilter.source === "none") {
        return true;
      }
      const exInfo = kanjiPool.extended[kanji];
      const freq = getFrequency(freqFilter.source, exInfo) ?? Number.MAX_VALUE;
      const withinRange =
        freq >= freqFilter.rankRange.min && freq <= freqFilter.rankRange.max;
      return withinRange;
    });
};

export const searchKanji = (settings: SearchSettings, kanjiPool: DataPool) => {
  const allKanji = Object.keys(kanjiPool.main);

  // Sorting
  const primarySort = settings.sortSettings.primary;
  const secondarySort = settings.sortSettings.secondary;

  const kanjiList = filterKanji(allKanji, settings, kanjiPool).sort((a, b) => {
    const infoA = kanjiPool.main[a];
    const infoB = kanjiPool.main[b];
    const exInfoA = kanjiPool.extended[a];
    const exInfoB = kanjiPool.extended[b];

    const sortBy = (sortKey: SortKey) => {
      if (sortKey === K_JLPT) {
        return jlptSort(infoA.jlpt, infoB.jlpt);
      } else if (sortKey === K_JOUYOU_KEY) {
        return simpleSort(exInfoA.jouyouGrade, exInfoB.jouyouGrade);
      } else if (sortKey === K_STROKES) {
        return numericSort(exInfoA.strokes, exInfoB.strokes);
      } else if (sortKey === K_WK_LVL) {
        return numericSort(exInfoA.wk, exInfoB.wk);
      } else if (sortKey === K_RTK_INDEX) {
        return numericSort(exInfoA.rtk, exInfoB.rtk);
      } else if (sortKey === K_MEANING_KEY) {
        return alphaSort(infoA.keyword, infoB.keyword);
      } else if (
        [
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
        ].includes(sortKey)
      ) {
        return freqSort(
          getFrequency(sortKey, exInfoA),
          getFrequency(sortKey, exInfoB)
        );
      }
      return 0;
    };

    const compareVal = sortBy(primarySort);
    if (compareVal != 0) {
      return compareVal;
    }
    return sortBy(secondarySort);
  });

  return kanjiList;
};
