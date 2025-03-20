import { useState } from "react";
import { vocabExternalLinks } from "@/lib/constants";

import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

import { GenericPopover } from "@/components/common/GenericPopover";
import { ExternalTextLink } from "@/components/common/ExternalTextLink";
import { HiraganaWord } from "@/components/common/HiraganaWord";

import { KanjiLink } from "./KanjiLink";

const SeeMoreDefinition = ({ definition }: { definition: string }) => {
  const [showMore, setShowMore] = useState(false);
  const canSeeAll = definition.length <= MAX_LEN;

  return (
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
  );
};

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
            <SeeMoreDefinition definition={definition} />
            <Separator className="border-dotted border" />
            <div className="text-xs p-2 flex flex-wrap justify-center">
              {vocabExternalLinks.map((item) => {
                return (
                  <ExternalTextLink
                    key={item.name}
                    href={item.url(word)}
                    text={item.name}
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
