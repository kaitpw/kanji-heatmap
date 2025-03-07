import React, { ReactNode } from "react";
import {
  FREQ_RANK_SOURCES_INFO,
  FrequencyType,
  SortKey,
} from "@/lib/frequency-rank";
import { ExternalTextLink } from "./ExternalTextLink";

export const FreqRankTypeInfo = ({
  value,
  defaultValue,
}: {
  value: SortKey;
  defaultValue?: ReactNode;
}) => {
  const sourceInfo = FREQ_RANK_SOURCES_INFO[value as FrequencyType];

  const hasValue = value !== "None" && sourceInfo?.description;

  if (!hasValue) {
    return <>{defaultValue}</>;
  }
  return (
    <div className="text-sm mt-3">
      *{sourceInfo.description}.
      {sourceInfo.links && sourceInfo.links.length > 0 && (
        <>
          {" "}
          See related links: [
          {sourceInfo.links.map((link, index) => {
            return (
              <React.Fragment key={link}>
                <ExternalTextLink href={link} text={`${index + 1}`} />
                {index + 1 !== sourceInfo.links.length && ","}
              </React.Fragment>
            );
          })}
          ]
        </>
      )}
    </div>
  );
};
