import type { ReactNode } from "react";
import { getFreqCnByRank } from "@/lib/freq/freq-category";
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
        <button
          type="button"
          className={`${badgeCnOutline} text-nowrap py-0.5 m-1 text-[10px] hover:bg-[#2effff] hover:text-black`}
        >
          <span className={`block h-2 w-2 ${getFreqCnByRank(rank)} mr-1`} />
          <span className="font-normal mr-1 !text-sm">
            {text} {rank}
          </span>
        </button>
      }
      content={<div className="px-4 py-3 w-64">{content}</div>}
    />
  );
};
