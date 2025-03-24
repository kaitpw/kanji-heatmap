import {
  frequencyRankLabels,
  inverseFreqMap,
} from "@/lib/options/options-label-maps";
import { GenericPopover } from "@/components/common/GenericPopover";
import { badgeCnOutline } from "@/components/ui/badge-utils";
import { cnSquare } from "@/lib/generic-cn";
import { FreqRankTypeInfo } from "@/components/common/freq/FreqRankTypeInfo";
import { colorMap, freqKeyMap } from "./helpers";

export const KeyLegend = ({ freqKey }: { freqKey: string }) => {
  const infoKey = freqKeyMap[freqKey];
  const config = {
    label: frequencyRankLabels[infoKey],
    color: colorMap[freqKey],
  };

  return (
    <GenericPopover
      trigger={
        <button
          className={`${badgeCnOutline} text-nowrap !p-3 m-1 !text-base rounded-xl hover:bg-[#2effff] hover:text-black`}
        >
          <span
            className={`block  h-5 w-5 ${cnSquare} mx-2`}
            style={{ backgroundColor: config.color }}
          />
          {config.label}
        </button>
      }
      content={
        <div className="px-4 py-3 w-64">
          <FreqRankTypeInfo value={inverseFreqMap[infoKey]} />
        </div>
      }
    />
  );
};
