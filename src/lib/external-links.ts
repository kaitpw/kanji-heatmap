export const externalLinks: { name: string; url: (x: string) => string }[] = [
  {
    name: "OG Kanji Heatmap",
    url: (kanji: string) => `https://kanjiheatmap.com/?open=${kanji}`,
  },
  {
    name: "Immersion Kit",
    url: (word: string) =>
      `https://www.immersionkit.com/dictionary?keyword=${word}`,
  },
  {
    name: "Sentence Search",
    url: (word: string) => `https://sentencesearch.neocities.org/#${word}`,
  },
];

export const outLinks = {
  githubIssue: "https://github.com/PikaPikaGems/kanji-heatmap/issues/63",
  githubContentIssue:
    "https://github.com/PikaPikaGems/kanji-heatmap-data/issues/5",
  koFi: "https://ko-fi.com/minimithi",
  discord: "https://discord.gg/Ash8ZrGb4s",
};

export const otherOutLinks = {
  webSpeechApi:
    "https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesis",
  jmdictFurigana: "https://github.com/Doublevil/JmdictFurigana",
};
