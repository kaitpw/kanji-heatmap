import { useMemo, useState } from "react";
import { useSearchParams } from "wouter";
import React from "react";
import HoverMe from "./sections/HoverMe";
import { useWindowSize } from "@react-hook/window-size"; // Debounced values
import VirtualList from "react-tiny-virtual-list";
import { HEADER_HEIGHT, TILE_SIZE } from "./constants";
import kanjiKeys from "@/db/generated_kanji_list.json";
import { KanjiDrawer } from "./sections/KanjiDrawer";

const KanjiListRaw = () => {
  const [hoveredKanji, setHoveredKanji] = useState<string | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();

  const setOpenedKanji = useMemo(
    () => (kanji: string | null) => {
      setSearchParams(kanji == null ? {} : { openedKanji: kanji });
    },
    [setSearchParams]
  );

  const [windowWidth, windowHeight] = useWindowSize();

  const openedKanji = searchParams.get("openedKanji");
  const cols = Math.floor(windowWidth / TILE_SIZE.sm.width);
  const rows = Math.ceil(kanjiKeys.length / cols);
  const listHeight = windowHeight - HEADER_HEIGHT;
  return (
    <>
      <VirtualList
        style={{ overflowX: "hidden" }}
        width="100%"
        height={listHeight}
        itemCount={rows}
        itemSize={TILE_SIZE.sm.height}
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
                  <HoverMe
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
        onClose={() => {
          setSearchParams({});
        }}
        kanji={openedKanji ?? ""}
      />
    </>
  );
};

const KanjiList = React.memo(KanjiListRaw);

export default KanjiList;
