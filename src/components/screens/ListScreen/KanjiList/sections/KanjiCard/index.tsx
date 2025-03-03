import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { GenericPopover } from "@/components/common/GenericPopover";
import {
  KanjiCardLayout,
  KanjiSingleComponent,
  MainCardContent,
} from "./layouts";
import { HiraganaWord } from "./HiraganaWordButton";
import {
  useIsKanjiWorkerReady,
  useKanjiInfo,
} from "@/providers/kanji-worker-provider";
import { JLTPTtypes } from "@/lib/constants";
import { KanjiInfoFrequency } from "@/lib/kanji-worker-constants";
import { Separator } from "@/components/ui/separator";

export const KanjiLink = ({
  kanji,
  keyword,
}: {
  kanji: string;
  keyword: string;
}) => {
  return (
    <Link
      to={`/?openedKanji=${kanji}`}
      className={
        "flex flex-col m-1 p-1 text-xl hover:bg-gray-100 dark:hover:bg-gray-900 rounded-md"
      }
    >
      <Badge>{keyword}</Badge>
      <div className="kanji-font">{kanji}</div>
    </Link>
  );
};

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

type HoverItemReturnData = {
  keyword: string;
  on: string;
  kun: string;
  jlpt: JLTPTtypes;
  parts: { part: string; keyword: string; phonetic?: string }[];
  frequency?: KanjiInfoFrequency;
  mainVocab: {
    first: {
      word: string;
      spacedKana: string;
      meaning: string;
      partsList: {
        kanji: string;
        keyword: string;
      }[];
    };
    second: {
      word: string;
      spacedKana: string;
      meaning: string;
      partsList: {
        kanji: string;
        keyword: string;
      }[];
    };
  };
  vocabInfo?: {
    first?: {
      spacedKana: string;
      kanjis: Record<string, string>;
    };
    second?: {
      spacedKana: string;
      kanjis: Record<string, string>;
    };
  };
};

export const WordCard = ({
  word,
  spacedKana,
  highlightIndex,
  definition,
  wordKanjis,
}: {
  word: string;
  spacedKana: string;
  highlightIndex: number;
  definition: string;
  wordKanjis: { kanji: string; keyword: string }[];
}) => {
  return (
    <>
      <HiraganaWord rawKana={spacedKana} highlightIndex={highlightIndex} />
      <GenericPopover
        trigger={
          <Button
            variant="ghost"
            className="flex text-5xl  h-auto p-0 z-1 kanji-font hover:bg-gray-200 dark:hover:bg-gray-800"
          >
            {word}
          </Button>
        }
        content={
          <div className="w-48">
            <div className="text-xs p-3">{definition}</div>
            <Separator />
            <div className="flex p-1 flex-wrap justify-center">
              {wordKanjis.map((item, index) => {
                return (
                  <KanjiLink
                    key={`${item.kanji}-${index}`}
                    keyword={item.keyword}
                    kanji={item.kanji}
                  />
                );
              })}
            </div>
          </div>
        }
      />
    </>
  );
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

  if (data.status === "loading" || !ready) {
    return (
      <div>
        Something went wrong in <code>Loading</code>
      </div>
    );
  }

  if (data.data == null) {
    return <div> No data available</div>;
  }

  const info = data.data as HoverItemReturnData;

  return (
    <KanjiCardLayout
      mainCard={<MainCardContent kanji={kanji} keyword={info.keyword} />}
      firstWordCard={
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
      secondWordCard={
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
      kanjiComponents={
        info.parts.length > 1 && (
          <>
            {info.parts.map((item) => {
              return (
                <KanjiSingleComponent
                  key={item.part}
                  kanji={item.part}
                  keyword={item.keyword}
                />
              );
            })}
          </>
        )
      }
      frequencyBadges={
        info.frequency && (
          <>
            <Badge className="text-nowrap" variant={"outline"}>
              JLPT {info.jlpt}
            </Badge>

            <Badge className="text-nowrap" variant={"outline"}>
              Netflix: {info.frequency.netflix}
            </Badge>
            <Badge className="text-nowrap" variant={"outline"}>
              Wikipedia: {info.frequency.wikiChar}
            </Badge>
            <Badge className="text-nowrap" variant={"outline"}>
              Google: {info.frequency.google}
            </Badge>
          </>
        )
      }
    />
  );
};
