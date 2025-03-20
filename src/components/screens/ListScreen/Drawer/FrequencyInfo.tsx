import { KanjiInfoFrequency } from "@/lib/kanji-worker-types";
import { KANJI_COUNT } from "@/lib/constants";
import { Progress } from "@/components/ui/progress";
import { InfoIcon } from "lucide-react";
import { GenericPopover } from "@/components/common/GenericPopover";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";

import { FreqRankTypeInfo } from "@/components/common/freq/FreqRankTypeInfo";
import { getFreqCnByRank } from "@/lib/freq-category";
import {
  frequencyRankLabels,
  frequencyRankNamesOrdered,
} from "@/lib/label-maps";
import { inverseFreqMap } from "@/lib/freq-rank-map";

export const FrequencyInfo = ({
  freqRankInfo,
}: {
  freqRankInfo?: KanjiInfoFrequency;
}) => {
  if (freqRankInfo == null) {
    return <div className="p-4">No frequency rank information available.</div>;
  }

  return (
    <>
      <Table className="my-4">
        <TableBody>
          {frequencyRankNamesOrdered.map((item) => {
            const rank = freqRankInfo[item as keyof KanjiInfoFrequency];
            const label = frequencyRankLabels[item as keyof KanjiInfoFrequency];
            const progress =
              rank == null || rank < 1
                ? 0
                : (Math.max(KANJI_COUNT - rank, 0) * 100) / KANJI_COUNT;

            const category = getFreqCnByRank(rank);
            const freqkey = inverseFreqMap[item as keyof KanjiInfoFrequency];

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
                          className={`h-3 w-3 inline-block mx-1 ${category}`}
                        />
                      </button>
                    }
                    content={
                      <div className="p-2 w-72">
                        <FreqRankTypeInfo value={freqkey} />
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
