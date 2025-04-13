import { lazy, Suspense } from "react";
import LoadingKanjis from "./LoadingKanjis";

const KanjiList = lazy(() => import("./KanjiListWithSearch"));
const KanjiDrawerGlobal = lazy(() => import("../Drawer/KanjiDrawerGlobal"));

export const SuspendedKanjiList = () => {
  return (
    <Suspense fallback={<LoadingKanjis type="colorful" />}>
      <>
        <KanjiList />
        <KanjiDrawerGlobal />
      </>
    </Suspense>
  );
};
