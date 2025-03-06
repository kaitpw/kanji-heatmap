import { useKanjiSearchResult } from "@/kanji-worker/kanji-worker-provider";
import { KANJI_COUNT } from "@/lib/constants";

export const ChangedIndicator = () => {
  const data = useKanjiSearchResult();

  if (data.data == null || data.data.length >= KANJI_COUNT) {
    return <></>;
  }

  return (
    <div className="absolute -top-1.5 -right-2 h-[18px] w-[18px] border-4 border-white dark:border-black bg-red-500 rounded-full font-bold flex items-center justify-center" />
  );
};
