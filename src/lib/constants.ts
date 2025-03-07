export const ITEM_CARD_BG_CN = "bg-[#fb02a8]";

export const KANJI_COUNT = 2426; // Exclude NOMA / Repeater kanji
export const MAX_STROKE_COUNT = 35;
export const MAX_FREQ_RANK = 10000;
export const TILE_SIZE = {
  sm: {
    width: 50,
    height: 55,
  },
  lg: {
    width: 135,
    height: 118,
  },
};

export const HEADER_HEIGHT = 100;

export const URL_PARAMS = {
  openKanji: "open-kanji",
};

export const externalLinks: { name: string; url: (x: string) => string }[] = [
  {
    name: "Wanikani",
    url: (kanji: string) => `https://www.wanikani.com/kanji/${kanji}`,
  },
  {
    name: "Kanshudo",
    url: (kanji: string) => `https://www.kanshudo.com/kanji/${kanji}`,
  },
  {
    name: "The Kanji Map",
    url: (kanji: string) => `https://thekanjimap.com/${kanji}`,
  },
  {
    name: "Kanji Alive",
    url: (kanji: string) => `https://app.kanjialive.com/${kanji}`,
  },
  {
    name: "Hochanh",
    url: (kanji: string) => `https://hochanh.github.io/rtk/${kanji}/index.html`,
  },
  { name: "JPDB", url: (kanji: string) => `https://jpdb.io/kanji/${kanji}#a` },
  {
    name: "Jisho",
    url: (kanji: string) => `https://jisho.org/search/${kanji}%20%23kanji`,
  },
  {
    name: "Kai Kanji Api",
    url: (kanji: string) => `https://kai.kanjiapi.dev/#!/${kanji}`,
  },
  {
    name: "Jotoba",
    url: (kanji: string) => `https://jotoba.de/search/1/${kanji}?l=en-US`,
  },
  {
    name: "Kanji Garden",
    url: (kanji: string) => `https://kanji.garden/kanji?kanji=${kanji}`,
  },
  {
    name: "Wiktionary",
    url: (kanji: string) => `https://en.wiktionary.org/wiki/${kanji}`,
  },
  {
    name: "Unicode",
    url: (kanji: string) =>
      `http://www.unicode.org/cgi-bin/GetUnihanData.pl?codepoint=${kanji}&useutf8=true`,
  },
  {
    name: "Hanziyuan",
    url: (kanji: string) => `https://hanziyuan.net/#${kanji}`,
  },
];
