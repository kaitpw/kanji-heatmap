import { KanjiInfoFrequency } from "@/lib/kanji-worker-constants";
import {
  freqCategoryOpacity,
  getFreqCategory,
  KANJI_COUNT,
} from "@/lib/constants";
import { Progress } from "@/components/ui/progress";
import { InfoIcon } from "lucide-react";
import { GenericPopover } from "@/components/common/GenericPopover";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";

const frequencyRankLabels: Record<keyof KanjiInfoFrequency, string> = {
  netflix: "Netflix",
  twitter: "Twitter",
  google: "Google",
  kd: "KD",
  wikiChar: "Wikipedia Character Count",
  wikiDoc: "Wikipedia Document Count",
  aozoraChar: "Aozora Char Count",
  aozoraDoc: "Aozora Document Count",
  onlineNewsChar: "Online News Character Count",
  onlineNewsDoc: "Online News Document Count",
  novels5100: "5100 Novels",
  dramaSubs: "Drama Subtitle Count",
  kuf: "KUF",
  mcd: "MCD",
  bunka: "Bunka",
  wkfr: "WKFR",
  jisho: "Jisho",
};

export const KanjiFrequencyRanks = ({
  freqRankInfo,
}: {
  freqRankInfo?: KanjiInfoFrequency;
}) => {
  if (freqRankInfo == null) {
    return <div> No frequency rank information available.</div>;
  }

  const keys = Object.keys(freqRankInfo).filter((item) => {
    const rank = freqRankInfo[item as keyof KanjiInfoFrequency];
    return rank == null || rank == -1 ? false : true;
  });
  return (
    <>
      <Table className="my-4">
        <TableBody>
          {keys.map((item) => {
            const rank = freqRankInfo[item as keyof KanjiInfoFrequency];
            const label = frequencyRankLabels[item as keyof KanjiInfoFrequency];
            const progress =
              (Math.max(KANJI_COUNT - rank, 0) * 100) / KANJI_COUNT;

            const freqRankCategory = getFreqCategory(rank);

            return (
              <TableRow key={item} className="my-1 text-left p-0">
                <TableCell className="p-0">
                  <GenericPopover
                    trigger={
                      <button
                        className="text-left text-xs  flex"
                        style={{ width: "260px" }}
                      >
                        <span className="font-extrabold mr-1">{label}</span>{" "}
                        <InfoIcon size={12} />
                        <span className="mx-1">~ Rank {rank}</span>
                      </button>
                    }
                    content={<div className="p-4"> More information here</div>}
                  />
                </TableCell>

                <TableCell className={`w-full py-2`}>
                  <Progress
                    className={`h-1 `}
                    value={progress}
                    primitiveCn={`!bg-[#fb02a8]`}
                    primitiveStyle={{
                      opacity: freqCategoryOpacity[freqRankCategory],
                    }}
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
