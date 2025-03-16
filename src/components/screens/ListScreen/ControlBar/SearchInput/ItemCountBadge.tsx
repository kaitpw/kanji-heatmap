import { useKanjiSearchResult } from "@/kanji-worker/kanji-worker-hooks";

export const ItemCountBadge = () => {
  const result = useKanjiSearchResult();
  if (result.data?.length == null || result.data.length === 0) {
    return <></>;
  }
  return (
    <div className="px-2 rounded-lg bg-opacity-75 bg-white dark:bg-black border absolute top-[39px] text-xs font-extrabold">
      {result.data.length} items match your search filters
    </div>
  );
};
