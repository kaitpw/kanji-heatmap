import { ReactNode, useId } from "react";

import { DualRangeSlider } from "@/components/ui/dual-range-slider";
import { Label } from "@/components/ui/label";
import { FilterX } from "lucide-react";
import { UppercaseHeading } from "./sections/common";
import { KANJI_COUNT, MAX_STROKE_COUNT } from "@/lib/constants";

export const FrequencyRankingRangeField = ({
  values,
  setValues,
}: {
  values: [min: number, max: number];
  setValues: (val: [min: number, max: number]) => void;
}) => {
  const id = useId();
  const fieldId = `frequency-rank-range-${id}`;

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
        max={KANJI_COUNT}
        step={50}
      />
    </div>
  );
};

export const StrokeCountField = ({
  values,
  setValues,
}: {
  values: [min: number, max: number];
  setValues: (val: [min: number, max: number]) => void;
}) => {
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
        max={MAX_STROKE_COUNT}
        step={1}
      />
    </div>
  );
};

export const FilterSectionLayout = ({
  jlptField,
  strokeCountField,
  freqRankRangeField,
  freqRankSourceField,
}: {
  jlptField: ReactNode;
  strokeCountField: ReactNode;
  freqRankSourceField: ReactNode;
  freqRankRangeField: ReactNode;
}) => {
  return (
    <section className="text-start w-full">
      <UppercaseHeading title="Filters" icon={<FilterX size={15} />} />
      <div className="flex w-full flex-col md:flex-row md:space-x-4">
        <div className="w-full md:w-1/2 pb-8">{strokeCountField}</div>
        <div className="w-full md:w-1/2">{jlptField}</div>
      </div>
      <div className="py-2 mt-4 md:mt-0 uppercase text-xs">
        Frequency Ranking
      </div>
      <div className="flex w-full flex-col md:flex-row md:space-x-4">
        <div className="w-full md:w-1/2">
          <div className="text-left w-full pb-4 md:pb-0">
            <div className="text-xs">Data Source</div>
            {freqRankSourceField}
          </div>
        </div>
        <div className="w-full md:w-1/2 pb-8">{freqRankRangeField}</div>
      </div>
    </section>
  );
};
