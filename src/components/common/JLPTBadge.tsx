import { Badge } from "@/components/ui/badge";
import { JLPTListItems, JLTPTtypes } from "@/lib/jlpt";

export const JLPTBadge = ({ jlpt }: { jlpt: JLTPTtypes }) => {
  return (
    <>
      {jlpt !== "none" && (
        <Badge className="text-nowrap m-1" variant={"outline"}>
          <span
            className={`h-3 w-3 block ${JLPTListItems[jlpt].cn} !rounded-full mr-1`}
          />
          {jlpt.toUpperCase()}
        </Badge>
      )}
    </>
  );
};
