import { JLPTRank, SearchSettings } from "@/lib/constants";
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

export const searchKanji = (settings: SearchSettings, kanjiPool: DataPool) => {
  const allKanji = Object.keys(kanjiPool.main);

  // Filters
  const jlptFilters = new Set(settings.filterSettings.jlpt);
  const minStrokes = settings.filterSettings.strokeRange.min;
  const maxStrokes = settings.filterSettings.strokeRange.max;

  // Sorting
  const primarySort = settings.sortSettings.primary;

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
        const rankA = JLPTRank[infoA.jlpt];
        const rankB = JLPTRank[infoB.jlpt];
        if (rankA < rankB) return -1;
        if (rankA > rankB) return 1;
      } else if (primarySort === K_JOUYOU_KEY) {
        const jouyouA = exInfoA.jouyouGrade;
        const jouyouB = exInfoB.jouyouGrade;
        if (jouyouA < jouyouB) return -1;
        if (jouyouA > jouyouB) return 1;
      } else if (primarySort === K_STROKES) {
        const strokesA = exInfoA.strokes;
        const strokesB = exInfoB.strokes;
        if (strokesA === -1) return 1;
        if (strokesB === -1) return -1;
        if (strokesA < strokesB) return -1;
        if (strokesA > strokesB) return 1;
      } else if (primarySort === K_WK_LVL) {
        const levelA = exInfoA.wk;
        const levelB = exInfoB.wk;
        if (levelA < levelB) return -1;
        if (levelA > levelB) return 1;
      }
      return 0;
    });

  return kanjiList;
};
