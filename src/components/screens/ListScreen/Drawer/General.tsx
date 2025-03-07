import { useKanjiInfo } from "@/kanji-worker/kanji-worker-provider";

import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@radix-ui/react-select";
import { RomajiBadge } from "@/components/common/RomajiBadge";
import { ExternalTextLink } from "@/components/common/ExternalTextLink";
import { externalLinks } from "@/lib/constants";

const hasData = (data?: number) => data != null && data !== -1;

export const General = ({ kanji }: { kanji: string }) => {
  const info = useKanjiInfo(kanji, "general");

  if (info.error) {
    return <div>Something went wrong</div>;
  }

  if (info.data == null) {
    return;
  }
  const data = info.data as {
    allOn: string[];
    allKun: string[];
    meanings: string[];
    jouyouGrade: number;
    wk: number;
    rtk: number;
    strokes: number;
  };

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
      <Separator className="border-b-2 border-dotted my-4" />
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
      <Separator className="border-b-2 border-dotted mb-4" />
      <div className="text-left">
        <h1 className="font-bold mb-1">External Links: </h1>
        <ul className="flex flex-wrap">
          {externalLinks.map((item) => {
            return (
              <li key={item.name}>
                <ExternalTextLink href={item.url(kanji)} text={item.name} />
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};
