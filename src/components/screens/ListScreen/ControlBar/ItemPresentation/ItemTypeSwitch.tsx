import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useId } from "react";

export const ItemTypeSwitch = ({
  value,
  setValue,
}: {
  value: boolean;
  setValue: (v: boolean) => void;
}) => {
  const switchId = useId();
  return (
    <div className="flex items-center space-x-2 my-2">
      <Label>Compact</Label>
      <Switch
        id={`itemType-${switchId}`}
        checked={value}
        onClick={() => {
          setValue(!value);
        }}
      />
      <Label htmlFor={`itemType-${switchId}`}>Expanded</Label>
    </div>
  );
};
