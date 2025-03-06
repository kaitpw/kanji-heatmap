import { Badge } from "@/components/ui/badge";
import { JLTPTtypes } from "@/lib/jlpt";
import { KanjiInfoFrequency } from "@/lib/kanji-worker-constants";

export const FrequencyBadge = ({
  text,
  freq,
}: {
  text: string;
  freq?: number;
}) => {
  if (freq == null || freq < 1) {
    return <></>;
  }
  return (
    <>
      <Badge className="text-nowrap m-1" variant={"outline"}>
        {text}~ {freq}
      </Badge>
    </>
  );
};
export const FrequencyBadges = ({
  frequency,
}: {
  frequency?: KanjiInfoFrequency;
}) => {
  return (
    <>
      {frequency && (
        <>
          <FrequencyBadge freq={frequency.netflix} text="Netflix" />
          <FrequencyBadge freq={frequency.google} text="Google" />
          <FrequencyBadge freq={frequency.wikiChar} text="Wikipedia" />
          <FrequencyBadge freq={frequency.jisho} text="Jisho" />
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
