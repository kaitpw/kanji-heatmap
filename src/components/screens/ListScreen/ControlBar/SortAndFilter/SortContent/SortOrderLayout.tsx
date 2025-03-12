import { ReactNode } from "react";
import { Badge } from "@/components/ui/badge";
import { ArrowDownWideNarrow } from "lucide-react";
import { OPTION_LABELS, SortKey } from "@/lib/ranks-sorts-filters";
import { UppercaseHeading } from "../UpperCaseHeading";

export const SortAdditionalInfo = ({
  val1,
  val2,
}: {
  val1?: SortKey;
  val2?: SortKey;
}) => {
  const v1 = val1 && val1 !== "none" ? OPTION_LABELS?.[val1] : null;
  const v2 = val2 && v1 && val2 !== "none" ? OPTION_LABELS[val2] : null;

  return (
    <>
      {v1 && v2 && (
        <>
          <div className="mx-2">*** Order By</div> <Badge>{v1}</Badge>
        </>
      )}

      {v2 && (
        <>
          <div className="mx-2">Then By</div>
          <Badge>{v2} </Badge>
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
    <section className="flex flex-col items-start justify-start w-full">
      <section className="flex items-start flex-col mt-2 w-full">
        <UppercaseHeading
          title="Sort Order ***"
          icon={<ArrowDownWideNarrow size={15} />}
        />
        <section className="flex flex-col space-y-1 md:space-y-0  md:flex-row md:space-x-1 mt-2 w-full">
          <div className="text-left  md:w-1/2">{primaryField}</div>
          {secondaryField && (
            <div className="text-left md:w-1/2">{secondaryField}</div>
          )}
        </section>
        <div className="text-xs flex mt-3 flex-wrap space-y-1 items-center justify-center">
          {additionalInfo}
        </div>
      </section>
    </section>
  );
};
