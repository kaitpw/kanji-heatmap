import { useKanjiSearchResult } from "@/kanji-worker/kanji-worker-hooks";

interface ResultCounterProps {
  hasText: boolean;
}

export const ResultCounter = ({ hasText }: ResultCounterProps) => {
  const result = useKanjiSearchResult();

  if (result.data?.length == null || result.data.length === 0 || hasText) {
    return null;
  }

  return (
    <div className="absolute right-[100px] top-3 text-xs text-muted-foreground pointer-events-none">
      found {result.data.length}
    </div>
  );
};
