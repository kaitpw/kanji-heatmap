import { Label } from "../ui/label";
import { Combobox } from "./Combobox";

export const BasicComboBox = ({
  value,
  onChange,
  options,
  label,
}: {
  value: string;
  onChange: (value: string) => void;
  options: {
    label: string;
    value: string;
    disabled?: boolean;
    description?: string;
  }[];
  label: string;
}) => {
  return (
    <>
      <Label className={"text-xs font-normal"}>{label}</Label>
      <Combobox value={value} setValue={onChange} options={options} />
    </>
  );
};
