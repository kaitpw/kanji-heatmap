import React from "react";
import useHtmlDocumentTitle from "@/hooks/use-html-document-title";
import { CircleX } from "@/components/icons";
import { ErrorBoundary } from "@/components/error";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";

import { KanjiInfoContent } from "./KanjiInfoContent";

export function KanjiDrawerRaw({
  isOpen,
  onClose,
  kanji,
}: {
  isOpen: boolean;
  onClose: () => void;
  kanji: string;
}) {
  useHtmlDocumentTitle(kanji);

  // need autoFocus=true see also: https://github.com/emilkowalski/vaul/issues/517#issuecomment-2571619213
  // Also: autoFocus=true prevents the issue of search input from unnecessarily retaining focus
  return (
    <Drawer open={isOpen} onClose={onClose} autoFocus={true}>
      <DrawerContent className="!select-text h-[95dvh] !duration-200">
        <DrawerTitle className="sr-only">Information for Kanji</DrawerTitle>
        <DrawerDescription className="sr-only">
          Includes Sample Usage, Semantic Phonetic Compositions etc.
        </DrawerDescription>
        <ErrorBoundary>
          <KanjiInfoContent kanji={kanji} />
        </ErrorBoundary>
        <DrawerClose asChild className="absolute -top-1 right-0">
          <Button
            variant="secondary"
            size="icon"
            className="mx-3 mt-3 rounded-full border-2 border-dotted flex justify-center item-center"
          >
            <CircleX />
          </Button>
        </DrawerClose>
      </DrawerContent>
    </Drawer>
  );
}

export const KanjiDrawer = React.memo(KanjiDrawerRaw);
