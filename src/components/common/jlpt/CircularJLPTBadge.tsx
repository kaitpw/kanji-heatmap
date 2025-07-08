import { JLPTListItems, type JLTPTtypes } from "@/lib/jlpt";

export const CircularJLPTBadge = ({ jlpt }: { jlpt: JLTPTtypes }) => {
  if (jlpt === "none") {
    return null;
  }

  return (
    <div
      className={`absolute -bottom-2 -right-2 w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-md ${
        JLPTListItems[jlpt].cn
      }`}
    >
      {jlpt.toUpperCase()}
    </div>
  );
};
