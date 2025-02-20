import { useId, useState } from "react";

import { Label } from "@/components/ui/label";
import { MultiSelect } from "@/components/ui/multi-select";

const JLPTOptions = [
  { value: "n1", label: "N1" },
  { value: "n2", label: "N2" },
  { value: "n3", label: "N3" },
  { value: "n4", label: "N4" },
  { value: "n5", label: "N5" },
];

export function JLPTSelector() {
  const [selectedJLPT, setSelectedJLPT] = useState<string[]>([
    "n1",
    "n2",
    "n3",
    "n4",
    "n5",
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
        options={JLPTOptions}
        onValueChange={setSelectedJLPT}
        defaultValue={selectedJLPT}
        placeholder="All JLPT levels are selected by default"
        variant="inverted"
        maxCount={3}
      />
    </div>
  );
}
