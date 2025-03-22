import { FREQUENCY_RANK_FILTER_OPTIONS } from "@/lib/options/options-arr";
import {
  FREQ_RANK_SOURCES_INFO,
  rankTypeLabel,
} from "@/lib/freq/freq-source-info";
import { FrequencyType } from "@/lib/options/options-types";

import BasicSelect from "../BasicSelect";
import { Combobox } from "../Combobox";
import { FreqRankTypeInfo } from "./FreqRankTypeInfo";

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
            const info = FREQ_RANK_SOURCES_INFO[item.value as FrequencyType];
            return {
              ...item,
              description: `${info.description ?? ""} ${rankTypeLabel[info.rankType]} `,
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
          const info = FREQ_RANK_SOURCES_INFO[option.value as FrequencyType];

          return {
            ...option,
            description: `${info.description ?? ""} ${rankTypeLabel[info.rankType]} `,
          };
        })}
      />
      <FreqRankTypeInfo value={value} defaultValue={null} />
    </>
  );
}
