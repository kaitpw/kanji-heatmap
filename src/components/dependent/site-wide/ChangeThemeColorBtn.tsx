import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { useChangeThemeColor } from "@/hooks/use-change-theme-color";

export const ChangeThemeColorBtn = () => {
  const nextColor = useChangeThemeColor();

  return (
    <HoverCard openDelay={0}>
      <HoverCardTrigger asChild>
        <button
          className="font-bold h-5 w-5 border-4 rounded-full background-theme-color-with-opacity-100 my-1"
          onClick={nextColor}
        >
          <span className="sr-only">Color</span>
        </button>
      </HoverCardTrigger>
      <HoverCardContent className="p-2 w-32 text-xs">
        Change Item Color
      </HoverCardContent>
    </HoverCard>
  );
};
