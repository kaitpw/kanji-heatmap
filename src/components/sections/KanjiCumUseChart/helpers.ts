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
  rtk5100: "#ff9066",
  aozora: "#7eccb1",
  netflix: "#e50914",
  news: "#8c52ff",
  subtitles: "#edae4c",
  twitter: "#1da1f2",
  wikipedia: "#636363",
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
