import { JLPTRank, JLTPTtypes, SearchSettings } from "@/lib/constants";
import {
  K_JLPT,
  K_JOUYOU_KEY,
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

      let compareVal = 0;
      if (primarySort === K_JLPT) {
        compareVal = jlptSort(infoA.jlpt, infoB.jlpt);
      } else if (primarySort === K_JOUYOU_KEY) {
        compareVal = simpleSort(exInfoA.jouyouGrade, exInfoB.jouyouGrade);
      } else if (primarySort === K_STROKES) {
        compareVal = strokeSort(exInfoA.strokes, exInfoB.strokes);
      } else if (primarySort === K_WK_LVL) {
        compareVal = simpleSort(exInfoA.wk, exInfoB.wk);
      } else if (primarySort === K_RANK_NETFLIX) {
        compareVal = freqSort(
          exInfoA.frequency?.netflix,
          exInfoB.frequency?.netflix
        );
      } else if (primarySort === K_RANK_DRAMA_SUBTITLES) {
        compareVal = freqSort(
          exInfoA.frequency?.dramaSubs,
          exInfoB.frequency?.dramaSubs
        );
      } else if (primarySort === K_RANK_NOVELS_5100) {
        compareVal = freqSort(
          exInfoA.frequency?.novels5100,
          exInfoB.frequency?.novels5100
        );
      } else if (primarySort === K_RANK_TWITTER) {
        compareVal = freqSort(
          exInfoA.frequency?.twitter,
          exInfoB.frequency?.twitter
        );
      } else if (primarySort === K_RANK_WIKIPEDIA_DOC) {
        compareVal = freqSort(
          exInfoA.frequency?.wikiDoc,
          exInfoB.frequency?.wikiDoc
        );
      } else if (primarySort === K_RANK_WIKIPEDIA_CHAR) {
        compareVal = freqSort(
          exInfoA.frequency?.wikiChar,
          exInfoB.frequency?.wikiChar
        );
      } else if (primarySort === K_RANK_ONLINE_NEWS_DOC) {
        compareVal = freqSort(
          exInfoA.frequency?.onlineNewsDoc,
          exInfoB.frequency?.onlineNewsDoc
        );
      } else if (primarySort === K_RANK_ONLINE_NEWS_CHAR) {
        compareVal = freqSort(
          exInfoA.frequency?.onlineNewsChar,
          exInfoB.frequency?.onlineNewsChar
        );
      } else if (primarySort === K_RANK_AOZORA_DOC) {
        compareVal = freqSort(
          exInfoA.frequency?.aozoraDoc,
          exInfoB.frequency?.aozoraDoc
        );
      } else if (primarySort === K_RANK_AOZORA_CHAR) {
        compareVal = freqSort(
          exInfoA.frequency?.aozoraChar,
          exInfoB.frequency?.aozoraChar
        );
      }
      if (compareVal != 0) return compareVal;

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
