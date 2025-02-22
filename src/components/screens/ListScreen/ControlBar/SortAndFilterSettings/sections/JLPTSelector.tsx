import { useId, useState } from "react";

import { Label } from "@/components/ui/label";
import { MultiSelect } from "@/components/ui/multi-select";
import { JLTPTtypes, JLPTListItems, JLPTOptions } from "@/lib/constants";

const JLPTOptionsWithIcon = JLPTOptions.map((entry) => {
  return {
    label: entry.label,
    value: entry.value,
    iconNode: (
      <div
        className={`h-2 w-2 -translate-y-[1px] rounded-sm mx-1 ${entry.cn}`}
      />
    ),
  };
});
export function JLPTSelector() {
  const [selectedJLPT, setSelectedJLPT] = useState<JLTPTtypes[]>(
    Object.keys(JLPTListItems) as JLTPTtypes[]
  );
  const id = useId();
  const fieldId = `multiselectframework-${id}`;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onValueChange = setSelectedJLPT as any;
  return (
    <div className="max-w-xl">
      <Label className="text-xs font-thin" htmlFor={fieldId}>
        JLPT
      </Label>
      <MultiSelect
        name={fieldId}
        options={JLPTOptionsWithIcon}
        onValueChange={onValueChange}
        defaultValue={selectedJLPT}
        placeholder="All JLPT levels are selected by default"
        variant="inverted"
        maxCount={6}
      />
    </div>
  );
}
