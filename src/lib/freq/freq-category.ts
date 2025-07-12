import { cnSquare } from "../generic-cn";

export const freqCategoryCount = 10;
export type FreqCategory = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
// TODO: Generate this as a function of freqCategoryCount
// generating these tw classes on the fly actually doesn't work idk why
export const freqCategoryCn: Record<FreqCategory, string> = {
  0: "bg-gray-700 dark:bg-gray-700",
  1: "bg-pink-900 dark:bg-pink-900",
  2: "bg-pink-800 dark:bg-pink-800",
  3: "bg-pink-700 dark:bg-pink-700",
  4: "bg-pink-600 dark:bg-pink-600",
  5: "bg-pink-500 dark:bg-pink-500",
  6: "bg-pink-400 dark:bg-pink-400",
  7: "bg-pink-300 dark:bg-pink-300",
  8: "bg-pink-200 dark:bg-pink-200",
  9: "bg-pink-100 dark:bg-pink-100",
};

export const freqRankMaxMin: Record<
  FreqCategory,
  { min: number; max: number }
> = {
  0: { min: 2200, max: Number.POSITIVE_INFINITY },
  1: { min: 2000, max: 2200 },
  2: { min: 1800, max: 2000 },
  3: { min: 1600, max: 1800 },
  4: { min: 1400, max: 1600 },
  5: { min: 1200, max: 1400 },
  6: { min: 1000, max: 1200 },
  7: { min: 800, max: 1000 },
  8: { min: 600, max: 800 },
  9: { min: 400, max: 600 },
};

export const getFreqCategory = (freqRank?: number | null): FreqCategory => {
  if (freqRank == null || freqRank < 1 || freqRank > 2400) {
    return 0;
  }

  for (let i = 1; i <= 9; i++) {
    const category = i as FreqCategory;
    if (
      freqRankMaxMin[category].min < freqRank &&
      freqRank <= freqRankMaxMin[category].max
    ) {
      return category;
    }
  }

  return 9; // Default to highest frequency category
};

export const getFreqCnByRank = (rank: number | null) => {
  const freqRankCategory = rank == null || rank < 1 ? 0 : getFreqCategory(rank);

  const bgColor = freqCategoryCn[freqRankCategory];
  return `${cnSquare} ${bgColor}`;
};
