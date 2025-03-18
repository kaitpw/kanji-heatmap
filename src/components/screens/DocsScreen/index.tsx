import { lazy, Suspense } from "react";
import { BasicLoading } from "@/components/common/BasicLoading/BasicLoading";

const LazyDocsScreen = lazy(() => import("./DocsScreen"));

const DocsScreen = () => {
  return (
    <Suspense fallback={<BasicLoading />}>
      <LazyDocsScreen />
    </Suspense>
  );
};

export { DocsScreen };
