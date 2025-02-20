import { useState } from "react";

import BasicSelect from "@/components/common/BasicSelect";
import { Badge } from "@/components/ui/badge";
import { ArrowDownWideNarrow } from "lucide-react";
import {
  OPTION_LABELS,
  PRIMARY_SORT_ORDER_SELECT,
  SECONDARY_SORT_ORDER_SELECT,
} from "./frequency-types";
import { UppercaseHeading } from "./common";

export const SortOrderSection = () => {
  const [value, setValue] = useState(PRIMARY_SORT_ORDER_SELECT[0].value);
  const [secondValue, setSecondValue] = useState(
    SECONDARY_SORT_ORDER_SELECT[0].value
  );

  return (
    <section className="flex items-start flex-col mt-2 w-full">
      <UppercaseHeading
        title="Sort Order ***"
        icon={<ArrowDownWideNarrow size={15} />}
      />
      <section className="flex flex-col space-y-1 md:space-y-0  md:flex-row md:space-x-1 mt-2 w-full">
        <div className="text-left  md:w-1/2">
          <div className="text-xs">Primary</div>
          <BasicSelect
            value={value}
            onChange={(newValue) => setValue(newValue)}
            triggerCN={"h-8 w-full"}
            options={PRIMARY_SORT_ORDER_SELECT}
            srOnlyLabel="Primary"
          />
        </div>
        <div className="text-left md:w-1/2">
          <div className="text-xs">Secondary</div>
          <BasicSelect
            value={secondValue}
            onChange={(newValue) => setSecondValue(newValue)}
            triggerCN={"h-8 w-full"}
            options={SECONDARY_SORT_ORDER_SELECT}
            srOnlyLabel="Primary"
          />
        </div>
      </section>
      <div className="text-xs flex mt-3 flex-wrap space-y-1 items-center justify-center">
        <div>***</div>
        <div className="mx-2">Order By</div>
        <Badge>{OPTION_LABELS[value]} </Badge>
        <div className="mx-2">Then By</div>
        <Badge>{OPTION_LABELS[secondValue]} </Badge>
      </div>
    </section>
  );
};
