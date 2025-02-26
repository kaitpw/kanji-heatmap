import { useMemo, useState } from "react";
import { useSearchParams } from "wouter";
import React from "react";
import HoverMe from "./sections/HoverMe";
import { useWindowSize } from "@react-hook/window-size"; // Debounced values
import VirtualList from "react-tiny-virtual-list";
import { HEADER_HEIGHT, TILE_SIZE } from "./constants";
import { KanjiDrawer } from "./sections/KanjiDrawer";
import { useKanjiSearchResult } from "@/providers/kanji-worker-provider";
import LoadingKanjis from "./LoadingKanjis";

const KanjiListRaw = ({ kanjiKeys = [] }: { kanjiKeys?: string[] }) => {
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

const KanjiListWithSearch = () => {
  const result = useKanjiSearchResult();
  //   const ready = useIsKanjiWorkerReady();

  if (result.error != null) {
    return (
      <div className="p-20">
        Something went wrong in <code>{"<KanjiListWithSearch />"}</code>
      </div>
    );
  }

  if (result.data == null) {
    return <LoadingKanjis />;
  }

  if (result.data.length === 0) {
    return <div className="p-20">No filters match your search</div>;
  }
  return <KanjiList kanjiKeys={result.data} />;
};

export default KanjiListWithSearch;
