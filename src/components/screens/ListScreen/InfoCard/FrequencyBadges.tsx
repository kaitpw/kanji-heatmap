import { FreqRankTypeInfo } from "@/components/common/FreqRankTypeInfo";
import { FrequencyBadge } from "@/components/common/FrequencyBadge";
import { inverseFreqMap } from "@/lib/frequency-rank";
import { KanjiInfoFrequency } from "@/lib/kanji-worker-constants";

export const FrequencyBadges = ({
  frequency,
}: {
  frequency?: KanjiInfoFrequency;
}) => {
  if (frequency == null) {
    return <></>;
  }

  const defaultValue = "No available Information";

  return (
    <>
      {frequency && (
        <>
          <FrequencyBadge
            rank={frequency.netflix}
            text="Netflix"
            content={
              <FreqRankTypeInfo
                value={inverseFreqMap["netflix"]}
                defaultValue={defaultValue}
              />
            }
          />
          <FrequencyBadge
            rank={frequency.google}
            text="Google"
            content={
              <FreqRankTypeInfo
                value={inverseFreqMap["google"]}
                defaultValue={defaultValue}
              />
            }
          />
          <FrequencyBadge
            rank={frequency.wikiChar}
            text="Wikipedia"
            content={
              <FreqRankTypeInfo
                value={inverseFreqMap["wikiChar"]}
                defaultValue={defaultValue}
              />
            }
          />
          <FrequencyBadge
            rank={frequency.jisho}
            text="Jisho"
            content={
              <FreqRankTypeInfo
                value={inverseFreqMap["jisho"]}
                defaultValue={defaultValue}
              />
            }
          />
          <FrequencyBadge
            rank={frequency.twitter}
            text="Twitter"
            content={
              <FreqRankTypeInfo
                value={inverseFreqMap["twitter"]}
                defaultValue={defaultValue}
              />
            }
          />
        </>
      )}
    </>
  );
};
