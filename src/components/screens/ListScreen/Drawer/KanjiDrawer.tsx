import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import React, { ReactNode } from "react";
import { X } from "lucide-react";
import { KanjiCard } from "../InfoCard/KanjiCard";
import { useIsKanjiWorkerReady } from "@/kanji-worker/kanji-worker-provider";
import { KanjiDetails } from "./Details";

export const Layout = ({
  first,
  second,
}: {
  first: ReactNode;
  second: ReactNode;
}) => {
  return (
    <div className="w-full flex flex-col overflow-y-scroll overflow-x-hidden md:flex-row md:space-x-1 ">
      <div className="pl-2 md:sticky md:top-[0px] md:left-[0px] md:min-w-96 md:max-w-96 md:w-96">
        {first}
      </div>
      <div className="grow">{second}</div>
    </div>
  );
};

export function KanjiDrawerRaw({
  isOpen,
  onClose,
  kanji,
}: {
  isOpen: boolean;
  onClose: () => void;
  kanji: string;
}) {
  const ready = useIsKanjiWorkerReady();

  return (
    <Drawer open={isOpen} onClose={onClose}>
      <DrawerContent
        className="!select-text h-[95svh] !duration-150"
        aria-hidden="true"
      >
        <DrawerTitle className="sr-only">
          Information for Kanji {kanji}
        </DrawerTitle>
        <DrawerDescription className="sr-only">
          Includes Sample Usage, Semantic Phonetic Compositions etc.
        </DrawerDescription>
        <Layout
          first={
            !ready ? (
              <p className="p-20"> Initializing...</p>
            ) : (
              <KanjiCard kanji={kanji} />
            )
          }
          second={<KanjiDetails kanji={kanji} />}
        />
        <DrawerClose asChild className="absolute -top-1 right-0">
          <Button variant="ghost" size="icon" className="m-2">
            <X />
          </Button>
        </DrawerClose>
      </DrawerContent>
    </Drawer>
  );
}

export const KanjiDrawer = React.memo(KanjiDrawerRaw);
