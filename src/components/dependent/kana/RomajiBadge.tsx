import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { translateValue } from "@/lib/wanakana-adapter";

export const RomajiBadge = ({ kana }: { kana: string }) => {
  const [isKana, setIsKana] = useState(true);

  const content = isKana ? kana : translateValue(kana, "romaji");
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
