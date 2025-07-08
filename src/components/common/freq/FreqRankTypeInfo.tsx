import React, { ReactNode } from "react";

import { FrequencyType, SortKey } from "@/lib/options/options-types";
import {
  FREQ_RANK_SOURCES_INFO,
  rankTypeLabel,
} from "@/lib/freq/freq-source-info";

import { ExternalTextLink } from "../ExternalTextLink";

export const FreqRankTypeInfo = ({
  value,
  defaultValue = <div className="text-xs">🐛💔🪲 Description Unavailable.</div>,
}: {
  value: SortKey;
  defaultValue?: ReactNode;
}) => {
  const sourceInfo = FREQ_RANK_SOURCES_INFO[value as FrequencyType];
  const hasValue = value !== "none" && sourceInfo?.description;

  if (!hasValue) {
    return defaultValue;
  }
  return (
    <div className="text-xs mt-1 text-left px-3">
      *{sourceInfo.description}
      <br />
      <span className="italic text-muted-foreground font-semibold">
        {rankTypeLabel[sourceInfo.rankType]}
      </span>
      {sourceInfo.links && sourceInfo.links.length > 0 && (
        <div className="my-1">
          <span className="font-extrabold">Visit related link(s):</span>[
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
