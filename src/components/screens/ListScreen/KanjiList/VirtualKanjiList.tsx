import React, { useCallback, useState } from "react";
import { useSearchParams } from "wouter";
import { HoverKanji } from "../HoverItem";
import VirtualList from "react-tiny-virtual-list";
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
  const [searchParams, setSearchParams] = useSearchParams();

  const setOpenedKanji = useCallback(
    (kanji: string | null) => {
      setSearchParams(kanji == null ? {} : { openedKanji: kanji });
    },
    [setSearchParams]
  );
  const openedKanji = searchParams.get("openedKanji");

  const onDrawerClose = useCallback(() => {
    setSearchParams({});
    setHoveredKanji(null);
  }, [setSearchParams]);

  const { cols, rows, itemSize, listHeight } = useVirtualListDims(
    kanjiKeys.length,
    size
  );

  return (
    <>
      <VirtualList
        style={{ overflowX: "hidden" }}
        width="100%"
        height={listHeight}
        itemCount={rows}
        itemSize={itemSize}
        renderItem={({ index: rowIndex, style }) => {
          const items = rowIndex < rows - 1 ? cols : kanjiKeys.length % cols;

          return (
            <div
              key={rowIndex}
              style={style}
              className={"flex items-center justify-center w-full"}
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
        }}
      />
      <KanjiDrawer
        isOpen={openedKanji !== null}
        onClose={onDrawerClose}
        kanji={openedKanji ?? ""}
      />
    </>
  );
};

export const VirtualKanjiList = React.memo(KanjiListRaw);
