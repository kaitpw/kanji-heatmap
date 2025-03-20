import { GeneralKanjiItem } from "@/lib/kanji-info-types";
import { useKanjiInfo } from "@/kanji-worker/kanji-worker-hooks";

import { DefaultErrorFallback } from "@/components/error";

import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { DottedSeparator } from "@/components/ui/dotted-separator";

import { RomajiBadge } from "@/components/common/RomajiBadge";
import { BasicLoading } from "@/components/common/BasicLoading";
import { ExternalKanjiLinks } from "@/components/common/ExternalKanjiLinks";

const hasData = (data?: number) => data != null && data !== -1;

export const General = ({ kanji }: { kanji: string }) => {
  const info = useKanjiInfo(kanji, "general");

  if (info.error) {
    return <DefaultErrorFallback message="Failed to load data." />;
  }

  if (info.data == null) {
    return <BasicLoading />;
  }

  const data = info.data as GeneralKanjiItem;

  return (
    <>
      <div className="text-left mt-6">
        {hasData(data.jouyouGrade) && (
          <Badge className="m-1">Grade {data.jouyouGrade}</Badge>
        )}
        {hasData(data.strokes) && (
          <Badge className="m-1">Strokes {data.strokes}</Badge>
        )}
        {hasData(data.wk) && <Badge className="m-1">Wanikani {data.wk}</Badge>}
        {hasData(data.rtk) && <Badge className="m-1">RTK {data.rtk}</Badge>}
      </div>
      <DottedSeparator className="border-b-2 my-4" />
      <Table>
        <TableBody>
          <TableRow className="text-left">
            <TableCell>Meanings</TableCell>
            <TableCell>
              {data.meanings.map((meaning) => {
                return (
                  <Badge key={meaning} variant={"outline"} className="m-1">
                    {meaning}
                  </Badge>
                );
              })}

              {data.meanings.length === 0 && <div> - </div>}
            </TableCell>
          </TableRow>
          <TableRow className="text-left">
            <TableCell>Kun Readings</TableCell>
            <TableCell>
              {data.allKun.map((kun) => {
                return <RomajiBadge key={kun} kana={kun} />;
              })}
              {data.allKun.length === 0 && <div> - </div>}
            </TableCell>
          </TableRow>
          <TableRow className="text-left">
            <TableCell>On Readings</TableCell>
            <TableCell>
              {data.allOn.map((on) => {
                return <RomajiBadge key={on} kana={on} />;
              })}
              {data.allOn.length === 0 && <div> - </div>}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <DottedSeparator className="border-b-2 mb-4" />
      <div className="text-left">
        <h1 className="font-bold mb-1">External Links: </h1>
        <ExternalKanjiLinks kanji={kanji} />
      </div>
    </>
  );
};
