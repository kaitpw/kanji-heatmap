import type { ReactNode } from "react";
import { useIsKanjiWorkerReady } from "@/kanji-worker/kanji-worker-hooks";

import { ControlBar } from "./ControlBar/";
import LoadingKanjis from "./KanjiList/LoadingKanjis";

import { SuspendedKanjiList } from "./KanjiList/LazyKanjiList";

const Layout = ({
  children,
}: {
  children: ReactNode;
}) => {
  return (
    <>
      {/* Desktop: Top control bar */}
      <div className="fix-scroll-layout-shift-right fixed w-full pt-12 pb-2 z-40 bg-background hidden md:block">
        <section className="mx-auto max-w-screen-xl flex border-0 space-x-1 sticky pt-1 pl-2 pr-1 w-full ">
          <ControlBar />
        </section>
      </div>

      {/* Mobile: Bottom control bar */}
      <div
        className="fix-scroll-layout-shift-right fixed bottom-0 left-0 w-full pb-2 z-40 bg-background md:hidden border-t border-border"
        style={{ paddingBottom: "calc(0.5rem + env(safe-area-inset-bottom))" }}
      >
        <section className="mx-auto max-w-screen-xl flex border-0 space-x-1 pt-1 pl-2 pr-1 w-full">
          <ControlBar />
        </section>
      </div>

      {/* Content area with responsive padding */}
      <div
        className="relative pt-24 pb-20 md:pb-0 -z-0 flex flex-wrap items-center justify-center overflow-x-hidden"
        style={{ paddingBottom: "calc(5rem + env(safe-area-inset-bottom))" }}
      >
        {children}
      </div>
    </>
  );
};

export const ListScreen = () => {
  const ready = useIsKanjiWorkerReady();

  if (!ready) {
    return (
      <Layout>
        <LoadingKanjis />
      </Layout>
    );
  }

  return (
    <Layout>
      <SuspendedKanjiList />
    </Layout>
  );
};
