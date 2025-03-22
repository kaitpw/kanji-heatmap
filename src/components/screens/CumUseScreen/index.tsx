import { lazy, Suspense } from "react";
import { ErrorBoundary } from "@/components/error";
import KaomojiAnimation from "@/components/common/KaomojiLoading";

const LazyCumUseScreen = lazy(() => import("./CumUseScreen"));

const CumUseScreen = () => {
  return (
    <div className="my-20">
      <ErrorBoundary details="CumUseScreen">
        <Suspense fallback={<KaomojiAnimation />}>
          <LazyCumUseScreen />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
};

export { CumUseScreen };
