import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
  HoverCardArrow,
} from "@/components/ui/hover-card";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import React from "react";

export const randomStyle = () => {
  const num = Math.random();

  if (num < 0.25) {
    return {
      border: `orange 2px solid`,
      background: `hsl(195 100% 44%)`,
    };
  }

  if (num < 0.5) {
    return {
      border: `red 2px solid`,
      background: `hsl(195 100% 44% / 0.75)`,
    };
  }

  if (num < 0.75) {
    return {
      border: `green 2px solid`,
      background: `hsl(195 100% 44% / 0.5)`,
    };
  }

  return {
    border: `yellow 2px solid`,
    background: `hsl(195 90% 44% / 0.25)`,
  };
};

export function DrawerDemoRaw({
  onClose,
  isOpen,
  kanji,
}: {
  isOpen: boolean;
  onClose: () => void;
  kanji?: string | null;
}) {
  return (
    <Drawer open={isOpen} onClose={onClose}>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm h-[90svh]">
          <DrawerHeader>
            <DrawerTitle>Move Goal</DrawerTitle>
            <DrawerDescription>{kanji}</DrawerDescription>
          </DrawerHeader>
          Hello
          <DrawerFooter>
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}

export const DrawerDemo = React.memo(DrawerDemoRaw);

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
            className="p-1.5 rounded-sm text-2xl border-2 mr-1 mb-1 kanji-font"
            style={{
              border: `yellow 1px solid`,
              background: isOpen
                ? `hsla(320 98.4% 49.6% / 0.91))`
                : `hsla(320 98.4% 49.6% / 0.91)`,
              color: "white",
            }}
            onClick={() => {
              setOpen(null);
              openDrawer(trigger);
            }}
          >
            {trigger}
          </button>
        </HoverCardTrigger>
        <HoverCardContent>
          <HoverCardArrow />
          <div>
            Hello! {trigger}
            <Button
              onClick={() => {
                setOpen(null);
                openDrawer(trigger);
              }}
            >
              Click Me to Open Drawer
            </Button>
          </div>
        </HoverCardContent>
      </HoverCard>
    </>
  );
};

const HoverMe = React.memo(HoverMeRaw);

export default HoverMe;
