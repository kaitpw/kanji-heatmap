import React from "react";

import { X } from "@/components/icons";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { KanjiInfoContent } from "./KanjiInfoContent";
import useHtmlDocumentTitle from "@/hooks/use-html-document-title";

export function KanjiDrawerRaw({
  isOpen,
  onClose,
  kanji,
}: {
  isOpen: boolean;
  onClose: () => void;
  kanji: string;
}) {
  useHtmlDocumentTitle(kanji ? `${kanji} - Heatmap` : "Heatmap");
  // need autoFocus=true see also: https://github.com/emilkowalski/vaul/issues/517#issuecomment-2571619213
  return (
    <Drawer open={isOpen} onClose={onClose}>
      <DrawerContent
        className="!select-text h-[95svh] !duration-150"
        autoFocus={true}
      >
        <DrawerTitle className="sr-only">Information for Kanji</DrawerTitle>
        <DrawerDescription className="sr-only">
          Includes Sample Usage, Semantic Phonetic Compositions etc.
        </DrawerDescription>
        <KanjiInfoContent kanji={kanji} />
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
