import { ReactNode } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const BasicSelect = ({
  value,
  onChange,
  triggerCN,
  options,
}: {
  value: string;
  onChange: (value: string) => void;
  triggerCN?: string;
  options: { label: ReactNode; value: string }[];
}) => {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className={triggerCN}>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {options.map((option) => {
            return (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            );
          })}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default BasicSelect;
