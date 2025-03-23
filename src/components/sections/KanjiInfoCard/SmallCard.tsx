import { HoverItemReturnData } from "@/lib/kanji/kanji-info-types";
import {
  useIsKanjiWorkerReady,
  useKanjiInfo,
} from "@/kanji-worker/kanji-worker-hooks";

import { DefaultErrorFallback } from "@/components/error";

import { Badge } from "@/components/ui/badge";
import { JLPTBadge } from "@/components/common/jlpt/JLPTBadge";
import { ReactNode } from "react";

const Wrapper = ({ kanji, badges }: { kanji: string; badges: ReactNode }) => {
  return (
    <div className="m-1 border border-dashed p-2">
      <div className="flex flex-wrap items-center justify-center mx-1">
        {badges}
      </div>
      <div className="kanji-font text-8xl mb-2">{kanji}</div>
    </div>
  );
};
export const SmallKanjiCard = ({ kanji }: { kanji: string }) => {
  const data = useKanjiInfo(kanji, "hover-card");
  const ready = useIsKanjiWorkerReady();

  if (data.error) {
    return <DefaultErrorFallback message="Failed to load data." />;
  }

  if (data.status === "loading" || !ready || data.data == null) {
    return (
      <Wrapper
        kanji={kanji}
        badges={
          <>
            <Badge className="animate-pulse m-1">......</Badge>
            <Badge className="animate-pulse m-1" variant={"outline"}>
              ......
            </Badge>
          </>
        }
      />
    );
  }

  const info = data.data as HoverItemReturnData;

  return (
    <Wrapper
      kanji={kanji}
      badges={
        <>
          <Badge className="text-nowrap m-1">
            {info.keyword.toUpperCase()}
          </Badge>
          <JLPTBadge jlpt={info.jlpt} />
        </>
      }
    />
  );
};
