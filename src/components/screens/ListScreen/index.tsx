import { lazy, Suspense } from "react";
import { ItemCountBadge, SortAndFilterSection } from "./ControlBar";
import LoadingKanjis from "./KanjiList/LoadingKanjis";

import { SearchSettingsProvider } from "@/providers/search-settings-provider";
import { CardSettingsProvider } from "@/providers/card-settings-provider";
import CardPresentationSettings, {
  CardPresentationSettingsContent,
} from "./ControlBar/CardPresentationSettings";
import { KanjiWorkerProvider } from "@/providers/kanji-worker-provider";

const KanjiList = lazy(() => import("./KanjiList"));

const ListScreenContent = () => {
  return (
    <>
      <div className="sticky top-[50px] bg-white dark:bg-black bg-opacity-50 backdrop-blur-sm px-2 pb-2 z-40">
        <section className="mx-auto max-w-screen-xl flex border-0 space-x-1 sticky">
          <ItemCountBadge />
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
const ListScreen = () => {
  return (
    <SearchSettingsProvider>
      <KanjiWorkerProvider>
        <CardSettingsProvider>
          <ListScreenContent />
        </CardSettingsProvider>
      </KanjiWorkerProvider>
    </SearchSettingsProvider>
  );
};

export default ListScreen;
