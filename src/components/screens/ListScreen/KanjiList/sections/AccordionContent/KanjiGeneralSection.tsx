import { useKanjiInfo } from "@/providers/kanji-worker-provider";

import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@radix-ui/react-select";
import { RomajiBadge } from "@/components/common/RomajiBadge";

const externalLinks: { name: string; url: (x: string) => string }[] = [
  {
    name: "Wanikani",
    url: (kanji: string) => `https://www.wanikani.com/kanji/${kanji}`,
  },
  {
    name: "Kanshudo",
    url: (kanji: string) => `https://www.kanshudo.com/kanji/${kanji}`,
  },
  {
    name: "The Kanji Map",
    url: (kanji: string) => `https://thekanjimap.com/${kanji}`,
  },
  {
    name: "Kanji Alive",
    url: (kanji: string) => `https://app.kanjialive.com/${kanji}`,
  },
  {
    name: "Hochanh",
    url: (kanji: string) => `https://hochanh.github.io/rtk/${kanji}/index.html`,
  },
  { name: "JPDB", url: (kanji: string) => `https://jpdb.io/kanji/${kanji}#a` },
  {
    name: "Jisho",
    url: (kanji: string) => `https://jisho.org/search/${kanji}%20%23kanji`,
  },
  {
    name: "Kai Kanji Api",
    url: (kanji: string) => `https://kai.kanjiapi.dev/#!/${kanji}`,
  },
  {
    name: "Jotoba",
    url: (kanji: string) => `https://jotoba.de/search/1/${kanji}?l=en-US`,
  },
  {
    name: "Kanji Garden",
    url: (kanji: string) => `https://kanji.garden/kanji?kanji=${kanji}`,
  },
];

const hasData = (data?: number) => data != null && data !== -1;

export const KanjiGeneralSection = ({ kanji }: { kanji: string }) => {
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
          <Badge className="mx-1">Grade {data.jouyouGrade}</Badge>
        )}
        {hasData(data.strokes) && (
          <Badge className="mx-1">Strokes {data.strokes}</Badge>
        )}
        {hasData(data.wk) && <Badge className="mx-1">Wanikani {data.wk}</Badge>}
        {hasData(data.rtk) && <Badge className="mx-1">RTK {data.rtk}</Badge>}
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
                <a
                  className="underline hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md p-1 mx-1"
                  href={item.url(kanji)}
                  target="_blank"
                  rel="noreferrer"
                >
                  {item.name}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};
