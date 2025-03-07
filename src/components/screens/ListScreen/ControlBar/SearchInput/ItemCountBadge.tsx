import { useKanjiSearchResult } from "@/kanji-worker/kanji-worker-provider";

export const ItemCountBadge = () => {
  const result = useKanjiSearchResult();
  if (result.data == null || result.data.length == null) {
    return <></>;
  }
  return (
    <div className="px-2 rounded-lg bg-opacity-75 bg-white dark:bg-black border absolute top-[39px] text-xs font-extrabold">
      {result.data.length} items match your search filters
    </div>
  );
};
