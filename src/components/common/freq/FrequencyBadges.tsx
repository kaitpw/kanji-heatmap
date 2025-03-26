import { KanjiInfoFrequency } from "@/lib/kanji/kanji-worker-types";
import { FreqRankTypeInfo } from "@/components/common/freq/FreqRankTypeInfo";
import { FrequencyBadge } from "@/components/common/freq/FrequencyBadge";
import { inverseFreqMap } from "@/lib/options/options-label-maps";

export const FrequencyBadges = ({
  frequency,
}: {
  frequency?: KanjiInfoFrequency;
}) => {
  if (frequency == null) {
    return null;
  }

  return (
    <>
      <FrequencyBadge
        rank={frequency.netflix}
        text="Netflix"
        content={<FreqRankTypeInfo value={inverseFreqMap.netflix} />}
      />
      <FrequencyBadge
        rank={frequency.google}
        text="Google"
        content={<FreqRankTypeInfo value={inverseFreqMap.google} />}
      />
      <FrequencyBadge
        rank={frequency.wkfr}
        text="Wikipedia"
        content={<FreqRankTypeInfo value={inverseFreqMap.wkfr} />}
      />

      <FrequencyBadge
        rank={frequency.twitter}
        text="Twitter"
        content={<FreqRankTypeInfo value={inverseFreqMap.twitter} />}
      />
    </>
  );
};
