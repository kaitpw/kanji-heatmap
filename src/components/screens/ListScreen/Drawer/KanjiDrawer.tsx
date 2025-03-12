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
import {
  useGetKanjiInfoFn,
  useIsKanjiWorkerReady,
} from "@/kanji-worker/kanji-worker-provider";
import { KanjiDetails } from "./Details";
import ErrorBoundary from "@/components/common/ErrorBoundary";
import { BasicLoading } from "@/components/common/BasicLoading";
import { DefaultErrorFallback } from "@/components/common/DefaultErrorFallback";

export const Layout = ({
  first,
  second,
}: {
  first: ReactNode;
  second: ReactNode;
}) => {
  return (
    <div className="w-full flex flex-col overflow-y-scroll overflow-x-hidden md:flex-row md:space-x-1 ">
      <div className="px-1 md:sticky md:top-[0px] md:left-[0px] md:min-w-96 md:max-w-96 md:w-96">
        <ErrorBoundary details="Kanji Card in KanjiDrawer Layout">
          {first}
        </ErrorBoundary>
      </div>
      <div className="grow">
        <ErrorBoundary details="Kanji Details in KanjiDrawer Layout">
          {second}
        </ErrorBoundary>
      </div>
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
  const getFn = useGetKanjiInfoFn();
  const info = getFn?.(kanji);

  const content = !ready ? (
    <BasicLoading />
  ) : info != null ? (
    <Layout
      first={<KanjiCard kanji={kanji} />}
      second={<KanjiDetails kanji={kanji} />}
    />
  ) : (
    <DefaultErrorFallback
      message={`The kanji "${kanji}" does not exist in our database.`}
      showDefaultCta={false}
    />
  );

  // need autoFocus=true see also: https://github.com/emilkowalski/vaul/issues/517#issuecomment-2571619213
  return (
    <Drawer open={isOpen} onClose={onClose} autoFocus={true}>
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
        {content}
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
