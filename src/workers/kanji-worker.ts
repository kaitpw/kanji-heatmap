import KANJI_KEYS from "@/db/generated_kanji_list.json";

// fetch json from public folder

// worker.js
onmessage = function (event) {
  console.log("Received message from the main thread:", event.data);
  postMessage({ id: event?.data?.id, response: KANJI_KEYS });
};
