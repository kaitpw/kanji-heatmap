import {
  ExtendedKanjiInfoResponseType,
  KanjiExtendedInfo,
  KanjiMainInfo,
  MainKanjiInfoResponseType,
  OnMessageRequestType,
  PostMessageResponseType,
} from "@/lib/kanji-worker-constants";
import {
  fetchExtendedKanjiInfo,
  fetchMainManjiInfo,
  fetchPartKeywordInfo,
  fetchPhoneticInfo,
  transformToExtendedKanjiInfo,
  transformToMainKanjiInfo,
} from "./helpers";
import { JLPTRank, SearchSettings } from "@/lib/constants";
import {
  K_JLPT,
  K_JOUYOU_KEY,
  K_STROKES,
  K_WK_LVL,
} from "@/lib/frequency-rank";

const KANJI_INFO_MAIN_CACHE: Record<string, KanjiMainInfo> = {};
const KANJI_INFO_EXTENDED_CACHE: Record<string, KanjiExtendedInfo> = {};
let KANJI_PHONETIC_MAP_CACHE: Record<string, string> = {};
let KANJI_PART_KEYWORD_MAP_CACHE: Record<string, string> = {};
// FUTURE: KANJI_SECONDARY_VOCAB_CACHE
// FUTURE: KANJI_NOTES_CACHE

// ********************
// DERIVED CACHE
// *******************
// TODO: SEARCH_CACHE: Record<searchKey, { result: [] }>
// TODO: SEARCH_TIME_CACHE: { timestamp, searchKey }[]

let mainComplete = false;
let extendedInfoComplete = false;
let phoneticComplete = false;
let partKeywordComplete = false;

export const loadMainKanjiInfo = (items: MainKanjiInfoResponseType) => {
  if (mainComplete) {
    return;
  }
  Object.keys(items).forEach((k) => {
    KANJI_INFO_MAIN_CACHE[k] = transformToMainKanjiInfo(items[k]);
  });
  mainComplete = true;
};

export const loadExtendedKanjiInfo = (items: ExtendedKanjiInfoResponseType) => {
  if (extendedInfoComplete) {
    return;
  }
  Object.keys(items).forEach((k) => {
    KANJI_INFO_EXTENDED_CACHE[k] = transformToExtendedKanjiInfo(items[k]);
  });
  extendedInfoComplete = true;
};

self.onmessage = function (event: { data: OnMessageRequestType }) {
  const eventType = event.data.data.type;
  const payload = event.data.data.payload;
  const id = event.data.id;

  const sendResponse = (data?: unknown) => {
    const response: PostMessageResponseType = {
      id,
      response: {
        requestType: eventType,
        status: "COMPLETED",
        data,
      },
    };
    self.postMessage(response);
  };

  const sendError = (error: { message: string }) => {
    const response: PostMessageResponseType = {
      id,
      response: {
        requestType: eventType,
        status: "ERRORED",
        error: {
          message: `Message:${error.message}, request:${eventType} failed`,
        },
      },
    };
    console.error(response, error);
    self.postMessage(response);
  };

  if (eventType === "initialize-extended-kanji-map") {
    if (extendedInfoComplete) {
      sendResponse();
    }

    fetchExtendedKanjiInfo()
      .then(loadExtendedKanjiInfo)
      .then(sendResponse)
      .catch(sendError);

    return;
  }

  if (eventType === "kanji-main-map") {
    if (mainComplete) {
      sendResponse();
      return;
    }

    fetchMainManjiInfo()
      .then(loadMainKanjiInfo)
      .then(() => sendResponse(KANJI_INFO_MAIN_CACHE))
      .catch(sendError);

    return;
  }

  if (eventType === "part-keyword-map") {
    if (partKeywordComplete) {
      sendResponse();
    }

    fetchPartKeywordInfo()
      .then((r) => {
        if (partKeywordComplete) {
          return;
        }
        KANJI_PART_KEYWORD_MAP_CACHE = r;
        partKeywordComplete = true;
      })
      .then(() => sendResponse(KANJI_PART_KEYWORD_MAP_CACHE))
      .catch(sendError);

    return;
  }

  if (eventType === "phonetic-map") {
    if (phoneticComplete) {
      sendResponse();
    }

    fetchPhoneticInfo()
      .then((r) => {
        if (phoneticComplete) {
          return;
        }
        KANJI_PHONETIC_MAP_CACHE = r;
        phoneticComplete = true;
      })
      .then(() => sendResponse(KANJI_PHONETIC_MAP_CACHE))
      .catch(sendError);

    return;
  }

  if (eventType == null || payload == null) {
    sendError({
      message:
        "Please provide both an eventType and payload. One of them is missing",
    });
    return;
  }

  if (eventType === "search") {
    const settings = payload as SearchSettings;

    const allKanji = Object.keys(KANJI_INFO_MAIN_CACHE);

    // Filters
    const jlptFilters = new Set(settings.filterSettings.jlpt);
    const minStrokes = settings.filterSettings.strokeRange.min;
    const maxStrokes = settings.filterSettings.strokeRange.max;

    // Sorting
    const primarySort = settings.sortSettings.primary;

    const kanjiList = allKanji
      .filter((kanji) => {
        const info = KANJI_INFO_MAIN_CACHE[kanji];
        if ([0, 6].includes(jlptFilters.size)) return true;
        return jlptFilters.has(info.jlpt);
      })
      .filter((kanji) => {
        const exInfo = KANJI_INFO_EXTENDED_CACHE[kanji];
        return maxStrokes >= exInfo.strokes && exInfo.strokes >= minStrokes;
      })
      .sort((a, b) => {
        const infoA = KANJI_INFO_MAIN_CACHE[a];
        const infoB = KANJI_INFO_MAIN_CACHE[b];
        const exInfoA = KANJI_INFO_EXTENDED_CACHE[a];
        const exInfoB = KANJI_INFO_EXTENDED_CACHE[b];
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

    sendResponse(kanjiList);
    return;
  }

  if (eventType === "search-result-count") {
    // TODO:
    sendResponse(Object.keys(KANJI_INFO_MAIN_CACHE).length);
    return;
  }

  if (eventType === "kanji-extended") {
    sendResponse(KANJI_INFO_EXTENDED_CACHE[payload as string]);
    return;
  }

  sendError({ message: "Not implemented" });
};
