import {
  freqCategoryCn,
  freqCategoryCount,
  ITEM_CARD_BG_CN,
  JLPTOptions,
} from "@/lib/constants";
import { ReactNode } from "react";

export const H2 = ({ children }: { children: ReactNode }) => (
  <h2 className="font-bold border-b-2 border-dotted mt-6 mb-2">{children}</h2>
);

export const JLPTListItem = ({
  label,
  color,
  cn,
}: {
  label: string;
  color: string;
  cn: string;
}) => {
  return (
    <li className="flex justify-center items-center space-x-1 text-xs font-bold">
      <div className={`${cn} h-4 w-4 rounded-sm`}>
        <span className="sr-only">{color}</span>
      </div>
      <span>{label}</span>
    </li>
  );
};

export const FreqSquare = ({ srOnly, cn }: { srOnly: string; cn: string }) => {
  return (
    <div
      className={`${cn} h-4 w-4 rounded-sm border border-opacity-50 border-gray-500 dark:border-gray-600 dark:border-opacity-50`}
    >
      <span className="sr-only">{srOnly}</span>
    </div>
  );
};

export const BackgroundColorGradient = () => {
  return (
    <div className="flex my-3 space-x-1 items-center">
      <div className="text-xs">Less</div>
      {Array.from(Array(freqCategoryCount).keys()).map((item) => {
        const cn = `${freqCategoryCn[item]} ${ITEM_CARD_BG_CN}`;
        return <FreqSquare key={item} srOnly={item.toString()} cn={cn} />;
      })}
      <div className="text-xs">More</div>
    </div>
  );
};

export const JLPTBordersMeanings = () => {
  return (
    <>
      <h3 className="text-xs mt-4 mb-1 font-extrabold"> JLPT </h3>

      <ul className="flex space-x-3 mb-4 flex-wrap">
        {JLPTOptions.map((item) => {
          return (
            <JLPTListItem
              key={item.value}
              cn={item.cn}
              color={item.color}
              label={item.label}
            />
          );
        })}
      </ul>
    </>
  );
};
