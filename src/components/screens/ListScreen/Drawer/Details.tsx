import { lazy, Suspense } from "react";
import SimpleAccordion from "@/components/common/SimpleAccordion";
import { useKanjiInfo } from "@/kanji-worker/kanji-worker-provider";
import { KanjiCacheItem } from "@/lib/kanji-info-types";
import { LinksOutItems } from "@/components/common/LinkOutSection";
import ChangeFontButton from "@/components/common/ChangeFontButton";
import { General } from "./General";
import { FrequencyInfo } from "./FrequencyInfo";
import { DefaultErrorFallback } from "@/components/common/DefaultErrorFallback";
import { BasicLoading } from "@/components/common/BasicLoading";

const StrokeAnimation = lazy(() => import("./StrokeAnimation"));

export const KanjiDetails = ({ kanji }: { kanji: string }) => {
  const info = useKanjiInfo(kanji, "main-plus-extended");

  if (info.error) {
    return <DefaultErrorFallback message="Failed to load data." />;
  }

  if (info.data == null) {
    return <BasicLoading />;
  }

  const data = info.data as KanjiCacheItem;
  return (
    <div className="py-2 mx-2">
      <div className="flex space-x-1 items-center py-2  border-b-2 border-dotted">
        <div className="border-2 border-dashed rounded-lg">
          <ChangeFontButton />
        </div>
        <LinksOutItems />
      </div>
      <SimpleAccordion trigger={"General"}>
        <General kanji={kanji} />
      </SimpleAccordion>
      <SimpleAccordion trigger={"Stroke Order Animation"}>
        <Suspense fallback={<BasicLoading />}>
          <StrokeAnimation kanji={kanji} />
        </Suspense>
      </SimpleAccordion>
      <SimpleAccordion trigger={"Frequency Ranks"}>
        <FrequencyInfo freqRankInfo={data.extended?.frequency} />
      </SimpleAccordion>
    </div>
  );
};
