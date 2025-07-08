import { MAX_STROKE_COUNT } from "@/lib/options/constants";
import { JLPTOptions } from "@/lib/jlpt";
import { FilterSettings, SearchSettings } from "@/lib/settings/settings";

export const hasNoFilters = (settings: SearchSettings) => {
  const { strokeRange, freq, jlpt } = settings.filterSettings;
  const fullRangeStrokes =
    strokeRange.min <= 1 && strokeRange.max >= MAX_STROKE_COUNT;
  const fullRangeFreq = freq.source === "none";
  const allJLPT = jlpt.length === 0 || jlpt.length === JLPTOptions.length;

  return fullRangeStrokes && fullRangeFreq && allJLPT;
};
export const shouldShowAllKanji = (settings: SearchSettings) => {
  const noText = settings.textSearch.text === "";
  return hasNoFilters(settings) && noText;
};

export const isEqualFilters = (
  a: FilterSettings,
  b: FilterSettings
): boolean => {
  if (a === null || b === null) return a === b;
  if (a === undefined || b === undefined) return a === b;

  if (a.strokeRange.min !== b.strokeRange.min) return false;
  if (a.strokeRange.max !== b.strokeRange.max) return false;

  if (a.jlpt.length !== b.jlpt.length) return false;
  for (let i = 0; i < a.jlpt.length; i++) {
    if (a.jlpt[i] !== b.jlpt[i]) return false;
  }

  if (a.freq.source !== b.freq.source) return false;
  if (a.freq.rankRange.min !== b.freq.rankRange.min) return false;
  if (a.freq.rankRange.max !== b.freq.rankRange.max) return false;

  return true;
};
