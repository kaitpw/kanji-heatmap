import BasicSelect from "@/components/common/BasicSelect";
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

export function DummySelect() {
  const [value, setValue] = useState("meaning");

  return (
    <BasicSelect
      value={value}
      onChange={(newValue) => setValue(newValue)}
      options={[
        { value: "meaning", label: "Meaning" },
        { value: "onyomi", label: "Onyomi", disabled: true },
        { value: "kunyomi", label: "Kunyomi" },
      ]}
      srOnlyLabel="Search Type"
    />
  );
}

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

const H2 = ({ children }: { children: ReactNode }) => (
  <h2 className="font-bold border-b-2 border-dotted mt-6 mb-2">{children}</h2>
);

const JLPTListItem = ({
  label,
  color,
  cn,
}: {
  label: string;
  color: string;
  cn: string;
}) => {
  return (
    <li className="flex justify-center items-center space-x-1 text-xs font-bold">
      <div className={`${cn} h-4 w-4 rounded-sm`}>
        <span className="sr-only">{color}</span>
      </div>
      <span>{label}</span>
    </li>
  );
};

// bg-lime-300 bg-[#fb02a8]
const FreqSquare = ({ srOnly, cn }: { srOnly: string; cn: string }) => {
  return (
    <div
      className={`${cn} bg-[#fb02a8] h-4 w-4 rounded-sm bg-opacity-0 border border-opacity-50 border-gray-500 dark:border-gray-600 dark:border-opacity-50`}
    >
      <span className="sr-only">{srOnly}</span>
    </div>
  );
};
const CardPresentationSettingsContent = () => {
  return (
    <article className="text-left">
      <h1 className="text-lg font-bold flex space-x-2 items-center">
        Card Presentation Settings
      </h1>
      <Separator className="mb-2" />
      <p className="text-sm">Control How each Kanji Card look like</p>
      <section>
        <H2>Card Type</H2>
        <CardTypeSwitch />
      </section>
      <section>
        <H2>Border Color Meaning</H2>
        <LabeledCheckbox label="Attach Border Meaning" />
        <h3 className="text-xs mt-4 mb-1 font-extrabold"> JLPT </h3>
        <ul className="flex space-x-3 mb-4 flex-wrap">
          <JLPTListItem cn="bg-lime-400" color="lime" label="N1" />
          <JLPTListItem cn="bg-pink-400" color="lime" label="N2" />
          <JLPTListItem cn="bg-blue-400" color="lime" label="N3" />
          <JLPTListItem cn="bg-yellow-400" color="lime" label="N4" />
          <JLPTListItem cn="bg-red-400" color="lime" label="N5" />
        </ul>
      </section>
      <section>
        <H2>Background Color Meaning</H2>
        <LabeledCheckbox label="Attach Background Color Meaning" />
        <div className="flex my-3 space-x-1 items-center">
          <div className="text-xs">Less</div>
          <FreqSquare srOnly={"0"} cn="bg-opacity-[0]" />
          <FreqSquare srOnly={"0.25"} cn="bg-opacity-[0.25]" />
          <FreqSquare srOnly={"0.5"} cn="bg-opacity-[0.5]" />
          <FreqSquare srOnly={"0.75"} cn="bg-opacity-[0.75]" />
          <FreqSquare srOnly={"1.00"} cn="bg-opacity-[1.0]" />
          <div className="text-xs">More</div>
        </div>
        <p className="text-xs mt-3">Frequency Data Source*</p>
        <DummySelect />
        <div className="text-xs mt-2">
          * Netflix Frequency is based on the list by OhTalkWho オタク.{" "}
          <span className="underline">See Source.</span>
        </div>
      </section>
    </article>
  );
};

const CardPresentationSettings = () => {
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
        <CardPresentationSettingsContent />
      </PopoverContent>
    </Popover>
  );
};

export default CardPresentationSettings;
