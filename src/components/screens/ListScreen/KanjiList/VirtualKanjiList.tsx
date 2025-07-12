import { WindowVirtualizer } from "virtua";
import React, { useState } from "react";
import { HoverKanji } from "@/components/sections/KanjiHoverItem";
import { useVirtualListDims } from "./useVirtualDims";

const KanjiListRaw = ({
  kanjiKeys = [],
  size,
}: {
  kanjiKeys?: string[];
  size: "compact" | "expanded";
}) => {
  const [hoveredKanji, setHoveredKanji] = useState<string | null>(null);
  const { cols, rows } = useVirtualListDims(kanjiKeys.length, size);

  return (
    <>
      <WindowVirtualizer>
        {Array.from({ length: rows }).map((_, rowIndex) => {
          const isNotLast = rowIndex < rows - 1;
          const hasCompleteRows = isNotLast || kanjiKeys.length % cols === 0;
          const items = hasCompleteRows ? cols : kanjiKeys.length % cols;
          return (
            <div
              key={`row-${rowIndex}-${items}`}
              className={`flex items-center justify-center w-full gap-2 sm:gap-3 px-2 sm:px-3 ${
                isNotLast ? "pb-2" : "pb-16"
              }`}
            >
              {new Array(items).fill(null).map((_, colIndex: number) => {
                const index = cols * rowIndex + colIndex;
                const key = kanjiKeys[index];
                return (
                  <HoverKanji
                    key={key}
                    trigger={key}
                    isOpen={hoveredKanji === key}
                    setOpen={setHoveredKanji}
                  />
                );
              })}
            </div>
          );
        })}
      </WindowVirtualizer>
    </>
  );
};

export const VirtualKanjiList = React.memo(KanjiListRaw);
