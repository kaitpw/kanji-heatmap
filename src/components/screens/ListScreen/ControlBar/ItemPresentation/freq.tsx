import { ITEM_CARD_BG_CN, squareCn } from "@/lib/constants";
import {
  FreqCategory,
  freqCategoryCn,
  freqCategoryCount,
} from "@/lib/freq-category";

import { ReactNode } from "react";

export const FreqSquare = ({ srOnly, cn }: { srOnly: string; cn: string }) => {
  return (
    <div className={`${cn} h-4 w-4 ${squareCn}`}>
      <span className="sr-only">{srOnly}</span>
    </div>
  );
};

export const BackgroundColorGradient = () => {
  return (
    <div className="flex my-3 space-x-1 items-center">
      <div className="text-xs">Less</div>
      {Array.from(Array(freqCategoryCount).keys()).map((item) => {
        const cn = `${freqCategoryCn[item as FreqCategory]} ${ITEM_CARD_BG_CN}`;
        return <FreqSquare key={item} srOnly={item.toString()} cn={cn} />;
      })}
      <div className="text-xs">More</div>
    </div>
  );
};

export const H2 = ({ children }: { children: ReactNode }) => (
  <h2 className="font-bold border-b-2 border-dotted mt-6 mb-2">{children}</h2>
);
