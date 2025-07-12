import { lazy } from "react";
import { PageWrapper } from "@/components/dependent/site-wide/PageWrapper";

const LazyRouletteScreen = lazy(() => import("./RouletteScreen"));

const RouletteScreen = () => {
    return (
        <PageWrapper>
            <LazyRouletteScreen />
        </PageWrapper>
    );
};

export { RouletteScreen };
