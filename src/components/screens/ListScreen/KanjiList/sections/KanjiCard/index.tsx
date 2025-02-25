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
  const frequencyBadges = [
    "JLPT N5",
    "Netflix 5 ⭐",
    "Twitter 4 ⭐",
    "Wikipedia 2 ⭐",
    "News 2 ⭐",
  ];

  const info = useKanjiInfo(kanji, "hover-card");

  return (
    <KanjiCardLayout
      mainCard={<MainCardContent kanji={kanji} keyword={"Interval"} />}
      firstWordCard={
        <WordCard
          word="時時間"
          definition={"Time, Hours of..."}
          spacedKana="じ かん じ"
          highlightIndex={1}
          wordKanjis={[
            { keyword: `time ${JSON.stringify(info, null, 2)}`, kanji: "時" },
            { keyword: "interval", kanji: "時" },
          ]}
        />
      }
      secondWordCard={
        <WordCard
          word="時時間"
          definition="Time, Hours of..."
          spacedKana="じ かん じ"
          highlightIndex={1}
          wordKanjis={[
            { keyword: "time", kanji: "時" },
            { keyword: "interval", kanji: "時" },
          ]}
        />
      }
      kanjiComponents={
        <>
          <KanjiSingleComponent kanji={"時"} keyword={"Leaf"} />
          <KanjiSingleComponent kanji={"時"} keyword={"Leaf"} />
          <KanjiSingleComponent kanji={"時"} keyword={"Leaf"} />
        </>
      }
      frequencyBadges={
        <>
          {frequencyBadges.map((text) => {
            return (
              <Badge key={text} className="text-nowrap" variant={"outline"}>
                {text}
              </Badge>
            );
          })}
        </>
      }
    />
  );
};
