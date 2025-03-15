import { lazy, Suspense } from "react";
import SimpleAccordion from "@/components/common/SimpleAccordion";
import { useGetKanjiInfoFn } from "@/kanji-worker/kanji-worker-provider";
import { LinksOutItems } from "@/components/common/LinkOutSection";
import ChangeFontButton from "@/components/common/ChangeFontButton";
import { General } from "./General";
import { FrequencyInfo } from "./FrequencyInfo";
import { DefaultErrorFallback } from "@/components/common/DefaultErrorFallback";
import { BasicLoading } from "@/components/common/BasicLoading";

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
        <div className="border-2 rounded-lg">
          <ChangeFontButton />
        </div>
        <LinksOutItems />
      </div>
      <SimpleAccordion trigger={"General"} defaultOpen={true}>
        <General kanji={kanji} />
      </SimpleAccordion>
      <SimpleAccordion trigger={"Stroke Order Animation"}>
        <Suspense fallback={<BasicLoading />}>
          <StrokeAnimation kanji={kanji} />
        </Suspense>
      </SimpleAccordion>
      <SimpleAccordion trigger={"Frequency Ranks"}>
        <FrequencyInfo freqRankInfo={data.frequency} />
      </SimpleAccordion>
    </div>
  );
};
