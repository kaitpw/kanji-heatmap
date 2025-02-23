import { lazy, Suspense, useRef } from "react";
import ControlBar from "./ControlBar";
import LoadingKanjis from "./KanjiList/LoadingKanjis";
import { useState, useEffect } from "react";
import createKanjiWorkerWrappedInPromise, {
  PromiseWrappedWorker,
} from "@/lib/kanji-worker-promise-wrapper";
import { SearchSettingsProvider } from "@/providers/search-settings-provider";
import { CardSettingsProvider } from "@/providers/card-settings-provider";

const KanjiList = lazy(() => import("./KanjiList"));

/*
const useKanjiWorker = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [result, setResult] = useState<any>(null);
  const workerRef = useRef<PromiseWrappedWorker | null>(null);

  useEffect(() => {
    const myWorker = createKanjiWorkerWrappedInPromise();
    workerRef.current = myWorker;
    return () => {
      myWorker.terminate();
    };
  }, []);

  const request = (requestData: { action: string; payload: unknown }) => {
    if (workerRef.current) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      workerRef.current.request(requestData).then((data: any) => {
        setResult(data);
      });
    }
  };

  return request;
};

*/
export const MyComponent = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [result, setResult] = useState<any>(null);
  const workerRef = useRef<PromiseWrappedWorker | null>(null);

  useEffect(() => {
    const myWorker = createKanjiWorkerWrappedInPromise();
    workerRef.current = myWorker;
    return () => {
      myWorker.terminate();
    };
  }, []);

  const handleClick = () => {
    if (workerRef.current) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      workerRef.current.request({ hello: "world" }).then((data: any) => {
        setResult(data);
      });
    }
  };

  return (
    <div className="absolute bg-white text-6xl p-4 z-[100000]">
      <p>Result from the worker: {JSON.stringify(result)}</p>
      <button onClick={handleClick}>Calculate in Web Worker</button>
    </div>
  );
};

const ListScreen = () => {
  return (
    <SearchSettingsProvider>
      <CardSettingsProvider>
        <div className="sticky top-[50px] bg-white dark:bg-black bg-opacity-50 backdrop-blur-sm px-2 pb-2 z-40">
          <ControlBar />
        </div>
        <div className="relative top-12 -z-0 flex flex-wrap items-center justify-center pt-1 overflow-x-hidden">
          <Suspense fallback={<LoadingKanjis />}>
            <KanjiList />
          </Suspense>
        </div>
      </CardSettingsProvider>
    </SearchSettingsProvider>
  );
};

export default ListScreen;
