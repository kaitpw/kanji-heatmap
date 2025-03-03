import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import React from "react";
import { X } from "lucide-react";
import { KanjiInfoLayout } from "./KanjiCard/layouts";
import { KanjiCard } from "./KanjiCard";
import SimpleAccordion from "@/components/common/SimpleAccordion";
import {
  useIsKanjiWorkerReady,
  useKanjiInfo,
} from "@/providers/kanji-worker-provider";

const LongContent = () => {
  return <div className="my-4">Coming soon...</div>;
};

const KanjiAllInfo = ({ kanji }: { kanji: string }) => {
  const info = useKanjiInfo(kanji, "main-plus-extended");
  return (
    <div className="py-2 mx-2">
      <SimpleAccordion trigger={"General"}>
        <LongContent />
      </SimpleAccordion>
      <SimpleAccordion trigger={"Stroke Order Animation"}>
        <LongContent />
      </SimpleAccordion>
      <SimpleAccordion trigger={"Frequency Ranks"}>
        <LongContent />
      </SimpleAccordion>
      <SimpleAccordion trigger={"Related Kanji"}>
        <LongContent />
      </SimpleAccordion>
      <code>{JSON.stringify(info, null, 2)}</code>
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
              <p className="p-20"> Initializing..</p>
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
