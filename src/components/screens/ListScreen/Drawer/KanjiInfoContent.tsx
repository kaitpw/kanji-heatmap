import { ReactNode } from "react";

import {
  useGetKanjiInfoFn,
  useIsKanjiWorkerReady,
} from "@/kanji-worker/kanji-worker-hooks";

import { ErrorBoundary, KanjiNotFound } from "@/components/error";

import { BasicLoading } from "@/components/common/BasicLoading";
import { KanjiCard } from "@/components/sections/KanjiInfoCard/KanjiCard";
import { KanjiDetails } from "@/components/sections/KanjiDetails/Details";

const Layout = ({ first, second }: { first: ReactNode; second: ReactNode }) => {
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

export const KanjiInfoContent = ({ kanji }: { kanji: string }) => {
  const ready = useIsKanjiWorkerReady();
  const getFn = useGetKanjiInfoFn();
  const info = getFn?.(kanji);

  if (!ready) {
    return <BasicLoading />;
  }

  if (info != null) {
    return (
      <Layout
        first={<KanjiCard kanji={kanji} />}
        second={<KanjiDetails kanji={kanji} />}
      />
    );
  }

  return <KanjiNotFound kanji={kanji} />;
};
