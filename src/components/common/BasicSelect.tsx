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
  options,
  triggerCN,
  selectItemCNFunc,
  label,
  isLabelSrOnly,
}: {
  value: string;
  onChange: (value: string) => void;
  triggerCN?: string;
  selectItemCNFunc?: (v: string) => string;
  options: { label: ReactNode; value: string; disabled?: boolean }[];
  label: string;
  isLabelSrOnly?: boolean;
}) => {
  const id = useId();

  // <Label /> component used to accessibility
  // https://www.radix-ui.com/primitives/docs/components/select#labelling
  return (
    <>
      <Label
        className={
          isLabelSrOnly ? "sr-only text-xs font-normal" : "text-xs font-normal"
        }
        htmlFor={`select-${id}`}
      >
        {label}
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
                  className={selectItemCNFunc?.(option.value)}
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
