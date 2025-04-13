import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Button } from "@/components/ui/button";
import { useChangeFont } from "@/hooks/use-change-font";

const ChangeFontButton = () => {
  const nextFont = useChangeFont();

  return (
    <HoverCard openDelay={0}>
      <HoverCardTrigger asChild>
        <Button
          className="h-7 px-2 kanji-font rounded-lg"
          variant={"secondary"}
          onClick={nextFont}
        >
          字体
        </Button>
      </HoverCardTrigger>
      <HoverCardContent className="p-2 w-32 text-xs">
        Change Kanji Font
      </HoverCardContent>
    </HoverCard>
  );
};

export default ChangeFontButton;
