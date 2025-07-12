import { Badge } from "@/components/ui/badge";
import { useSpeak } from "@/hooks/use-jp-speak";

export const RomajiBadge = ({ kana }: { kana: string }) => {
    const { speak } = useSpeak(kana);

    return (
        <Badge
            variant={"outline"}
            className={"m-1 cursor-pointer text-sm kanji-font hover:bg-[#6495ed] hover:text-black"}
            onClick={(e) => {
                e.preventDefault();
                speak();
            }}
        >
            {kana}
        </Badge>
    );
};
