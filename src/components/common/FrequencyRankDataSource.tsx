import BasicSelect from "@/components/common/BasicSelect";
import {
  FREQ_RANK_SOURCES_INFO,
  FREQUENCY_RANK_FILTER_OPTIONS,
  FrequencyType,
} from "@/lib/frequency-rank";
import { FreqRankTypeInfo } from "./FreqRankTypeInfo";
import { Combobox } from "./Combobox";

export function FrequencyRankDataSource({
  value,
  setValue,
}: {
  value: FrequencyType;
  setValue: (v: FrequencyType) => void;
}) {
  return (
    <>
      <Combobox
        value={value}
        setValue={(newValue) => setValue(newValue as FrequencyType)}
        options={FREQUENCY_RANK_FILTER_OPTIONS.map((option) => {
          const description =
            FREQ_RANK_SOURCES_INFO[option.value as FrequencyType]?.description;
          return {
            ...option,
            description,
          };
        })}
      />
      <FreqRankTypeInfo value={value} />
    </>
  );
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
