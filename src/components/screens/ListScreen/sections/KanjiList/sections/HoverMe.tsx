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
            className="p-1.5 rounded-lg text-2xl border-4 mr-1 mb-1 kanji-font text-white border-lime-300 bg-[#fb02a8] bg-opacity-100 z-0 hover:border-[#2effff]"
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
