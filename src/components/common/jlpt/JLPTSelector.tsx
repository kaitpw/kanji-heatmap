import { useId } from "react";
import { JLPTOptions, JLTPTtypes } from "@/lib/jlpt";
import { Label } from "@/components/ui/label";
import { MultiSelect } from "@/components/ui/multi-select";

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

export function JLPTSelector({
  selectedJLPT,
  setSelectedJLPT,
}: {
  selectedJLPT: JLTPTtypes[];
  setSelectedJLPT: (v: JLTPTtypes[]) => void;
}) {
  const id = useId();
  const fieldId = `jlpt-multiselect-${id}`;
  return (
    <div>
      <Label className="text-xs font-thin" htmlFor={fieldId}>
        JLPT
      </Label>
      <MultiSelect
        name={fieldId}
        options={JLPTOptionsWithIcon}
        onValueChange={setSelectedJLPT as (v: string[]) => void}
        value={selectedJLPT}
        placeholder="All levels selected"
        variant="inverted"
        maxCount={JLPTOptionsWithIcon.length}
      />
    </div>
  );
}
