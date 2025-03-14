import {
  ExtendedKanjiInfoResponseType,
  KanjiExtendedInfo,
  KanjiMainInfo,
  MainKanjiInfoResponseType,
  OnMessageRequestType,
  PostMessageResponseType,
  SegmentedVocabInfo,
  SegmentedVocabResponseType,
} from "@/lib/kanji-worker-types";
import {
  fetchExtendedKanjiInfo,
  fetchMainManjiInfo,
  fetchPartKeywordInfo,
  fetchPhoneticInfo,
  fetchSegmentedVocab,
  transformToExtendedKanjiInfo,
  transformToMainKanjiInfo,
  transformToSegmentedVocab,
} from "./helpers";
import { filterKanji, searchKanji } from "./kanji-search";
import { SearchSettings } from "@/lib/settings";

const KANJI_INFO_MAIN_CACHE: Record<string, KanjiMainInfo> = {};
const KANJI_INFO_EXTENDED_CACHE: Record<string, KanjiExtendedInfo> = {};
const KANJI_SEGMENTED_VOCAB_CACHE: Record<string, SegmentedVocabInfo> = {};

let KANJI_PHONETIC_MAP_CACHE: Record<string, string> = {};
let KANJI_PART_KEYWORD_MAP_CACHE: Record<string, string> = {};

let mainComplete = false;
let extendedInfoComplete = false;
let phoneticComplete = false;
let partKeywordComplete = false;
let segmentedVocabComplete = false;

const loadMainKanjiInfo = (items: MainKanjiInfoResponseType) => {
  if (mainComplete) {
    return;
  }
  Object.keys(items).forEach((k) => {
    KANJI_INFO_MAIN_CACHE[k] = transformToMainKanjiInfo(items[k]);
  });
  mainComplete = true;
};

const loadExtendedKanjiInfo = (items: ExtendedKanjiInfoResponseType) => {
  if (extendedInfoComplete) {
    return;
  }
  Object.keys(items).forEach((k) => {
    KANJI_INFO_EXTENDED_CACHE[k] = transformToExtendedKanjiInfo(items[k]);
  });
  extendedInfoComplete = true;
};

const loadSegmentedVocabInfo = (map: SegmentedVocabResponseType) => {
  if (segmentedVocabComplete) {
    return;
  }

  Object.keys(map).forEach((word) => {
    KANJI_SEGMENTED_VOCAB_CACHE[word] = transformToSegmentedVocab(map[word]);
  });

  segmentedVocabComplete = true;
};

const retrieveVocabInfo = (word?: string) => {
  if (word == null || KANJI_SEGMENTED_VOCAB_CACHE[word] == null) {
    return null;
  }

  return {
    word,
    meaning: KANJI_SEGMENTED_VOCAB_CACHE[word]?.meaning,
    wordPartDetails: KANJI_SEGMENTED_VOCAB_CACHE[word]?.parts,
  };
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
      return;
    }
    fetchExtendedKanjiInfo()
      .then(loadExtendedKanjiInfo)
      .then(sendResponse)
      .catch(sendError);

    return;
  }

  if (eventType === "initalize-segmented-vocab-map") {
    if (segmentedVocabComplete) {
      sendResponse();
      return;
    }
    fetchSegmentedVocab()
      .then(loadSegmentedVocabInfo)
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
      return;
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
      return;
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

  const settings = payload as SearchSettings;
  const kanjiPool = {
    main: KANJI_INFO_MAIN_CACHE,
    extended: KANJI_INFO_EXTENDED_CACHE,
  };

  if (eventType === "search") {
    const kanjiList: string[] = searchKanji(settings, kanjiPool);
    sendResponse(kanjiList);
    return;
  }

  if (eventType === "search-result-count") {
    const allKanji = Object.keys(kanjiPool.main);
    const filterCount = filterKanji(allKanji, settings, kanjiPool).length;
    sendResponse(filterCount);
    return;
  }

  if (eventType === "kanji-extended") {
    const extendedInfo = KANJI_INFO_EXTENDED_CACHE[payload as string];

    if (extendedInfo == null) {
      sendError({ message: "No Kanji Info On Extended Cache" });
      return;
    }

    sendResponse({
      ...extendedInfo,
      vocabInfo: {
        first: retrieveVocabInfo(extendedInfo.mainVocab?.[0]),
        second: retrieveVocabInfo(extendedInfo.mainVocab?.[1]),
      },
    });
    return;
  }

  sendError({ message: "Not implemented" });
};
