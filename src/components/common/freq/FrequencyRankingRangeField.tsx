import { useId } from "react";
import { MAX_FREQ_RANK } from "@/lib/constants";

import { DualRangeSlider } from "@/components/ui/dual-range-slider";
import { Label } from "@/components/ui/label";

const FREQ_RANK_STEP = 50;

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
        onValueChange={(vals) => {
          // we don't want the start to be 0, but want steps to be 50, 100, 150 and not 51, 101, 150
          // that's why we can't set min=1, and we'll rely on this logic instead
          const min = vals[0] ? (vals[0] === 0 ? 1 : vals[0]) : 1;
          const max = vals[1] ? (vals[1] === 0 ? 1 : vals[1]) : MAX_FREQ_RANK;
          setValues([min, max]);
        }}
        min={0}
        max={MAX_FREQ_RANK}
        step={FREQ_RANK_STEP}
      />
    </div>
  );
};
