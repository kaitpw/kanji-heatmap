import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@radix-ui/react-hover-card";
import { Flower } from "lucide-react";

const CardPresentationSettingsContent = () => {
  return (
    <section>
      <h1>Card Presentation</h1>
    </section>
  );
};

const CardPresentationSettings = () => {
  return (
    <HoverCard openDelay={0} closeDelay={0}>
      <HoverCardTrigger asChild>
        <Button variant="outline" size="icon" className="h-9 w-9">
          <Flower />
          <span className="sr-only">Card Presentation Settings</span>
        </Button>
      </HoverCardTrigger>
      <HoverCardContent className="p-2 w-32 text-xs">
        <CardPresentationSettingsContent />
      </HoverCardContent>
    </HoverCard>
  );
};

export default CardPresentationSettings;
