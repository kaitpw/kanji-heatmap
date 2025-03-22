import { lazy, Suspense } from "react";
import KaomojiAnimation from "@/components/common/KaomojiLoading";

const LazyDocsScreen = lazy(() => import("./DocsScreen"));

const DocsScreen = () => {
  return (
    <Suspense
      fallback={
        <div className="mt-20">
          <KaomojiAnimation />;
        </div>
      }
    >
      <LazyDocsScreen />
    </Suspense>
  );
};

export { DocsScreen };
