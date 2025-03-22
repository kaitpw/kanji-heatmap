import { lazy, Suspense } from "react";
import KaomojiAnimation from "@/components/common/KaomojiLoading";

const LazyAboutScreen = lazy(() => import("./AboutScreen"));

const AboutScreen = () => {
  return (
    <Suspense
      fallback={
        <div className="mt-20">
          <KaomojiAnimation />
        </div>
      }
    >
      <LazyAboutScreen />
    </Suspense>
  );
};

export { AboutScreen };
