import { JLPTOptions } from "@/lib/jlpt";

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

export const JLPTBordersMeanings = () => {
  return (
    <>
      <h3 className="text-xs mt-4 mb-1 font-extrabold"> JLPT </h3>

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
