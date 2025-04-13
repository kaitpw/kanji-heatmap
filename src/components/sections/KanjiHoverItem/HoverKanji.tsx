import React, { useCallback } from "react";
import { useIsTouchDevice } from "@/hooks/use-is-touch-device";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
  HoverCardArrow,
} from "@/components/ui/hover-card";
import { ResponsiveKanjiCard } from "../KanjiInfoCard";
import { KanjiBtnErrorFallback, KanjiItemButton } from "./KanjiItemButton";
import { ErrorBoundary } from "@/components/error";

const HOVER_OPEN_DELAY = 400;
const HOVER_CLOSE_DELAY = 200;

const HoverMeRaw = ({
  trigger,
  isOpen,
  setOpen,
}: {
  trigger: string;
  isOpen: boolean;
  setOpen: (kanji: string | null) => void;
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
    <ErrorBoundary fallback={<KanjiBtnErrorFallback />}>
      <HoverCard open={isOpen}>
        <HoverCardTrigger asChild>
          <KanjiItemButton
            kanji={trigger}
            onClick={() => {
              setOpen(null);
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
          <ErrorBoundary>
            <ResponsiveKanjiCard kanji={trigger} />
          </ErrorBoundary>
        </HoverCardContent>
      </HoverCard>
    </ErrorBoundary>
  );
};

const HoverKanji = React.memo(HoverMeRaw);

export default HoverKanji;
