import {
  useIsKanjiWorkerReady,
  useKanjiInfo,
} from "@/kanji-worker/kanji-worker-provider";
import { HoverItemReturnData } from "@/lib/kanji-info-types";
import { WordCard } from "./WordCard";
import { SingleComponent } from "./SingleComponent";
import { FrequencyBadges, JLPTBadge } from "./badges";
import { KanjiCardLayout } from "./CardLayout";

const getHighlightIndex = (
  kanji: string,
  info?: {
    spacedKana: string;
    kanjis: Record<string, string>;
  } | null
) => {
  const kanjiPronouncation = info?.kanjis?.[kanji];
  if (kanjiPronouncation == null) {
    // temporary for now
    return 1;
  }

  const kanaArray = info?.spacedKana.split(" ") ?? [];
  const index = kanaArray.findIndex((item) => item === kanjiPronouncation);

  return index;
};

export const KanjiCard = ({ kanji }: { kanji: string }) => {
  const data = useKanjiInfo(kanji, "hover-card");
  const ready = useIsKanjiWorkerReady();

  if (data.error) {
    return (
      <div>
        Something went wrong in <code>Kanji Card</code>
      </div>
    );
  }

  if (!ready || data.status === "loading" || data.data == null) {
    return <div>Loading Kanji Card...</div>;
  }

  const info = data.data as HoverItemReturnData;

  return (
    <KanjiCardLayout
      main={
        <div className="mr-4 pl-2 rounded-3xl">
          <span className="text-[120px] kanji-font">{kanji}</span>
          <div className="text-md uppercase -mt-4">{info.keyword}</div>
        </div>
      }
      firstWord={
        <WordCard
          word={info.mainVocab.first.word}
          definition={info.mainVocab.first.meaning}
          spacedKana={
            info.vocabInfo?.first?.spacedKana ?? info.mainVocab.first.spacedKana
          }
          highlightIndex={getHighlightIndex(kanji, info?.vocabInfo?.first)}
          wordKanjis={info.mainVocab.first.partsList}
        />
      }
      secondWord={
        info.mainVocab.second && (
          <WordCard
            word={info.mainVocab.second.word}
            definition={info.mainVocab.second.meaning}
            spacedKana={
              info?.vocabInfo?.second?.spacedKana ??
              info.mainVocab.second.spacedKana
            }
            highlightIndex={getHighlightIndex(kanji, info?.vocabInfo?.second)}
            wordKanjis={info.mainVocab.second.partsList}
          />
        )
      }
      components={
        info.parts.length > 1 && (
          <>
            {info.parts.map((item) => {
              return (
                <SingleComponent
                  key={item.part}
                  kanji={item.part}
                  keyword={item.keyword}
                  phonetic={item.phonetic}
                />
              );
            })}
            {info.phonetic &&
              info.parts
                .map((part) => part.part)
                .includes(info.phonetic.phonetic) === false && (
                <SingleComponent
                  kanji={info.phonetic.phonetic}
                  keyword={info.phonetic.keyword}
                  phonetic={info.phonetic.sound}
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
