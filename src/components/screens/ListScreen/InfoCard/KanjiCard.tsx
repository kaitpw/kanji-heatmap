import {
  useIsKanjiWorkerReady,
  useKanjiInfo,
} from "@/kanji-worker/kanji-worker-provider";
import { HoverItemReturnData, KanjiWordDetails } from "@/lib/kanji-info-types";
import { SingleComponent } from "./SingleComponent";
import { FrequencyBadges } from "./FrequencyBadges";
import { KanjiCardLayout } from "./CardLayout";
import { JLPTBadge } from "@/components/common/JLPTBadge";
import { DefaultErrorFallback } from "@/components/common/DefaultErrorFallback";
import { BasicLoading } from "@/components/common/BasicLoading";
import { WordCard } from "./WordCard";

const MISSING_KEYWORD = "💔🪲";

const transformKanjiWordDetails = (
  kanji: string,
  wordDetails?: KanjiWordDetails
) => {
  if (wordDetails == null) {
    return null;
  }

  const spacedKana = wordDetails.wordPartDetails
    .map((item) => {
      return item[1] ?? "";
    })
    .join(" ");

  const highlightIndex =
    wordDetails.wordPartDetails.findIndex((item) => {
      return item[0] === kanji;
    }) ?? -1;

  const result = {
    word: wordDetails.word,
    wordKanjis: wordDetails.partsList,
    definition: wordDetails.meaning,
    spacedKana,
    highlightIndex,
  };
  return result;
};

export const KanjiCard = ({ kanji }: { kanji: string }) => {
  const data = useKanjiInfo(kanji, "hover-card");
  const ready = useIsKanjiWorkerReady();

  if (data.error) {
    return <DefaultErrorFallback message="Failed to load data." />;
  }

  if (!ready || data.status === "loading" || data.data == null) {
    return <BasicLoading />;
  }

  const info = data.data as HoverItemReturnData;

  const word1Props = transformKanjiWordDetails(kanji, info.mainVocab?.first);
  const word2Props = transformKanjiWordDetails(kanji, info.mainVocab?.second);

  return (
    <KanjiCardLayout
      main={
        <div className="mr-4 pl-2 rounded-3xl">
          <span className="text-[120px] kanji-font">{kanji}</span>
          <div className="text-md uppercase -mt-4">{info.keyword}</div>
        </div>
      }
      firstWord={word1Props && <WordCard {...word1Props} />}
      secondWord={word2Props && <WordCard {...word2Props} />}
      components={
        info.parts.length > 1 && (
          <>
            {info.parts.map((item) => {
              return (
                <SingleComponent
                  key={item.part}
                  kanji={item.part}
                  keyword={item.keyword ?? MISSING_KEYWORD}
                  isKanji={item.isKanji}
                />
              );
            })}
            {info.phonetic &&
              info.parts
                .map((part) => part.part)
                .includes(info.phonetic.phonetic) === false && (
                <SingleComponent
                  kanji={info.phonetic.phonetic}
                  keyword={info.phonetic.keyword ?? MISSING_KEYWORD}
                  phonetic={info.phonetic.sound}
                  isKanji={info.phonetic.isKanji}
                />
              )}
          </>
        )
      }
      badges={
        <>
          <JLPTBadge jlpt={info.jlpt} />
          <FrequencyBadges frequency={info.frequency} />
        </>
      }
    />
  );
};
