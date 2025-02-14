import { Flower, Search } from "lucide-react";
import { Input } from "../../../../ui/input";
import { useState } from "react";
import BasicSelect from "@/components/common/BasicSelect";
import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import SortAndFilterSettings from "./sections/SortAndFilterSettings";

export function SelectSearchInputType({ className }: { className?: string }) {
  const [value, setValue] = useState("meaning");

  return (
    <BasicSelect
      value={value}
      onChange={(newValue) => setValue(newValue)}
      triggerCN={`absolute right-1 top-1 w-28 h-7 bg-gray-100 dark:bg-gray-900 ${className}`}
      options={[
        { value: "meaning", label: "Meaning" },
        { value: "onyomi", label: "Onyomi", disabled: true },
        { value: "kunyomi", label: "Kunyomi" },
      ]}
      srOnlyLabel="Search Type"
    />
  );
}

const SearchInput = () => {
  return (
    <section className="w-full relative">
      <Input className="pl-7 pr-32 h-9" placeholder="Search..." />
      <Search className="pointer-events-none absolute left-2 top-2 size-4 translate-y-0.5 select-none opacity-50" />
      <SelectSearchInputType />
    </section>
  );
};

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
const ControlBar = () => {
  return (
    <section className="mx-auto max-w-screen-xl flex border-0 space-x-1 sticky">
      <SearchInput />
      <SortAndFilterSettings />
      <CardPresentationSettings />
    </section>
  );
};

export default ControlBar;
