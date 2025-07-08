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
          type="button"
          className="h-7 px-2 kanji-font background-theme-color-with-opacity-100 rounded-lg text-white"
          onClick={nextColor}
        >
          色
        </button>
      </HoverCardTrigger>
      <HoverCardContent className="p-2 w-32 text-xs">
        Change Item Color
      </HoverCardContent>
    </HoverCard>
  );
};
