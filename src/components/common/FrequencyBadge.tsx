import { GenericPopover } from "@/components/common/GenericPopover";
import { badgeCnOutline } from "@/components/ui/badge";
import { getFreqCnByRank } from "@/lib/freq-category";
import { ReactNode } from "react";

export const FrequencyBadge = ({
  text,
  rank,
  content,
}: {
  text: string;
  rank?: number;
  content: ReactNode;
}) => {
  if (rank == null || rank < 1) {
    return <></>;
  }

  return (
    <GenericPopover
      trigger={
        <button className={`${badgeCnOutline} text-nowrap py-1 m-1`}>
          <span className={`block  h-3 w-3 ${getFreqCnByRank(rank)} mr-1`}>
            {" "}
          </span>
          {text}~ {rank}
        </button>
      }
      content={<div className="px-4 py-3 w-64">{content}</div>}
    />
  );
};
