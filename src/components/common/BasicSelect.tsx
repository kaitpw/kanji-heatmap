import { ReactNode, useId } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Label } from "../ui/label";

const BasicSelect = ({
  value,
  onChange,
  triggerCN,
  options,
  srOnlyLabel,
}: {
  value: string;
  onChange: (value: string) => void;
  triggerCN?: string;
  options: { label: ReactNode; value: string; disabled?: boolean }[];
  srOnlyLabel: string;
}) => {
  const id = useId();

  // <Label /> component used to accessibility
  // https://www.radix-ui.com/primitives/docs/components/select#labelling
  return (
    <>
      <Label className="sr-only" htmlFor={`select-${id}`}>
        {srOnlyLabel}
      </Label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className={triggerCN} id={`select-${id}`}>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {options.map((option) => {
              return (
                <SelectItem
                  key={option.value}
                  value={option.value}
                  disabled={option.disabled}
                >
                  {option.label}
                </SelectItem>
              );
            })}
          </SelectGroup>
        </SelectContent>
      </Select>
    </>
  );
};

export default BasicSelect;
