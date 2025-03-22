import { lazy, Suspense } from "react";
import KaomojiAnimation from "@/components/common/KaomojiLoading";

const LazyAboutScreen = lazy(() => import("./AboutScreen"));

const AboutScreen = () => {
  return (
    <div className="mt-20">
      <KaomojiAnimation />
    </div>
  );
  return (
    <Suspense fallback={<KaomojiAnimation />}>
      <LazyAboutScreen />
    </Suspense>
  );
};

export { AboutScreen };
