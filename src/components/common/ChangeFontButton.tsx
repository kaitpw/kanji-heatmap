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
        <Button className="font-bold text-lg" variant={"outline"}>
          字
        </Button>
      </HoverCardTrigger>
      <HoverCardContent className="p-2 w-32 uppercase text-xs">
        Change Font
      </HoverCardContent>
    </HoverCard>
  );
};

export default ChangeFontButton;
