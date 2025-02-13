import kanjiJson from "@/db/kanji.json";

import { useMemo, useState } from "react";
import { useSearchParams } from "wouter";
import React from "react";
import HoverMe, { DrawerDemo } from "./sections/HoverMe";

const keys = Object.keys(kanjiJson);

const KanjiListRaw = () => {
  const [hoveredKanji, setHoveredKanji] = useState<string | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();

  const setOpenedKanji = useMemo(
    () => (kanji: string | null) => {
      setSearchParams(kanji == null ? {} : { openedKanji: kanji });
    },
    [setSearchParams]
  );

  const openedKanji = searchParams.get("openedKanji");

  return (
    <>
      <div className="flex flex-wrap mt-4 items-center justify-center z-0">
        {keys.map((key) => {
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
