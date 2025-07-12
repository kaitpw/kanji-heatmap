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
import { KanjiActionsBtns } from "@/components/dependent/site-wide/KanjiActionBtns";

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

        {/* Sticky Header with Action Buttons and Close Button */}
        <div className="sticky top-0 z-10 bg-background border-b px-4 py-0 flex items-center justify-between">
          <KanjiActionsBtns kanji={kanji} />
          <DrawerClose asChild>
            <Button
              variant="secondary"
              size="icon"
              className="rounded-full border-2 border-dotted flex justify-center items-center"
            >
              <CircleX />
            </Button>
          </DrawerClose>
        </div>

        <ErrorBoundary>
          <KanjiInfoContent kanji={kanji} />
        </ErrorBoundary>
      </DrawerContent>
    </Drawer>
  );
}

export const KanjiDrawer = React.memo(KanjiDrawerRaw);
