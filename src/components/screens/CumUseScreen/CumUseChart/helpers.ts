import { KanjiInfoFrequency } from "@/lib/kanji-worker-types";
import { frequencyRankLabels } from "@/lib/label-maps";

export type ChartData = Record<string, [number, number][]>;

export const ALL_X_POINTS = new Array(36).fill(null).map((_, i) => {
  return i * 50;
});

export const freqKeyMap: Record<string, keyof KanjiInfoFrequency> = {
  rtk5100: "novels5100",
  aozora: "aozoraChar",
  netflix: "netflix",
  news: "onlineNewsChar",
  subtitles: "dramaSubs",
  twitter: "twitter",
  wikipedia: "wikiChar",
};

export const colorMap: Record<string, string> = {
  rtk5100: "oklch(0.795 0.184 86.047)",
  aozora: "oklch(0.768 0.233 130.85)",
  netflix: "oklch(0.577 0.245 27.325)",
  news: "oklch(0.585 0.233 277.117)",
  subtitles: "oklch(0.705 0.213 47.604)",
  twitter: "oklch(0.715 0.143 215.221)",
  wikipedia: "oklch(0.553 0.013 58.071)",
};

/**
    const chartConfig = {
      [key1]: { label: string,  color: string },
      [key2]: { label: string,  color: string },
    } satisfies ChartConfig;

  **/
export const buildChartConfig = (data: ChartData) => {
  const dataKeys = Object.keys(data);

  const chartConfig = dataKeys.reduce(
    (acc, key) => {
      acc[key] = {
        label: frequencyRankLabels[freqKeyMap[key]],
        color: colorMap[key],
      };
      return acc;
    },
    {} as Record<string, { label: string; color: string }>
  );

  return chartConfig;
};
