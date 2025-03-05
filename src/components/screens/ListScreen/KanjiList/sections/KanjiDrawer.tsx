import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import React, { lazy, Suspense } from "react";
import { X } from "lucide-react";
import { KanjiInfoLayout } from "./KanjiCard/layouts";
import { KanjiCard } from "./KanjiCard";
import SimpleAccordion from "@/components/common/SimpleAccordion";
import {
  useIsKanjiWorkerReady,
  useKanjiInfo,
} from "@/providers/kanji-worker-provider";
import { KanjiGeneralSection } from "./AccordionContent/KanjiGeneralSection";
import { KanjiCacheItem } from "@/lib/kanji-info-types";

import { KanjiFrequencyRanks } from "./AccordionContent/KanjiFrequencyRankSection";
import { LinksOutItems } from "@/components/sections/LinkOutSection";
import ChangeFontButton from "@/components/common/ChangeFontButton";

const KanjiAnimationSection = lazy(
  () => import("./AccordionContent/KanjiAnimation")
);

const KanjiAllInfo = ({ kanji }: { kanji: string }) => {
  const info = useKanjiInfo(kanji, "main-plus-extended");

  if (info.error) {
    return <div> Something went wrong</div>;
  }

  if (info.data == null) {
    return <div>Loading</div>;
  }

  const data = info.data as KanjiCacheItem;
  return (
    <div className="py-2 mx-2">
      <div className="flex space-x-1 items-center py-2  border-b-2 border-dotted">
        <div className="border-2 border-dashed rounded-lg">
          <ChangeFontButton />
        </div>
        <LinksOutItems />
      </div>

      <SimpleAccordion trigger={"General"}>
        <KanjiGeneralSection kanji={kanji} />
      </SimpleAccordion>
      <SimpleAccordion trigger={"Stroke Order Animation"}>
        <Suspense fallback={<div>Loading...</div>}>
          <KanjiAnimationSection kanji={kanji} />
        </Suspense>
      </SimpleAccordion>
      <SimpleAccordion trigger={"Frequency Ranks"}>
        <KanjiFrequencyRanks freqRankInfo={data.extended?.frequency} />
      </SimpleAccordion>
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
        <KanjiInfoLayout
          first={
            !ready ? (
              <p className="p-20"> Initializing...</p>
            ) : (
              <KanjiCard kanji={kanji} />
            )
          }
          second={<KanjiAllInfo kanji={kanji} />}
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
