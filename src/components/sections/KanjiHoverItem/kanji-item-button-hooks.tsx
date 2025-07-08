import { useGetKanjiInfoFn } from "@/kanji-worker/kanji-worker-hooks";
import { useDeferredItemSettings } from "@/providers/item-settings-hooks";

export const cn =
  "animate-fade-in-fast h-95 w-full p-0.5 sm:p-1 rounded-lg text-2xl border bg-opacity-100 z-0 hover:border-[#2effff] transition-all transition-discrete duration-500";
export const loadingCn = `${cn} animate-pulse duration-1000 h-full !bg-lime-400 !border border-white dark:border-black`;
export const ellipsisCn =
  "!text-ellipsis !text-nowrap !w-24 !overflow-hidden !whitespace-nowrap";

export const useItemType = () => {
  const itemSettings = useDeferredItemSettings();
  return itemSettings.cardType;
};

export const useItemBtnCn = (kanji: string) => {
  const getInfo = useGetKanjiInfoFn();
  const itemType = useItemType();

  const kanjiInfo = getInfo?.(kanji);

  if (
    kanjiInfo == null ||
    kanjiInfo.frequency == null ||
    kanjiInfo.jlpt == null
  ) {
    return loadingCn;
  }

  const textColor = "dark:text-white text-gray-700";

  const border =
    "border-black border-opacity-10 dark:border-white dark:border-opacity-10";
  const bgColor = "bg-background";

  const btnCnRaw = `${cn} ${border} ${bgColor} ${textColor}`;
  const btnCn =
    itemType === "compact"
      ? `${btnCnRaw} kanji-font`
      : `${btnCnRaw} flex flex-col justify-center items-center`;

  return btnCn;
};
