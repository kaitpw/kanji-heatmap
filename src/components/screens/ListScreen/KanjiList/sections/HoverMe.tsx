import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
  HoverCardArrow,
} from "@/components/ui/hover-card";
import { Button } from "@/components/ui/button";
import React, { forwardRef } from "react";
import { KanjiCard } from "./KanjiCard";
import { useKanjiInfo } from "@/providers/kanji-worker-provider";
import { KanjiMainInfo } from "@/lib/kanji-worker-constants";
import { JLPTListItems } from "@/lib/constants";

interface TriggerProps {
  onClick?: () => void;
  kanji: string;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

const KanjiItemButton = forwardRef<HTMLButtonElement, TriggerProps>(
  (props, ref) => {
    const { kanji, onClick, onMouseEnter, onMouseLeave } = props;
    const kanjiInfo = useKanjiInfo(kanji, "item-card");
    const cn =
      "p-1.5 rounded-lg text-2xl border-4 mr-1 mb-1 kanji-font text-white bg-opacity-100 bg-[#fb02a8] z-0 hover:border-[#2effff]";

    if (kanjiInfo.data == null) {
      return (
        <button ref={ref} className={`${cn} animate-pulse border-lime-300 `}>
          {kanji}
        </button>
      );
    }

    const data = kanjiInfo.data as KanjiMainInfo;
    const jlpt = data.jlpt;
    const border = JLPTListItems[jlpt].cnBorder;
    return (
      <button
        className={`${cn} ${border}`}
        ref={ref}
        onClick={onClick}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        {kanji}
      </button>
    );
  }
);

const HoverMeRaw = ({
  trigger,
  isOpen,
  setOpen,
  openDrawer,
}: {
  trigger: string;
  isOpen: boolean;
  setOpen: (kanji: string | null) => void;
  openDrawer: (kanji: string | null) => void;
}) => {
  return (
    <>
      <HoverCard open={isOpen}>
        <HoverCardTrigger
          asChild
          onClick={() => {
            setOpen(null);
            openDrawer(trigger);
          }}
          onMouseEnter={() => {
            // FIXME: Figure out how to have openDelay and closeDelay
            setOpen(trigger);
          }}
        >
          <KanjiItemButton kanji={trigger} />
        </HoverCardTrigger>
        <HoverCardContent className="p-1  w-128 relative ">
          <HoverCardArrow />
          <div className=" hidden[@media(min-height:800px)]:[@media(min-width:400px)]:block">
            <KanjiCard kanji={trigger} />
          </div>
          <Button
            variant="ghost"
            className="text-xs px-2 my-2 italic"
            onClick={() => {
              setOpen(null);
              openDrawer(trigger);
            }}
          >
            View more details
          </Button>
        </HoverCardContent>
      </HoverCard>
    </>
  );
};

const HoverMe = React.memo(HoverMeRaw);

export default HoverMe;
