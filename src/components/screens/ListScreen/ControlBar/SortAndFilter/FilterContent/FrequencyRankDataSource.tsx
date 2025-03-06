import React from "react";
import BasicSelect from "@/components/common/BasicSelect";
import {
  FREQUENCY_RANK_FILTER_OPTIONS,
  FREQ_RANK_SOURCES_INFO,
} from "@/lib/frequency-rank";

export function FrequencyRankDataSource({
  value,
  setValue,
}: {
  value: string;
  setValue: (v: string) => void;
}) {
  const sourceInfo = FREQ_RANK_SOURCES_INFO[value];
  return (
    <>
      <BasicSelect
        value={value}
        onChange={(newValue) => setValue(newValue)}
        triggerCN={"h-8 w-full"}
        options={FREQUENCY_RANK_FILTER_OPTIONS}
        label="Frequency Data Source"
        isLabelSrOnly={true}
      />
      {value !== "None" && sourceInfo?.description && (
        <div className="text-sm mt-3">
          *{sourceInfo.description}.
          {sourceInfo.links && sourceInfo.links.length > 0 && (
            <>
              {" "}
              See related links: [
              {sourceInfo.links.map((link, index) => {
                return (
                  <React.Fragment key={link}>
                    <a href={link} className="underline mx-1 bold">
                      {index + 1}
                    </a>
                    {index + 1 !== sourceInfo.links.length && ","}
                  </React.Fragment>
                );
              })}
              ]
            </>
          )}
        </div>
      )}
    </>
  );
}
