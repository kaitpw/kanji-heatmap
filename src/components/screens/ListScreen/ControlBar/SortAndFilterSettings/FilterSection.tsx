import { useId, useState } from "react";

import { DualRangeSlider } from "@/components/ui/dual-range-slider";
import { Label } from "@/components/ui/label";
import { FilterX } from "lucide-react";
import { JLPTSelector } from "./sections/JLPTSelector";
import { FrequencyRankDataSource, UppercaseHeading } from "./sections/common";

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
        step={50}
      />
    </div>
  );
};

const StrokeCountField = () => {
  const [values, setValues] = useState([1, 250]);
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
        min={1}
        max={250}
        step={1}
      />
    </div>
  );
};

export const FilterSection = () => {
  return (
    <section className="text-start w-full">
      <UppercaseHeading title="Filters" icon={<FilterX size={15} />} />

      <div className="flex w-full flex-col md:flex-row md:space-x-4">
        <div className="w-full md:w-1/2 pb-8">
          <StrokeCountField />
        </div>
        <div className="w-full md:w-1/2">
          <JLPTSelector />
        </div>
      </div>
      <div className="py-2 mt-4 md:mt-0 uppercase text-xs">
        Frequency Ranking
      </div>
      <div className="flex w-full flex-col md:flex-row md:space-x-4">
        <div className="w-full md:w-1/2">
          <div className="text-left w-full pb-4 md:pb-0">
            <div className="text-xs">Data Source</div>
            <FrequencyRankDataSource />
          </div>
        </div>

        <div className="w-full md:w-1/2 pb-8">
          <FrequencyRankingRangeField />
        </div>
      </div>
    </section>
  );
};
