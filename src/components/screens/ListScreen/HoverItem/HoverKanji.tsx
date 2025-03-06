import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
  HoverCardArrow,
} from "@/components/ui/hover-card";
import React, { useCallback } from "react";
import { ResponsiveKanjiCard } from "../InfoCard";
import { KanjiItemButton } from "./KanjiItemButton";

const HOVER_OPEN_DELAY = 500;
const HOVER_CLOSE_DELAY = 500;

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
  const openTimeoutRef = React.useRef<NodeJS.Timeout>();
  const closeTimeoutRef = React.useRef<NodeJS.Timeout>();

  const handleOpen = useCallback(() => {
    clearTimeout(closeTimeoutRef.current);
    openTimeoutRef.current = setTimeout(() => {
      setOpen(trigger);
    }, HOVER_OPEN_DELAY);
  }, [setOpen, trigger]);

  const handleClose = useCallback(() => {
    clearTimeout(openTimeoutRef.current);
    closeTimeoutRef.current = setTimeout(() => {
      setOpen(null);
    }, HOVER_CLOSE_DELAY);
  }, [setOpen]);

  return (
    <>
      <HoverCard open={isOpen}>
        <HoverCardTrigger asChild>
          <KanjiItemButton
            kanji={trigger}
            onClick={() => {
              setOpen(null);
              openDrawer(trigger);
            }}
            onMouseEnter={handleOpen}
            onMouseLeave={handleClose}
            onBlur={handleClose}
          />
        </HoverCardTrigger>
        <HoverCardContent
          className="p-1 w-52 [@media(min-height:800px)]:[@media(min-width:400px)]:w-[392px] relative"
          collisionPadding={{ top: 100, left: 10, right: 10 }}
        >
          <HoverCardArrow />
          <ResponsiveKanjiCard kanji={trigger} />
        </HoverCardContent>
      </HoverCard>
    </>
  );
};

const HoverKanji = React.memo(HoverMeRaw);

export default HoverKanji;
