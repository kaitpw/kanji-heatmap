import { useIsKanjiWorkerReady } from "@/kanji-worker/kanji-worker-provider";
import { ControlBar } from "./ControlBar/";
import { SuspendedKanjiList } from "./KanjiList";
import { KanjiFunctionalityProvider } from "@/providers/kanji-functionality-provider";

const ListScreenWithLoading = () => {
  const ready = useIsKanjiWorkerReady();

  if (!ready) {
    return (
      <div className="py-40 flex items-center justify-center">
        {"❤️"} Loading {"❤️ "}
      </div>
    );
  }
  return (
    <>
      <div className="sticky top-[50px] bg-white dark:bg-black bg-opacity-50 backdrop-blur-sm px-2 pb-2 z-40">
        <section className="mx-auto max-w-screen-xl flex border-0 space-x-1 sticky">
          <ControlBar />
        </section>
      </div>
      <div className="relative top-12 -z-0 flex flex-wrap items-center justify-center pt-1 overflow-x-hidden">
        <SuspendedKanjiList />
      </div>
    </>
  );
};

export const ListScreen = () => {
  return (
    <KanjiFunctionalityProvider>
      <ListScreenWithLoading />
    </KanjiFunctionalityProvider>
  );
};
