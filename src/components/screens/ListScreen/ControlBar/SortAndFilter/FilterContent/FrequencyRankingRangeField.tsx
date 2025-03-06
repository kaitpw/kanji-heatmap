import { useId } from "react";
import { DualRangeSlider } from "@/components/ui/dual-range-slider";
import { Label } from "@/components/ui/label";
import { MAX_FREQ_RANK } from "@/lib/constants";

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
        min={1}
        max={MAX_FREQ_RANK}
        step={50}
      />
    </div>
  );
};
