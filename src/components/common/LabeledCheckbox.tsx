import { useId } from "react";
import { Checkbox } from "@/components/ui/checkbox";

export const LabeledCheckbox = ({
  label,
  value,
  onChange,
}: {
  label: string;
  value: boolean;
  onChange: (v: boolean) => void;
}) => {
  const checkboxId = useId();
  const myId = `checkbox-${checkboxId}`;
  return (
    <div className="flex items-start space-x-2">
      <Checkbox
        id={myId}
        checked={value}
        onClick={() => {
          onChange(!value);
        }}
      />
      <label
        htmlFor={myId}
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        {label}
      </label>
    </div>
  );
};
