import { Badge } from "@/components/ui/badge";
import { JLTPTtypes } from "@/lib/constants";
import { KanjiInfoFrequency } from "@/lib/kanji-worker-constants";

export const FrequencyBadges = ({
  frequency,
}: {
  frequency?: KanjiInfoFrequency;
}) => {
  return (
    <>
      {frequency && (
        <>
          <Badge className="text-nowrap m-1" variant={"outline"}>
            Netflix~ {frequency.netflix}
          </Badge>
          <Badge className="text-nowrap m-1" variant={"outline"}>
            Wikipedia {frequency.wikiChar}
          </Badge>
          <Badge className="text-nowrap m-1" variant={"outline"}>
            Google~ {frequency.google}
          </Badge>
          <Badge className="text-nowrap m-1" variant={"outline"}>
            Jisho~ {frequency.jisho}
          </Badge>
        </>
      )}
    </>
  );
};

export const JLPTBadge = ({ jlpt }: { jlpt: JLTPTtypes }) => {
  return (
    <>
      {jlpt !== "none" && (
        <Badge className="text-nowrap m-1" variant={"outline"}>
          JLPT {jlpt.toUpperCase()}
        </Badge>
      )}
    </>
  );
};
