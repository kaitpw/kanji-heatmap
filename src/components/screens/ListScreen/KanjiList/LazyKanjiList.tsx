import { lazy, Suspense } from "react";
import LoadingKanjis from "./LoadingKanjis";

const KanjiList = lazy(() => import("./KanjiListWithSearch"));

export const SuspendedKanjiList = () => {
  return (
    <Suspense fallback={<LoadingKanjis type="colorful" />}>
      <KanjiList />
    </Suspense>
  );
};
