import { ReactNode } from "react";
import { SortKey } from "@/lib/options/options-types";

import { ArrowDownWideNarrow } from "@/components/icons";
import { Badge } from "@/components/ui/badge";

import { UppercaseHeading } from "@/components/common/UpperCaseHeading";
import { SORT_OPTION_LABELS } from "@/lib/options/options-label-maps";

export const SortAdditionalInfo = ({
  val1,
  val2,
}: {
  val1?: SortKey;
  val2?: SortKey;
}) => {
  const v1 = val1 && val1 !== "none" ? SORT_OPTION_LABELS[val1] : null;
  const v2 = val2 && v1 && val2 !== "none" ? SORT_OPTION_LABELS[val2] : null;

  return (
    <>
      {v1 && v2 && (
        <>
          <div className="m-2">*** Order By</div> <Badge>{v1}</Badge>
        </>
      )}

      {v2 && (
        <>
          <div className="m-2">Then By</div>
          <Badge>{v2}</Badge>
        </>
      )}
    </>
  );
};

export const SortOrderSectionLayout = ({
  primaryField,
  secondaryField,
  additionalInfo,
}: {
  primaryField: ReactNode;
  secondaryField?: ReactNode;
  additionalInfo: ReactNode;
}) => {
  return (
    <section className="flex flex-col">
      <UppercaseHeading
        title="Sort Order ***"
        icon={<ArrowDownWideNarrow size={15} />}
      />
      <section className="flex flex-col space-x-0 md:space-y-0 md:flex-row md:space-x-2  w-full text-left">
        <div className="md:w-1/2">{primaryField}</div>
        {secondaryField && <div className="md:w-1/2">{secondaryField}</div>}
      </section>
      <div className="text-xs flex mt-3 flex-wrap items-center justify-start">
        {additionalInfo}
      </div>
    </section>
  );
};
