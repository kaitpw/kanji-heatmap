import type { GeneralKanjiItem } from "@/lib/kanji/kanji-info-types";
import type { ReactNode } from "react";

import { DefaultErrorFallback } from "@/components/error";

import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { DottedSeparator } from "@/components/ui/dotted-separator";

import { BasicLoading } from "@/components/common/BasicLoading";
import { ExternalKanjiLinks } from "@/components/common/ExternalKanjiLinks";

import { RomajiBadge } from "@/components/dependent/kana/RomajiBadge";

const TableCellFixed = ({ children }: { children: ReactNode }) => (
  <TableCell className="w-24 sm:w-32 p-2">{children}</TableCell>
);

const TableCellGrow = ({ children }: { children: ReactNode }) => (
  <TableCell className="p-2">{children}</TableCell>
);

export const General = ({
  kanji,
  generalInfo,
}: {
  kanji: string;
  generalInfo: {
    status: string;
    data?: unknown;
    error?: { message: string } | null | undefined;
  };
}) => {
  if (generalInfo.error) {
    return <DefaultErrorFallback message="Failed to load data." />;
  }

  if (generalInfo.data == null) {
    return <BasicLoading />;
  }

  const data = generalInfo.data as GeneralKanjiItem;

  return (
    <>
      <ExternalKanjiLinks kanji={kanji} />
      <DottedSeparator className="border-b-2 mt-4" />
      <Table>
        <TableBody>
          <TableRow className="text-left">
            <TableCellFixed>Meanings</TableCellFixed>
            <TableCellGrow>
              {data.meanings.map((meaning) => {
                return (
                  <Badge key={meaning} variant={"outline"} className="m-1">
                    {meaning}
                  </Badge>
                );
              })}

              {data.meanings.length === 0 && <div>-</div>}
            </TableCellGrow>
          </TableRow>
          <TableRow className="text-left">
            <TableCellFixed>Kun Readings</TableCellFixed>
            <TableCellGrow>
              {data.allKun.map((kun) => {
                return <RomajiBadge key={kun} kana={kun} />;
              })}
              {data.allKun.length === 0 && <div>-</div>}
            </TableCellGrow>
          </TableRow>
          <TableRow className="text-left">
            <TableCellFixed>On Readings</TableCellFixed>
            <TableCellGrow>
              {data.allOn.map((on) => {
                return <RomajiBadge key={on} kana={on} />;
              })}
              {data.allOn.length === 0 && <div>-</div>}
            </TableCellGrow>
          </TableRow>
        </TableBody>
      </Table>
    </>
  );
};
