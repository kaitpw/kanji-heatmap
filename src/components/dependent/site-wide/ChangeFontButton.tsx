import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Button } from "@/components/ui/button";
import { useCallback, useLayoutEffect, useRef } from "react";

const LOCAL_STORAGE_KANJI_FONT_KEY = "kanji-font";
const NUMBER_OF_FONTS = 8;

const useChangeFont = () => {
  const fontIdRef = useRef(0);

  const setFont = useCallback((fontNum: number) => {
    document.documentElement.style.setProperty(
      "--kanji-font",
      `var(--jap-font-${fontNum})`
    );
    localStorage.setItem(LOCAL_STORAGE_KANJI_FONT_KEY, fontNum.toString());
  }, []);

  const nextFont = useCallback(() => {
    fontIdRef.current = (fontIdRef.current + 1) % NUMBER_OF_FONTS;
    setFont(fontIdRef.current);
  }, [setFont]);

  useLayoutEffect(() => {
    const kanjiFont = Number(
      localStorage.getItem(LOCAL_STORAGE_KANJI_FONT_KEY)
    );

    if (Number.isNaN(kanjiFont)) {
      setFont(0);
      return;
    }

    setFont(kanjiFont);
  }, [setFont]);

  return nextFont;
};

const ChangeFontButton = () => {
  const nextFont = useChangeFont();

  return (
    <HoverCard openDelay={0}>
      <HoverCardTrigger asChild>
        <Button
          className="font-bold h-7 px-2 kanji-font"
          variant={"secondary"}
          onClick={nextFont}
        >
          字体
        </Button>
      </HoverCardTrigger>
      <HoverCardContent className="p-2 w-32 text-xs">
        Change Kanji Font
      </HoverCardContent>
    </HoverCard>
  );
};

export default ChangeFontButton;
