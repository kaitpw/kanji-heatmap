import { lazy, Suspense } from "react";
import { BasicLoading } from "@/components/common/BasicLoading/BasicLoading";

const LazyAboutScreen = lazy(() => import("./AboutScreen"));

const AboutScreen = () => {
  return (
    <Suspense fallback={<BasicLoading />}>
      <LazyAboutScreen />
    </Suspense>
  );
};

export { AboutScreen };
