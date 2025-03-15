import BasicSelect from "@/components/common/BasicSelect";
import { FREQUENCY_RANK_FILTER_OPTIONS } from "@/lib/sort-freq-select-options";
import { FreqRankTypeInfo } from "./FreqRankTypeInfo";
import { Combobox } from "./Combobox";
import { FrequencyType } from "@/lib/sort-freq-types";
import { FREQ_RANK_SOURCES_INFO } from "@/lib/freq-source-info";

export function FrequencyRankDataSource({
  value,
  setValue,
  type = "basic-select",
}: {
  value: FrequencyType;
  setValue: (v: FrequencyType) => void;
  type?: "basic-select" | "combo-box";
}) {
  if (type == "basic-select") {
    return (
      <>
        <BasicSelect
          value={value}
          onChange={(newValue) => setValue(newValue as FrequencyType)}
          triggerCN={"h-8 w-full"}
          options={FREQUENCY_RANK_FILTER_OPTIONS.map((item) => {
            return {
              ...item,
              description:
                FREQ_RANK_SOURCES_INFO[item.value as FrequencyType]
                  ?.description,
            };
          })}
          label="Frequency Data Source"
          isLabelSrOnly={false}
        />
        <FreqRankTypeInfo value={value} defaultValue={null} />
      </>
    );
  }
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
      <FreqRankTypeInfo value={value} defaultValue={null} />
    </>
  );
}
