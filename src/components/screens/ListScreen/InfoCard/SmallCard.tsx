import { HoverItemReturnData } from "@/lib/kanji-info-types";
import {
  useIsKanjiWorkerReady,
  useKanjiInfo,
} from "@/kanji-worker/kanji-worker-hooks";

import { DefaultErrorFallback } from "@/components/error";

import { Badge } from "@/components/ui/badge";
import { JLPTBadge } from "@/components/common/jlpt/JLPTBadge";
import { BasicLoading } from "@/components/common/BasicLoading";

import { FrequencyBadges } from "./FrequencyBadges";

export const SmallKanjiCard = ({ kanji }: { kanji: string }) => {
  const data = useKanjiInfo(kanji, "hover-card");
  const ready = useIsKanjiWorkerReady();

  if (data.error) {
    return <DefaultErrorFallback message="Failed to load data." />;
  }

  if (data.status === "loading" || !ready || data.data == null) {
    return (
      <div className="w-full">
        <BasicLoading />
      </div>
    );
  }

  const info = data.data as HoverItemReturnData;

  return (
    <div className="flex flex-wrap items-center justify-center m-2">
      <Badge className="text-nowrap m-1">{info.keyword.toUpperCase()}</Badge>
      <JLPTBadge jlpt={info.jlpt} />
      <FrequencyBadges frequency={info.frequency} />
    </div>
  );
};
