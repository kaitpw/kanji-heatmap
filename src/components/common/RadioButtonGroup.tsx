import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@radix-ui/react-hover-card";
import { ReactNode } from "react";
import { Card } from "../ui/card";

export const RadioButtonGroupDiv = ({ children }: { children: ReactNode }) => {
  return (
    <div
      role="radio-group"
      className="inline-flex space-x-1 h-9 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground"
    >
      {children}
    </div>
  );
};

export const RadioButton = ({
  children,
  onClick,
  active,
  srOnlyText,
  hoverText,
}: {
  children: ReactNode;
  onClick: () => void;
  active: boolean;
  srOnlyText: string;
  hoverText: string;
}) => {
  return (
    <HoverCard openDelay={0} closeDelay={100}>
      <HoverCardTrigger asChild>
        <button
          type="button"
          role="radio"
          className="hover:bg-gray-200 inline-flex items-center justify-center whitespace-nowrap rounded-sm px-2 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-md"
          data-state={active ? "active" : "inactive"}
          onClick={onClick}
        >
          {children} <span className="sr-only">{srOnlyText}</span>
        </button>
      </HoverCardTrigger>
      <HoverCardContent>
        <Card className="p-2 w-32 text-xs my-1 mx-2">{hoverText}</Card>
      </HoverCardContent>
    </HoverCard>
  );
};
