import { ReactNode } from "react";
import { getFreqCnByRank } from "@/lib/freq-category";
import { GenericPopover } from "@/components/common/GenericPopover";
import { badgeCnOutline } from "@/components/ui/badge-utils";

export const FrequencyBadge = ({
  text,
  rank,
  content,
}: {
  text: string;
  rank?: number | null;
  content: ReactNode;
}) => {
  if (rank == null || rank < 1) {
    return null;
  }

  return (
    <GenericPopover
      trigger={
        <button className={`${badgeCnOutline} text-nowrap py-1 m-1 text-xs`}>
          <span className={`block  h-3 w-3 ${getFreqCnByRank(rank)} mr-1`} />
          <span className="font-normal mr-1 !text-xs">
            {text} {rank}
          </span>
        </button>
      }
      content={<div className="px-4 py-3 w-64">{content}</div>}
    />
  );
};
