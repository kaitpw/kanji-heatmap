import { lazy, Suspense } from "react";
import { BasicLoading } from "@/components/common/BasicLoading";
import ErrorBoundary from "@/components/sections/error/ErrorBoundary";

const LazyCumUseScreen = lazy(() => import("./CumUseScreen"));

const CumUseScreen = () => {
  return (
    <div className="my-20">
      <ErrorBoundary details="CumUseScreen">
        <Suspense fallback={<BasicLoading />}>
          <LazyCumUseScreen />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
};

export { CumUseScreen };
