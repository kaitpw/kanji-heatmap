import { GenericPopover } from "@/components/common/GenericPopover";
import { HiraganaWord } from "./HiraganaWord";
import { Button } from "@/components/ui/button";
import { Separator } from "@radix-ui/react-separator";
import { KanjiLink } from "./KanjiLink";
import { useState } from "react";

const MAX_LEN = 200;
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
  const [showMore, setShowMore] = useState(false);
  const canSeeAll = definition.length <= MAX_LEN;

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
          <div className="w-56">
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
            <Separator className="border-dotted border" />
            <div className="text-xs py-2 px-3 text-start">
              {canSeeAll || showMore ? (
                <>{definition}</>
              ) : (
                <>{definition.slice(0, MAX_LEN)}... </>
              )}
              <br />
              {!canSeeAll && (
                <button
                  className="underline font-bold mx-2 my-1"
                  onClick={() => {
                    setShowMore((prev) => !prev);
                  }}
                >
                  {showMore ? <>See less</> : <>See more</>}
                </button>
              )}
            </div>
          </div>
        }
      />
    </>
  );
};
