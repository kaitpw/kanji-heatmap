import { ControlBar } from "./ControlBar/";
import { SuspendedKanjiList } from "./KanjiList";
import LoadingKanjis from "./KanjiList/LoadingKanjis";
import { ReactNode } from "react";
import ErrorBoundary from "@/components/sections/error/ErrorBoundary";
import { LinksOutItems } from "@/components/common/LinkOutSection";
import { useIsKanjiWorkerReady } from "@/kanji-worker/kanji-worker-hooks";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <div className="sticky top-[50px] bg-white dark:bg-black bg-opacity-50 backdrop-blur-sm px-2 pb-2 z-40">
        <section className="mx-auto max-w-screen-xl flex border-0 space-x-1 sticky">
          <ErrorBoundary fallback={<LinksOutItems />}>
            <ControlBar />
          </ErrorBoundary>
        </section>
      </div>
      <div className="relative top-12 -z-0 flex flex-wrap items-center justify-center pt-1 overflow-x-hidden">
        <ErrorBoundary>{children}</ErrorBoundary>
      </div>
    </>
  );
};

export const ListScreen = () => {
  const ready = useIsKanjiWorkerReady();

  if (!ready) {
    return (
      <div className="overflow-y-hidden">
        <Layout>
          <LoadingKanjis />;
        </Layout>
      </div>
    );
  }

  return (
    <Layout>
      <SuspendedKanjiList />
    </Layout>
  );
};
