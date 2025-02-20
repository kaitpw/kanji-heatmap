import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
  HoverCardArrow,
} from "@/components/ui/hover-card";
import { Button } from "@/components/ui/button";
import React from "react";
import { KanjiCard } from "./KanjiCard";

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
      <HoverCard
        openDelay={200}
        closeDelay={200}
        onOpenChange={() => {
          setOpen(isOpen ? null : trigger);
        }}
        open={isOpen}
      >
        <HoverCardTrigger asChild>
          <button
            className="p-1.5 rounded-lg text-2xl border-4 mr-1 mb-1 kanji-font text-white border-lime-300 bg-[#fb02a8] bg-opacity-100 z-0 hover:border-[#2effff]"
            onClick={() => {
              setOpen(null);
              openDrawer(trigger);
            }}
          >
            {trigger}
          </button>
        </HoverCardTrigger>
        <HoverCardContent className="w-auto p-1">
          <HoverCardArrow />
          <div className="hidden [@media(min-height:800px)]:[@media(min-width:400px)]:block">
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
