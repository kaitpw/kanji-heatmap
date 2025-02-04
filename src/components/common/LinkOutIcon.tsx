import { ReactNode } from "react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Button } from "../ui/button";

const LinkOutIcon = ({
  href,
  hoverText,
  srOnlyText,
  icon,
}: {
  href: string;
  hoverText: string;
  srOnlyText: string;
  icon: ReactNode;
}) => {
  return (
    <HoverCard openDelay={0} closeDelay={100}>
      <HoverCardTrigger asChild>
        <Button asChild variant="outline" className="h-8 w-8" size={"icon"}>
          <a href={href} target="_blank" rel="noreferrer">
            {icon}
            <span className="sr-only">{srOnlyText}</span>
          </a>
        </Button>
      </HoverCardTrigger>
      <HoverCardContent className="p-2 w-32 text-xs mx-2">
        {hoverText}
      </HoverCardContent>
    </HoverCard>
  );
};

export default LinkOutIcon;
