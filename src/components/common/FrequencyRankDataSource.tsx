import BasicSelect from "@/components/common/BasicSelect";
import {
  FREQUENCY_RANK_FILTER_OPTIONS,
  FrequencyType,
} from "@/lib/frequency-rank";
import { FreqRankTypeInfo } from "./FreqRankTypeInfo";

export function FrequencyRankDataSource({
  value,
  setValue,
}: {
  value: FrequencyType;
  setValue: (v: FrequencyType) => void;
}) {
  return (
    <>
      <BasicSelect
        value={value}
        onChange={(newValue) => setValue(newValue as FrequencyType)}
        triggerCN={"h-8 w-full"}
        options={FREQUENCY_RANK_FILTER_OPTIONS}
        label="Frequency Data Source"
        isLabelSrOnly={true}
      />
      <FreqRankTypeInfo value={value} />
    </>
  );
}
