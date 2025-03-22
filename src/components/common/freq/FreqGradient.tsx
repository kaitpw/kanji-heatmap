import {
  FreqCategory,
  freqCategoryCn,
  freqCategoryCount,
} from "@/lib/freq/freq-category";
import { cnItemBg } from "@/lib/generic-cn";
import { FreqSquare } from "./FreqSquare";

export const FreqGradient = () => {
  return (
    <div className="flex my-3 space-x-1 items-center">
      <div className="text-xs">Less</div>
      {Array.from(Array(freqCategoryCount).keys()).map((item) => {
        const cn = `${freqCategoryCn[item as FreqCategory]} ${cnItemBg}`;
        return <FreqSquare key={item} srOnly={item.toString()} cn={cn} />;
      })}
      <div className="text-xs">More</div>
    </div>
  );
};
