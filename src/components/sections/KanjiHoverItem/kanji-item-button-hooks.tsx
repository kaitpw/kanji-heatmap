import { JLPTListItems } from "@/lib/jlpt";
import { freqCategoryCn, getFreqCategory } from "@/lib/freq/freq-category";
import { freqMap } from "@/lib/options/options-label-maps";
import { useGetKanjiInfoFn } from "@/kanji-worker/kanji-worker-hooks";
import { useDeferredItemSettings } from "@/providers/item-settings-hooks";
import { useBgSrc } from "@/components/dependent/routing/routing-hooks";

export const cn =
  "animate-fade-in-fast h-95 w-full p-0.5 sm:p-1 rounded-lg text-2xl border bg-opacity-100 z-0 hover:border-[#2effff] transition-all transition-discrete duration-500";
export const loadingCn =
  `${cn} animate-pulse duration-1000 h-full !bg-lime-400 !border border-white dark:border-black`;
export const ellipsisCn =
  "!text-ellipsis !text-nowrap !w-24 !overflow-hidden !whitespace-nowrap";

const useItemDontIncludeJLPT = () => {
  const itemSettings = useDeferredItemSettings();
  return itemSettings.borderColorAttached === false;
};

export const useItemType = () => {
  const itemSettings = useDeferredItemSettings();
  return itemSettings.cardType;
};

export const useItemBtnCn = (kanji: string) => {
  const getInfo = useGetKanjiInfoFn();
  const bgSrc = useBgSrc();
  const itemType = useItemType();
  const dontIncludeJLPT = useItemDontIncludeJLPT();

  const kanjiInfo = getInfo?.(kanji);

  if (
    kanjiInfo == null ||
    kanjiInfo.frequency == null ||
    kanjiInfo.jlpt == null
  ) {
    return loadingCn;
  }
  const freqType = bgSrc === null || bgSrc === "none"
    ? "none"
    : (freqMap[bgSrc] ?? "none");
  const dontIncludeFreq = freqType === "none";

  const freqData = kanjiInfo.frequency;
  const freqRank = freqType !== "none" ? freqData[freqType] : undefined;
  const freqRankCategory = getFreqCategory(freqRank);

  const textColor = freqRankCategory > 3 || dontIncludeFreq
    ? "text-white"
    : "dark:text-white text-gray-700";
  const { jlpt } = kanjiInfo;

  const border = dontIncludeFreq === false || freqRankCategory === 0
    ? "border-black border-opacity-10 dark:border-white dark:border-opacity-10"
    : `border-theme-color-with-opacity-${20 * freqRankCategory}`;

  const bgColor = dontIncludeFreq
    ? "background-theme-color-with-opacity-100"
    : freqRankCategory === 0
    ? "bg-background"
    : freqCategoryCn[freqRankCategory];

  const btnCnRaw = `${cn} ${border} ${bgColor} ${textColor}`;
  const btnCn = itemType === "compact"
    ? `${btnCnRaw} kanji-font`
    : `${btnCnRaw} flex flex-col justify-center items-center`;

  return btnCn;
};
