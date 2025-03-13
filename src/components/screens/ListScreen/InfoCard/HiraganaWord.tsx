import { Button } from "@/components/ui/button";
import { useState } from "react";
import { badgeCn, SpanBadge } from "@/components/ui/badge";
import * as wanakana from "wanakana";

const useHiraganaWordButton = (rawKana: string) => {
  const [showRomaji, setShowRomaji] = useState(false);
  const fontCss = !showRomaji ? "kanji-font" : "romaji-font";
  const kana = showRomaji
    ? wanakana.toRomaji(rawKana.split(",")[0])
    : rawKana.split(",")[0];

  return { kana, fontCss, onToggle: () => setShowRomaji((prev) => !prev) };
};

export const HiraganaWord = ({
  rawKana,
  highlightIndex,
  spanCn = "",
  btnCn = "",
}: {
  rawKana: string;
  highlightIndex: number;
  spanCn?: string;
  btnCn?: string;
}) => {
  const { kana, fontCss, onToggle } = useHiraganaWordButton(rawKana);

  return (
    <Button
      variant="ghost"
      className={`flex px-1 z-0 text-md lg:text-2xl ${fontCss} ${btnCn}`}
      onClick={onToggle}
    >
      {kana.split(" ").map((mora, index) => {
        const key = `${mora}-${index}`;

        if (index === highlightIndex) {
          return (
            <SpanBadge
              className={`${badgeCn} text-[15px] md:text-[20px] ${spanCn}`}
              key={key}
            >
              {mora}
            </SpanBadge>
          );
        }

        return (
          <span className={`text-[15px] md:text-[20px] ${spanCn}`} key={key}>
            {mora}
          </span>
        );
      })}
    </Button>
  );
};
