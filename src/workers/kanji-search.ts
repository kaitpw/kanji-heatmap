import { JLPTRank, JLTPTtypes, SearchSettings } from "@/lib/constants";
import {
  K_JLPT,
  K_JOUYOU_KEY,
  K_STROKES,
  K_WK_LVL,
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

const strokeSort = (a: number, b: number) => {
  if (a == b) return 0;
  if (a == -1) return 1;
  if (b == -1) return -1;
  return a - b;
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
      if (primarySort === K_JLPT) {
        const compareVal = jlptSort(infoA.jlpt, infoB.jlpt);
        if (compareVal != 0) return compareVal;
      } else if (primarySort === K_JOUYOU_KEY) {
        const compareVal = simpleSort(exInfoA.jouyouGrade, exInfoB.jouyouGrade);
        if (compareVal != 0) return compareVal;
      } else if (primarySort === K_STROKES) {
        const compareVal = strokeSort(exInfoA.strokes, exInfoB.strokes);
        if (compareVal != 0) return compareVal;
      } else if (primarySort === K_WK_LVL) {
        const compareVal = simpleSort(exInfoA.wk, exInfoB.wk);
        if (compareVal != 0) return compareVal;
      }

      if (secondarySort === K_JLPT) {
        return jlptSort(infoA.jlpt, infoB.jlpt);
      } else if (secondarySort === K_JOUYOU_KEY) {
        return simpleSort(exInfoA.jouyouGrade, exInfoB.jouyouGrade);
      } else if (secondarySort === K_STROKES) {
        return strokeSort(exInfoA.strokes, exInfoB.strokes);
      } else if (secondarySort === K_WK_LVL) {
        return simpleSort(exInfoA.wk, exInfoB.wk);
      }
      return 0;
    });

  return kanjiList;
};
