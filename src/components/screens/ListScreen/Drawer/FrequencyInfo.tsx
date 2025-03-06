import { KanjiInfoFrequency } from "@/lib/kanji-worker-constants";
import {
  freqCategoryOpacity,
  getFreqCategory,
  ITEM_CARD_BG_CN,
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
  wikiChar: "Wikipedia Characters",
  wikiDoc: "Wikipedia Documents",
  aozoraChar: "Aozora Chars",
  aozoraDoc: "Aozora Documents",
  onlineNewsChar: "Online News Characters",
  onlineNewsDoc: "Online News Documents",
  novels5100: "5100 Novels",
  dramaSubs: "Drama Subtitles",
  kuf: "KUF",
  mcd: "MCD",
  bunka: "Bunka",
  wkfr: "WKFR",
  jisho: "Jisho",
};

export const FrequencyInfo = ({
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
                      <button className="text-left text-xs flex justify-between !w-[200px]">
                        <span className="font-extrabold flex items-center ">
                          {label} <InfoIcon className="ml-1" size={12} />
                        </span>{" "}
                        <span className="mx-1 block"># {rank}</span>
                      </button>
                    }
                    content={<div className="p-4"> More information here</div>}
                  />
                </TableCell>

                <TableCell className={`w-full py-2 px-0`}>
                  <Progress
                    className={"h-1"}
                    value={progress}
                    primitiveCn={`!${ITEM_CARD_BG_CN}`}
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
