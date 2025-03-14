import React, { ReactNode } from "react";
import { ExternalTextLink } from "./ExternalTextLink";
import { FrequencyType, SortKey } from "@/lib/sort-freq-types";
import { FREQ_RANK_SOURCES_INFO } from "@/lib/freq-source-info";

export const FreqRankTypeInfo = ({
  value,
  defaultValue = <div className="text-xs">🐛💔🪲 Description Unavailable.</div>,
}: {
  value: SortKey;
  defaultValue?: ReactNode;
}) => {
  const sourceInfo = FREQ_RANK_SOURCES_INFO[value as FrequencyType];
  const hasValue = value !== "none" && sourceInfo?.description;

  if (hasValue) {
    return defaultValue;
  }
  return (
    <div className="text-xs mt-1 text-left px-3">
      *{sourceInfo.description}
      {sourceInfo.links && sourceInfo.links.length > 0 && (
        <div className="my-1">
          <span className="font-extrabold">Visit related link(s): </span>[
          {sourceInfo.links.map((link, index) => {
            return (
              <React.Fragment key={link}>
                <ExternalTextLink href={link} text={`${index + 1}`} />
                {index + 1 !== sourceInfo.links.length && ","}
              </React.Fragment>
            );
          })}
          ]
        </div>
      )}
    </div>
  );
};
