import { ReactNode, useState } from "react";
import BasicSelect from "@/components/common/BasicSelect";
import { FREQUENCY_RANK_FILTER_OPTIONS } from "../../../../../../lib/frequency-rank";

export function FrequencyRankDataSource() {
  const [value, setValue] = useState(FREQUENCY_RANK_FILTER_OPTIONS[0].value);

  return (
    <BasicSelect
      value={value}
      onChange={(newValue) => setValue(newValue)}
      triggerCN={"h-8 w-full"}
      options={FREQUENCY_RANK_FILTER_OPTIONS}
      srOnlyLabel="Frequency Data Source"
    />
  );
}

export const UppercaseHeading = ({
  title,
  icon,
}: {
  title: string;
  icon: ReactNode;
}) => {
  return (
    <h1 className="mb-3 text-md font-bold flex items-center border-b w-full border-dotted ">
      {icon} <span className="pl-1">{title}</span>
    </h1>
  );
};
