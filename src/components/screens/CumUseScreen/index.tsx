import { lazy } from "react";
import { PageWrapper } from "@/components/dependent/site-wide/PageWrapper";

const LazyCumUseScreen = lazy(() => import("./CumUseScreen"));

const CumUseScreen = () => {
  return (
    <PageWrapper>
      <LazyCumUseScreen />
    </PageWrapper>
  );
};

export { CumUseScreen };
