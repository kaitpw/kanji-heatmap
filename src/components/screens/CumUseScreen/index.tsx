import { lazy, Suspense } from "react";
import ErrorBoundary from "@/components/error/ErrorBoundary";
import { BasicLoading } from "@/components/common/BasicLoading";

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
