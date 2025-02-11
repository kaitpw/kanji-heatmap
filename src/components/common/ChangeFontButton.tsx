import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Button } from "@/components/ui/button";
import { useRef } from "react";

const NUMBER_OF_FONTS = 7;
const ChangeFontButton = () => {
  const fontIdRef = useRef(0);

  return (
    <HoverCard openDelay={0}>
      <HoverCardTrigger asChild>
        <Button
          className="font-bold h-7 px-2 kanji-font"
          variant={"secondary"}
          onClick={() => {
            fontIdRef.current = (fontIdRef.current + 1) % NUMBER_OF_FONTS;
            document.documentElement.style.setProperty(
              "--kanji-font",
              `var(--jap-font-${fontIdRef.current})`
            );

            console.log(fontIdRef.current);
          }}
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
