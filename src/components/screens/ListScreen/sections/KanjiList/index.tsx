import { useMemo, useState } from "react";
import { useSearchParams } from "wouter";
import React from "react";
import HoverMe, { DrawerDemo } from "./sections/HoverMe";
import { useWindowSize } from "@react-hook/window-size"; // Debounced values
import VirtualList from "react-tiny-virtual-list";
import { HEADER_HEIGHT, TILE_SIZE } from "./constants";
import kanjiKeys from "./kanji-keys";

const KanjiListRaw = () => {
  const [hoveredKanji, setHoveredKanji] = useState<string | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();

  const setOpenedKanji = useMemo(
    () => (kanji: string | null) => {
      setSearchParams(kanji == null ? {} : { openedKanji: kanji });
    },
    [setSearchParams]
  );

  const [width, height] = useWindowSize();

  const openedKanji = searchParams.get("openedKanji");
  const cols = Math.floor(width / TILE_SIZE.sm.width);
  const rows = Math.ceil(kanjiKeys.length / cols);

  return (
    <>
      <VirtualList
        width="100%"
        height={height - HEADER_HEIGHT}
        itemCount={rows}
        itemSize={TILE_SIZE.sm.height}
        renderItem={({ index: rowIndex, style }) => {
          return (
            <div
              key={rowIndex}
              style={style}
              className="flex items-center justify-center w-full"
            >
              {[...Array(cols).keys()].map((colIndex: number) => {
                const index = cols * rowIndex + colIndex;
                const key = kanjiKeys[index];

                if (key == null) {
                  return <React.Fragment key={colIndex} />;
                }

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
      <DrawerDemo
        isOpen={openedKanji !== null}
        onClose={() => {
          setSearchParams({});
        }}
        kanji={openedKanji}
      />
    </>
  );
};

const KanjiList = React.memo(KanjiListRaw);

export default KanjiList;
