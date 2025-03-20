import React, { useCallback } from "react";
import { useIsTouchDevice } from "@/hooks/use-is-touch-device";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
  HoverCardArrow,
} from "@/components/ui/hover-card";
import { ResponsiveKanjiCard } from "../KanjiInfoCard";
import { KanjiItemButton } from "./KanjiItemButton";

const HOVER_OPEN_DELAY = 400;
const HOVER_CLOSE_DELAY = 200;

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
  const isTouchDevice = useIsTouchDevice();

  const handleOpen = useCallback(() => {
    if (isTouchDevice) return;
    clearTimeout(closeTimeoutRef.current);
    openTimeoutRef.current = setTimeout(() => {
      setOpen(trigger);
    }, HOVER_OPEN_DELAY);
  }, [isTouchDevice, setOpen, trigger]);

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
          className="p-1 relative w-full"
          collisionPadding={{ top: 10, left: 10, right: 10 }}
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
