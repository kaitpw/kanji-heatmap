import { KanjiMainInfo } from "./kanji-worker-types";
import { freqMap } from "./label-maps";
import { FreqMapInverse, FrequencyType } from "./sort-freq-types";

export const inverseFreqMap = Object.keys(freqMap).reduce((acc, item) => {
  const infoFreq = item as FrequencyType;

  if (item == null) {
    return acc;
  }

  const type = freqMap[infoFreq];

  if (type == null) {
    return acc;
  }

  acc[type] = infoFreq;

  return acc;
}, {} as FreqMapInverse);

export const getFrequency = (freq: FrequencyType, info: KanjiMainInfo) => {
  return freqMap[freq] &&
    info.frequency &&
    (info.frequency[freqMap[freq]] ?? 0) > 0
    ? info.frequency[freqMap[freq]]
    : undefined;
};
