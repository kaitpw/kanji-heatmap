import { lazy } from "react";
import { PageWrapper } from "@/components/dependent/site-wide/PageWrapper";

const LazyDocsScreen = lazy(() => import("./DocsScreen"));

const DocsScreen = () => {
  return (
    <PageWrapper>
      <LazyDocsScreen />
    </PageWrapper>
  );
};

export { DocsScreen };
