import { GenericPopover } from "@/components/common/GenericPopover";
import { HiraganaWord } from "./HiraganaWord";
import { Button } from "@/components/ui/button";
import { Separator } from "@radix-ui/react-separator";
import { KanjiLink } from "./KanjiLink";

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
            className="flex text-5xl h-auto p-0 my-2 z-1 kanji-font hover:bg-gray-200 dark:hover:bg-gray-800 text-clip"
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
