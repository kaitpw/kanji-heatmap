import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Button } from "@/components/ui/button";

const ChangeFontButton = () => {
  return (
    <HoverCard openDelay={0}>
      <HoverCardTrigger asChild>
        <Button className="font-bold h-7 px-2" variant={"secondary"}>
          文字
        </Button>
      </HoverCardTrigger>
      <HoverCardContent className="p-2 w-32 text-xs">
        Change Kanji Font
      </HoverCardContent>
    </HoverCard>
  );
};

export default ChangeFontButton;
