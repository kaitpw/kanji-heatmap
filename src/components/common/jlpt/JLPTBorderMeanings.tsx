import { JLPTOptions } from "@/lib/jlpt";
import { JLPTListItem } from "./JLPTListItem";

export const JLPTBordersMeanings = () => {
  return (
    <>
      <h3 className="text-xs mt-4 mb-1 font-extrabold">JLPT</h3>

      <ul className="flex w-54 mb-2 flex-wrap">
        {JLPTOptions.map((item) => {
          return (
            <JLPTListItem
              key={item.value}
              cn={`${item.cn} m-1`}
              color={item.color}
              label={item.label}
            />
          );
        })}
      </ul>
    </>
  );
};
