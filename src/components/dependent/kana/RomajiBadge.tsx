import { Badge } from "@/components/ui/badge";
import { useSpeak } from "@/hooks/use-jp-speak";

export const RomajiBadge = ({ kana }: { kana: string }) => {
  const { speak, isLoading } = useSpeak(kana);

  return (
    <Badge
      variant={"outline"}
      className={"m-1 cursor-pointer text-lg kanji-font hover:bg-[#2effff] hover:text-black"}
      onClick={(e) => {
        e.preventDefault();
        speak();
      }}
    >
      {kana}
    </Badge>
  );
};
