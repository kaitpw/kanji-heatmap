import { KanjiInfoFrequency } from "@/lib/kanji-worker-constants";
import { KANJI_COUNT } from "@/lib/constants";
import { Progress } from "@/components/ui/progress";
import { InfoIcon } from "lucide-react";
import { GenericPopover } from "@/components/common/GenericPopover";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import {
  frequencyRankLabels,
  getFreqCnByRank,
  inverseFreqMap,
} from "@/lib/frequency-rank";
import { FreqRankTypeInfo } from "@/components/common/FreqRankTypeInfo";

export const FrequencyInfo = ({
  freqRankInfo,
}: {
  freqRankInfo?: KanjiInfoFrequency;
}) => {
  if (freqRankInfo == null) {
    return <div className="p-4"> No frequency rank information available.</div>;
  }

  return (
    <>
      <Table className="my-4">
        <TableBody>
          {Object.keys(freqRankInfo).map((item) => {
            const rank = freqRankInfo[item as keyof KanjiInfoFrequency];
            const label = frequencyRankLabels[item as keyof KanjiInfoFrequency];
            const progress =
              rank === -1
                ? 0
                : (Math.max(KANJI_COUNT - rank, 0) * 100) / KANJI_COUNT;

            return (
              <TableRow key={item} className="my-1 text-left p-0">
                <TableCell className="p-0">
                  <GenericPopover
                    trigger={
                      <button className="text-left text-xs flex justify-between items-center w-[225px] lg:w-[280px] py-1">
                        <span className="font-extrabold">
                          {label}{" "}
                          <InfoIcon className="inline-block" size={12} />
                        </span>{" "}
                        {rank !== -1 && (
                          <span className="inline-block -mb-0_5 grow text-end w-12">
                            #{rank}
                          </span>
                        )}
                        <span
                          className={`h-3 w-3 inline-block mx-1 ${getFreqCnByRank(rank)} `}
                        />
                      </button>
                    }
                    content={
                      <div className="p-2 w-72">
                        <FreqRankTypeInfo
                          value={
                            inverseFreqMap[item as keyof KanjiInfoFrequency]
                          }
                          defaultValue={"No Information available."}
                        />
                      </div>
                    }
                  />
                </TableCell>

                <TableCell className={`w-full py-2 px-0`}>
                  <Progress
                    className={"h-1"}
                    value={progress}
                    primitiveCn={"!bg-[#fb02a8]"}
                  />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </>
  );
};
