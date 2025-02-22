import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Flower } from "lucide-react";
import { useState, useId, ReactNode } from "react";
import { FrequencyRankDataSource } from "../SortAndFilterSettings/sections/common";
import { BackgroundColorGradient, H2, JLPTBordersMeanings } from "./common";

const CardTypeSwitch = () => {
  const switchId = useId();
  return (
    <div className="flex items-center space-x-2 my-2">
      <Label>Compact</Label>
      <Switch id={`cardType-${switchId}`} />
      <Label htmlFor={`cardType-${switchId}`}>Expanded</Label>
    </div>
  );
};

const LabeledCheckbox = ({ label }: { label: string }) => {
  const checkboxId = useId();
  const myId = `checkbox-${checkboxId}`;
  return (
    <div className="flex items-center space-x-2">
      <Checkbox id={myId} checked={true} />
      <label
        htmlFor={myId}
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        {label}
      </label>
    </div>
  );
};

/*

cardSettings = {
	cardType: 'expanded'
	borderMeaning: 'jlpt' | null
	backgroundMeaning: 'freq-netflix' | null
}
*/

export const CardPresentationSettingsContent = () => {
  return (
    <article className="text-left">
      <h1 className="text-lg font-bold flex space-x-2 items-center">
        Item Presentation Settings
      </h1>
      <Separator className="mb-2" />
      <section>
        <H2>Card Type</H2>
        <CardTypeSwitch />
      </section>
      <section>
        <H2>Border Color Meaning</H2>
        <LabeledCheckbox label="Attach Border Meaning" />
        <JLPTBordersMeanings />
      </section>
      <section>
        <H2>Background Color Meaning</H2>
        <LabeledCheckbox label="Attach Background Color Meaning" />
        <BackgroundColorGradient />
        <p className="text-xs mt-3">Frequency Data Source*</p>
        <FrequencyRankDataSource />
        <div className="text-xs mt-2">
          * Netflix Frequency is based on the list by OhTalkWho オタク.{" "}
          <span className="underline">See Source.</span>
        </div>
      </section>
    </article>
  );
};

const CardPresentationSettings = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Popover
      open={isOpen}
      onOpenChange={(newState) => {
        setIsOpen(newState);
      }}
    >
      <PopoverTrigger
        onMouseEnter={() => {
          setIsOpen(true);
        }}
        asChild
      >
        <Button variant="outline" size="icon" className="h-9 w-9">
          <Flower />
          <span className="sr-only">Card Presentation Settings</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="mx-4 -translate-y-1 max-h-[80svh] overflow-y-auto overflow-x-hidden">
        {children}
      </PopoverContent>
    </Popover>
  );
};

export default CardPresentationSettings;
