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
    // TODO:
    sendResponse(Object.keys(KANJI_INFO_MAIN_CACHE));
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
