import { lazy, Suspense } from "react";
import ControlBar from "./sections/ControlBar";
import LoadingKanjis from "./sections/KanjiList/LoadingKanjis";

const KanjiList = lazy(() => import("./sections/KanjiList"));

const ListScreen = () => {
  return (
    <>
      <div className="sticky top-[50px] bg-white dark:bg-black bg-opacity-50 backdrop-blur-sm px-2 pb-2 z-40">
        <ControlBar />
      </div>

      <div className="relative top-12 -z-0 flex flex-wrap items-center justify-center pt-1 overflow-x-hidden">
        <Suspense fallback={<LoadingKanjis />}>
          <KanjiList />
        </Suspense>
      </div>
    </>
  );
};

export default ListScreen;
