import { ReactNode } from "react";
import { FilterX } from "@/components/icons";
import { UppercaseHeading } from "@/components/common/UpperCaseHeading";

export const FilterSectionLayout = ({
  jlptField,
  strokeCountField,
  freqRankRangeField,
  freqRankSourceField,
}: {
  jlptField: ReactNode;
  strokeCountField: ReactNode;
  freqRankSourceField: ReactNode;
  freqRankRangeField?: ReactNode;
}) => {
  return (
    <section className="text-start">
      <UppercaseHeading title="Filters" icon={<FilterX size={15} />} />
      <div className="flex w-full flex-col md:flex-row md:space-x-4">
        <div className="w-full md:w-1/2 pb-8">{strokeCountField}</div>
        <div className="w-full md:w-1/2">{jlptField}</div>
      </div>
      <div className="py-2 mt-4 md:mt-0 uppercase text-xs font-extrabold">
        Frequency Ranking
      </div>
      <div className="flex w-full flex-col md:flex-row md:space-x-4">
        <div className="w-full md:w-1/2">
          <div className="text-left w-full pb-4 md:pb-0">
            {freqRankSourceField}
          </div>
        </div>
        <div className="w-full md:w-1/2 pb-8">{freqRankRangeField}</div>
      </div>
    </section>
  );
};
