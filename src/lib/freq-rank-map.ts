import { KanjiExtendedInfo } from "./kanji-worker-types";
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

export const getFrequency = (freq: FrequencyType, info: KanjiExtendedInfo) => {
  if (info.frequency == null || freqMap[freq] == null) {
    return undefined;
  }
  return info.frequency[freqMap[freq]];
};
