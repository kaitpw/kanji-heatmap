import { Grid2X2, Grid3X3, Search } from "lucide-react";
import { Input } from "../../ui/input";
import { useState } from "react";
import {
  RadioButton,
  RadioButtonGroupDiv,
} from "../../common/RadioButtonGroup";
import BasicSelect from "@/components/common/BasicSelect";

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

export function SelectFrequencySource({ className }: { className?: string }) {
  const [value, setValue] = useState("netflix");

  return (
    <BasicSelect
      value={value}
      onChange={(newValue) => setValue(newValue)}
      triggerCN={`absolute right-1 top-1 w-28 h-7 bg-gray-100 dark:bg-gray-900 ${className}`}
      options={[
        { value: "netflix", label: "Netflix" },
        { value: "twitter", label: "Twitter" },
        { value: "newspaper", label: "Newspaper" },
      ]}
      srOnlyLabel="Frequency Rank Source for Kanji Card Background Color Intensity Meaning"
    />
  );
}

const RadioGroup = () => {
  const [state, setState] = useState<"compact" | "expanded">("compact");

  const onClick = () =>
    setState((s) => (s === "compact" ? "expanded" : "compact"));

  return (
    <RadioButtonGroupDiv>
      <RadioButton
        onClick={onClick}
        active={state === "compact"}
        srOnlyText="Compact Kanji Card"
        hoverText="Compact Cards"
      >
        <Grid3X3 size={15} />
      </RadioButton>
      <RadioButton
        onClick={onClick}
        active={state === "expanded"}
        srOnlyText="View Expanded Kanji Card"
        hoverText="Expanded Cards"
      >
        <Grid2X2 size={15} />
      </RadioButton>
    </RadioButtonGroupDiv>
  );
};

const SearchInput = () => {
  return (
    <section className="w-full relative">
      <Input className="pl-7 pr-32 h-9" placeholder="Search..." />
      <Search className="pointer-events-none absolute left-2 top-2 size-4 translate-y-0.5 select-none opacity-50" />
      <SelectSearchInputType />
    </section>
  );
};

const FrequencySourceInput = () => {
  return (
    <section className="m-0 py-0 h-9 w-full rounded-md text-sm flex items-center md:justify-end relative border-input pr-32 border border-dashed">
      <span className="px-2">Less</span>
      <span
        className="w-full md:w-16 h-2 rounded-md"
        style={{
          background:
            "linear-gradient(90deg, hsl(107 100% 50%) 0%, hsl(107 100% 11%) 100%)",
        }}
      />
      <span className="px-2">More</span>
      <SelectFrequencySource className="top-0.75 right-1" />
    </section>
  );
};

const ControlBar = () => {
  return (
    <section className="mx-auto max-w-screen-xl flex flex-col md:flex-row border-0 space-y-1 md:space-y-0 md:space-x-1">
      <SearchInput />
      <div className="w-full relative flex flex-col sm:flex-row space-x-1 m-0 p-0 space-y-1 md:space-y-0">
        <FrequencySourceInput />
        <RadioGroup />
      </div>
    </section>
  );
};

export default ControlBar;
