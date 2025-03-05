import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import * as wanakana from "wanakana";

const tryConvert = (kana: string) => {
  try {
    return wanakana.toRomaji(kana);
  } catch {
    return kana;
  }
};
export const RomajiBadge = ({ kana }: { kana: string }) => {
  const [isKana, setIsKana] = useState(true);

  const content = isKana ? kana : tryConvert(kana);
  const cn = isKana ? "kanji-font" : "";
  return (
    <Badge
      variant={"outline"}
      className={`m-1 cursor-pointer text-lg ${cn}`}
      onClick={(e) => {
        setIsKana((prev) => !prev);
        e.preventDefault();
      }}
    >
      {content}
    </Badge>
  );
};
