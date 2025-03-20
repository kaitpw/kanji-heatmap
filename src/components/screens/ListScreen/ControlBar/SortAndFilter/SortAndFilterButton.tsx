import { forwardRef } from "react";
import { KANJI_COUNT } from "@/lib/constants";
import { useKanjiSearchResult } from "@/kanji-worker/kanji-worker-hooks";
import { Settings2 } from "@/components/icons";
import { Button } from "@/components/ui/button";

const ChangedIndicator = () => {
  const data = useKanjiSearchResult();

  if (data.data == null || data.data.length >= KANJI_COUNT) {
    return null;
  }

  return (
    <div className="absolute -top-1.5 -right-2 h-[18px] w-[18px] border-4 border-white dark:border-black bg-red-500 rounded-full font-bold flex items-center justify-center" />
  );
};

export const SortAndFilterButton = forwardRef<
  HTMLButtonElement,
  { onClick: () => void }
>(({ onClick }, ref) => {
  return (
    <Button
      ref={ref}
      variant="outline"
      size="icon"
      className="h-9 w-9 relative"
      onClick={onClick}
    >
      <Settings2 />
      <span className="sr-only">Sort and Filter Settings</span>
      <ChangedIndicator />
    </Button>
  );
});
