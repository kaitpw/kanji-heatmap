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
import { useKanjiInfo } from "@/providers/kanji-worker-provider";
import { JLTPTtypes } from "@/lib/constants";
import { KanjiInfoFrequency } from "@/lib/kanji-worker-constants";

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
            className="flex text-4xl md:text-5xl lg:text-7xl h-auto p-0 z-1 kanji-font hover:bg-gray-200 dark:hover:bg-gray-800"
          >
            {word}
          </Button>
        }
        content={
          <div className="flex justify-start p-1">
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
        }
      />
      <div className="text-xs mt-1">{definition}</div>
    </>
  );
};

export const KanjiCard = ({ kanji }: { kanji: string }) => {
  const data = useKanjiInfo(kanji, "hover-card");

  if (data.error) {
    return (
      <div>
        Something went wrong in <code>Kanji Card</code>
      </div>
    );
  }

  if (data.status === "loading") {
    return (
      <div>
        Something went wrong in <code>Loading</code>
      </div>
    );
  }

  if (data.data == null) {
    return <div> No data available</div>;
  }

  const info = data.data as {
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
  };
  console.log(data.data);
  return (
    <KanjiCardLayout
      mainCard={<MainCardContent kanji={kanji} keyword={info.keyword} />}
      firstWordCard={
        <WordCard
          word={info.mainVocab.first.word}
          definition={info.mainVocab.first.meaning}
          spacedKana={info.mainVocab.first.spacedKana}
          highlightIndex={1}
          wordKanjis={info.mainVocab.first.partsList}
        />
      }
      secondWordCard={
        info.mainVocab.second && (
          <WordCard
            word={info.mainVocab.second.word}
            definition={info.mainVocab.second.meaning}
            spacedKana={info.mainVocab.second.spacedKana}
            highlightIndex={1}
            wordKanjis={info.mainVocab.second.partsList}
          />
        )
      }
      kanjiComponents={
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
