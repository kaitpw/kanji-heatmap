import React, { useCallback, useState } from "react";
import { VList as VirtualList } from "virtua";
import { useKanjiUrlState } from "@/components/dependent/routing/routing-hooks";
import { HoverKanji } from "../../../sections/KanjiHoverItem";
import { useVirtualListDims } from "./useVirtualDims";
import { KanjiDrawer } from "../Drawer";

const KanjiListRaw = ({
  kanjiKeys = [],
  size,
}: {
  kanjiKeys?: string[];
  size: "compact" | "expanded";
}) => {
  const [hoveredKanji, setHoveredKanji] = useState<string | null>(null);

  const [openedKanji, setOpenedKanji] = useKanjiUrlState();

  const onDrawerClose = useCallback(() => {
    setOpenedKanji(null);
  }, [setOpenedKanji]);

  const { cols, rows, listHeight } = useVirtualListDims(kanjiKeys.length, size);

  return (
    <>
      <VirtualList
        style={{
          overflowX: "hidden",
          paddingBottom: "25px",
          width: "100%",
          overflowY: "auto",
          height: listHeight,
        }}
      >
        {Array.from({ length: rows }).map((_, rowIndex) => {
          const items =
            rowIndex < rows - 1 || kanjiKeys.length % cols === 0
              ? cols
              : kanjiKeys.length % cols;
          return (
            <div
              key={rowIndex}
              className={"flex items-center justify-center w-full pr-1 pb-1"}
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
                    openDrawer={setOpenedKanji}
                  />
                );
              })}
            </div>
          );
        })}
      </VirtualList>

      <KanjiDrawer
        isOpen={openedKanji !== null}
        onClose={onDrawerClose}
        kanji={openedKanji ?? ""}
      />
    </>
  );
};

export const VirtualKanjiList = React.memo(KanjiListRaw);
