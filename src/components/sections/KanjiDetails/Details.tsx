import { lazy, Suspense } from "react";
import { useGetKanjiInfoFn } from "@/kanji-worker/kanji-worker-hooks";

import { DefaultErrorFallback, ErrorBoundary } from "@/components/error";

import { DotIcon } from "@/components/icons";
import { KanjiActionsBtns } from "@/components/common/KanjiActionBtns";
import SimpleAccordion from "@/components/common/SimpleAccordion";
import { BasicLoading } from "@/components/common/BasicLoading";
import { LinksOutItems } from "@/components/common/LinksOutItems";
import ChangeFontButton from "@/components/dependent/site-wide/ChangeFontButton";
import { FrequencyInfo } from "./FrequencyInfo";
import { General } from "./General";
import { RequestForSuggestion } from "@/components/common/RequestForSuggestion";

const StrokeAnimation = lazy(() => import("./StrokeAnimation"));

export const KanjiDetails = ({ kanji }: { kanji: string }) => {
  const getInfo = useGetKanjiInfoFn();

  if (getInfo == null) {
    return <BasicLoading />;
  }

  const data = getInfo(kanji);

  if (data == null) {
    return <DefaultErrorFallback message="Failed to load data." />;
  }

  return (
    <div className="py-2 mx-2">
      <div className="flex space-x-1 items-center py-2  border-b-2 border-dotted">
        <KanjiActionsBtns kanji={kanji} />
        <DotIcon className="w-3 m-0" />

        <div className="border-2 rounded-lg">
          <ChangeFontButton />
        </div>
        <LinksOutItems />
      </div>
      <SimpleAccordion trigger={"General"} defaultOpen={true}>
        <General kanji={kanji} />
      </SimpleAccordion>
      <SimpleAccordion trigger={"Stroke Order Animation"}>
        <ErrorBoundary details="StrokeAnimation in KanjiDetails">
          <Suspense fallback={<BasicLoading />}>
            <StrokeAnimation kanji={kanji} />
          </Suspense>
        </ErrorBoundary>
      </SimpleAccordion>
      <SimpleAccordion trigger={"Frequency Ranks"}>
        <FrequencyInfo freqRankInfo={data.frequency} />
      </SimpleAccordion>
      <RequestForSuggestion />
    </div>
  );
};
