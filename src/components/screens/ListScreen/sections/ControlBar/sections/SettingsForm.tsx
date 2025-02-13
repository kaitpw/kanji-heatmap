import { ReactNode, useId, useState } from "react";

import BasicSelect from "../../../../../common/BasicSelect";
import { Badge } from "@/components/ui/badge";
import { DualRangeSlider } from "@/components/ui/dual-range-slider";
import { Label } from "@/components/ui/label";

import {
  ArrowDownNarrowWide,
  Cat,
  Dog,
  FilterX,
  Fish,
  Rabbit,
  Turtle,
} from "lucide-react";
import { MultiSelect } from "@/components/ui/multi-select";
import { Button } from "@/components/ui/button";

const frameworksList = [
  { value: "react", label: "React", icon: Turtle },
  { value: "angular", label: "Angular", icon: Cat },
  { value: "vue", label: "Vue", icon: Dog },
  { value: "svelte", label: "Svelte", icon: Rabbit },
  { value: "ember", label: "Ember", icon: Fish },
];

function FrameWorkSelector() {
  const [selectedFrameworks, setSelectedFrameworks] = useState<string[]>([
    "react",
    "angular",
  ]);
  const id = useId();
  const fieldId = `multiselectframework-${id}`;

  return (
    <div className="max-w-xl">
      <Label className="text-xs font-thin" htmlFor={fieldId}>
        JLPT
      </Label>
      <MultiSelect
        name={fieldId}
        options={frameworksList}
        onValueChange={setSelectedFrameworks}
        defaultValue={selectedFrameworks}
        placeholder="Select frameworks"
        variant="inverted"
        maxCount={3}
      />
    </div>
  );
}

export function DummySelect() {
  const [value, setValue] = useState("meaning");

  return (
    <BasicSelect
      value={value}
      onChange={(newValue) => setValue(newValue)}
      triggerCN={"h-8 w-full"}
      options={[
        { value: "meaning", label: "Meaning" },
        { value: "onyomi", label: "Onyomi", disabled: true },
        { value: "kunyomi", label: "Kunyomi" },
      ]}
      srOnlyLabel="Dummy Select"
    />
  );
}

const UppercaseHeading = ({
  title,
  icon,
}: {
  title: string;
  icon: ReactNode;
}) => {
  return (
    <h1 className="mb-3 text-md font-bold flex items-center border-b w-full border-dotted ">
      {icon} <span className="pl-1">{title}</span>
    </h1>
  );
};

const SortOrderSection = () => {
  return (
    <section className="flex items-start flex-col mt-2 w-full">
      <UppercaseHeading
        title="Sort Order ***"
        icon={<ArrowDownNarrowWide size={15} />}
      />
      <section className="flex flex-col space-y-1 md:space-y-0  md:flex-row md:space-x-1 mt-2 w-full">
        <div className="text-left  md:w-1/3">
          <div className="text-xs">Primary</div>
          <DummySelect />
        </div>
        <div className="text-left md:w-1/3">
          <div className="text-xs">Secondary</div>
          <DummySelect />
        </div>
        <div className="text-left md:w-1/3">
          <div className="text-xs">Tertiary</div>
          <DummySelect />
        </div>
      </section>
      <div className="text-xs flex mt-3 flex-wrap space-y-1 items-center justify-center">
        <div>***</div>
        <div className="mx-2">Order By</div>
        <Badge>JLPT</Badge>
        <div className="mx-2">Then By</div>
        <Badge>Netflix Frequency Rank</Badge>
        <div className="mx-2">Then By</div>
        <Badge>Stroke Count</Badge>
      </div>
    </section>
  );
};

const FrequencyRankingRangeField = () => {
  const [values, setValues] = useState([0, 1000]);
  const id = useId();
  const fieldId = `strokecountfilter-${id}`;

  return (
    <div className="w-full">
      <Label className="text-xs font-thin" htmlFor={fieldId}>
        Frequency Ranking
      </Label>
      <DualRangeSlider
        id={fieldId}
        label={(value) => value}
        labelPosition="bottom"
        className="text-xs pt-2"
        value={values}
        onValueChange={setValues}
        min={0}
        max={2500}
        step={1}
      />
    </div>
  );
};

const StrokeCountField = () => {
  const [values, setValues] = useState([0, 1000]);
  const id = useId();
  const fieldId = `strokecountfilter-${id}`;

  return (
    <div className="w-full">
      <Label className="text-xs font-thin" htmlFor={fieldId}>
        Stroke Count
      </Label>
      <DualRangeSlider
        id={fieldId}
        label={(value) => value}
        labelPosition="bottom"
        className="text-xs pt-2"
        value={values}
        onValueChange={setValues}
        min={0}
        max={2500}
        step={1}
      />
    </div>
  );
};

const FilterSection = () => {
  return (
    <section className="text-start w-full">
      <UppercaseHeading title="Filters" icon={<FilterX size={15} />} />

      <div className="flex w-full flex-col md:flex-row md:space-x-4">
        <div className="w-full md:w-1/2 pb-8">
          <StrokeCountField />
        </div>
        <div className="w-full md:w-1/2">
          <FrameWorkSelector />
        </div>
      </div>
      <div className="py-2 mt-4 md:mt-0 uppercase text-xs">
        Frequency Ranking
      </div>
      <div className="flex w-full flex-col md:flex-row md:space-x-4">
        <div className="w-full md:w-1/2">
          <div className="text-left w-full pb-4 md:pb-0">
            <div className="text-xs">Data Source</div>
            <DummySelect />
          </div>
        </div>

        <div className="w-full md:w-1/2 pb-8">
          <FrequencyRankingRangeField />
        </div>
      </div>
    </section>
  );
};

const SettingsForm = () => {
  return (
    <section className="flex flex-col items-start justify-start w-full">
      <form className="w-full flex flex-col space-y-4">
        <SortOrderSection />
        <FilterSection />
        <div className="flex w-full justify-end">
          A total of<span className="font-extrabold mx-1">146</span> Kanji
          Characters match your filters
        </div>
        <div className="flex justify-end space-x-1 border-t pt-3">
          <Button variant={"secondary"}>Reset</Button>
          <Button>Apply</Button>
        </div>
      </form>
    </section>
  );
};

export default SettingsForm;
