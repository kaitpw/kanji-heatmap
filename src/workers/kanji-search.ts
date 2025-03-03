import { JLPTRank, JLTPTtypes, SearchSettings } from "@/lib/constants";
import {
  K_JLPT,
  K_JOUYOU_KEY,
  K_MEANING_KEY,
  K_RANK_AOZORA_CHAR,
  K_RANK_AOZORA_DOC,
  K_RANK_DRAMA_SUBTITLES,
  K_RANK_NETFLIX,
  K_RANK_NOVELS_5100,
  K_RANK_ONLINE_NEWS_CHAR,
  K_RANK_ONLINE_NEWS_DOC,
  K_RANK_TWITTER,
  K_RANK_WIKIPEDIA_CHAR,
  K_RANK_WIKIPEDIA_DOC,
  K_RTK_INDEX,
  K_STROKES,
  K_WK_LVL,
  SortKey,
} from "@/lib/frequency-rank";
import { KanjiExtendedInfo, KanjiMainInfo } from "@/lib/kanji-worker-constants";

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

export const searchKanji = (settings: SearchSettings, kanjiPool: DataPool) => {
  const allKanji = Object.keys(kanjiPool.main);

  // Filters
  const jlptFilters = new Set(settings.filterSettings.jlpt);
  const minStrokes = settings.filterSettings.strokeRange.min;
  const maxStrokes = settings.filterSettings.strokeRange.max;

  // Sorting
  const primarySort = settings.sortSettings.primary;
  const secondarySort = settings.sortSettings.secondary;

  const kanjiList = allKanji
    .filter((kanji) => {
      const info = kanjiPool.main[kanji];
      if ([0, 6].includes(jlptFilters.size)) return true;
      return jlptFilters.has(info.jlpt);
    })
    .filter((kanji) => {
      const exInfo = kanjiPool.extended[kanji];
      return maxStrokes >= exInfo.strokes && exInfo.strokes >= minStrokes;
    })
    .sort((a, b) => {
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
        } else if (sortKey === K_RANK_NETFLIX) {
          return freqSort(
            exInfoA.frequency?.netflix,
            exInfoB.frequency?.netflix
          );
        } else if (sortKey === K_RANK_DRAMA_SUBTITLES) {
          return freqSort(
            exInfoA.frequency?.dramaSubs,
            exInfoB.frequency?.dramaSubs
          );
        } else if (sortKey === K_RANK_NOVELS_5100) {
          return freqSort(
            exInfoA.frequency?.novels5100,
            exInfoB.frequency?.novels5100
          );
        } else if (sortKey === K_RANK_TWITTER) {
          return freqSort(
            exInfoA.frequency?.twitter,
            exInfoB.frequency?.twitter
          );
        } else if (sortKey === K_RANK_WIKIPEDIA_DOC) {
          return freqSort(
            exInfoA.frequency?.wikiDoc,
            exInfoB.frequency?.wikiDoc
          );
        } else if (sortKey === K_RANK_WIKIPEDIA_CHAR) {
          return freqSort(
            exInfoA.frequency?.wikiChar,
            exInfoB.frequency?.wikiChar
          );
        } else if (sortKey === K_RANK_ONLINE_NEWS_DOC) {
          return freqSort(
            exInfoA.frequency?.onlineNewsDoc,
            exInfoB.frequency?.onlineNewsDoc
          );
        } else if (sortKey === K_RANK_ONLINE_NEWS_CHAR) {
          return freqSort(
            exInfoA.frequency?.onlineNewsChar,
            exInfoB.frequency?.onlineNewsChar
          );
        } else if (sortKey === K_RANK_AOZORA_DOC) {
          return freqSort(
            exInfoA.frequency?.aozoraDoc,
            exInfoB.frequency?.aozoraDoc
          );
        } else if (sortKey === K_RANK_AOZORA_CHAR) {
          return freqSort(
            exInfoA.frequency?.aozoraChar,
            exInfoB.frequency?.aozoraChar
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
