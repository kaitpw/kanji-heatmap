import { Badge } from "@/components/ui/badge";
import {
  useIsKanjiWorkerReady,
  useKanjiInfo,
} from "@/kanji-worker/kanji-worker-provider";
import { HoverItemReturnData } from "@/lib/kanji-info-types";
import { FrequencyBadges, JLPTBadge } from "./badges";

export const SmallKanjiCard = ({ kanji }: { kanji: string }) => {
  const data = useKanjiInfo(kanji, "hover-card");
  const ready = useIsKanjiWorkerReady();

  if (data.error) {
    return (
      <div>
        Something went wrong in <code>Kanji Card</code>
      </div>
    );
  }

  if (data.status === "loading" || !ready) {
    return (
      <div>
        Something went wrong in <code>Loading</code>
      </div>
    );
  }

  if (data.data == null) {
    return <div> No data available</div>;
  }

  const info = data.data as HoverItemReturnData;

  return (
    <>
      <div className="flex flex-wrap items-center justify-center m-2">
        <Badge className="text-nowrap m-1">{info.keyword.toUpperCase()}</Badge>
        <JLPTBadge jlpt={info.jlpt} />
        <FrequencyBadges frequency={info.frequency} />
      </div>
    </>
  );
};
