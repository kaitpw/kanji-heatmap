import { lazy, Suspense, useLayoutEffect } from "react";
import { SortAndFilterSection } from "./ControlBar";
import LoadingKanjis from "./KanjiList/LoadingKanjis";

import {
  SearchSettingsProvider,
  useSearchSettingsDispatch,
} from "@/providers/search-settings-provider";
import { CardSettingsProvider } from "@/providers/card-settings-provider";
import CardPresentationSettings, {
  CardPresentationSettingsContent,
} from "./ControlBar/CardPresentationSettings";
import {
  KanjiWorkerProvider,
  useIsKanjiWorkerReady,
} from "@/providers/kanji-worker-provider";

const KanjiList = lazy(() => import("./KanjiList"));

const ListScreenContent = () => {
  return (
    <>
      <div className="sticky top-[50px] bg-white dark:bg-black bg-opacity-50 backdrop-blur-sm px-2 pb-2 z-40">
        <section className="mx-auto max-w-screen-xl flex border-0 space-x-1 sticky">
          <SortAndFilterSection />
          <CardPresentationSettings>
            <CardPresentationSettingsContent />
          </CardPresentationSettings>
        </section>
      </div>
      <div className="relative top-12 -z-0 flex flex-wrap items-center justify-center pt-1 overflow-x-hidden">
        <Suspense fallback={<LoadingKanjis />}>
          <KanjiList />
        </Suspense>
      </div>
    </>
  );
};

const ListScreenIntercept = () => {
  const ready = useIsKanjiWorkerReady();
  const dispatch = useSearchSettingsDispatch();

  useLayoutEffect(() => {
    dispatch("textSearch", { type: "keyword", text: "" });
  }, [dispatch]);

  if (!ready) {
    return (
      <div className="py-40 flex items-center justify-center">
        {"❤️"} Loading {"❤️ "}
      </div>
    );
  }
  return <ListScreenContent />;
};
const ListScreen = () => {
  return (
    <SearchSettingsProvider>
      <KanjiWorkerProvider>
        <CardSettingsProvider>
          <ListScreenIntercept />
        </CardSettingsProvider>
      </KanjiWorkerProvider>
    </SearchSettingsProvider>
  );
};

export default ListScreen;
