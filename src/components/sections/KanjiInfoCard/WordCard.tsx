import { useState } from "react";

import { Button } from "@/components/ui/button";
import { DottedSeparator } from "@/components/ui/dotted-separator";

import { GenericPopover } from "@/components/common/GenericPopover";
import { ExternalTextLink } from "@/components/common/ExternalTextLink";

import { GlobalKanjiLink } from "@/components/dependent/routing";
import { HiraganaWord } from "@/components/dependent/kana/HiraganaWord";
import { vocabExternalLinks } from "@/lib/external-links";
import { useSpeak } from "@/hooks/use-jp-speak";
import { Volume2 } from "lucide-react";

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

const SpeakButton = ({ word }: { word: string }) => {
  const speak = useSpeak(word);

  return (
    <Button
      variant={"ghost"}
      size="icon"
      className="h-8 w-8 relative my-1"
      onClick={() => {
        speak();
      }}
    >
      <Volume2 />
    </Button>
  );
};
const MAX_LEN = 200;
export const WordCard = ({
  word,
  spacedKana,
  highlightIndex,
  definition,
  wordKanjis,
  speakMethod = "kana",
}: {
  word: string;
  spacedKana: string;
  highlightIndex: number;
  definition: string;
  wordKanjis: { kanji: string; keyword: string }[];
  speakMethod?: "kanji" | "kana";
}) => {
  const wordToSpeak =
    speakMethod === "kana" ? spacedKana.split(" ").join("") : word;
  return (
    <>
      <div className="flex justify-center sm:justify-start">
        <HiraganaWord rawKana={spacedKana} highlightIndex={highlightIndex} />
      </div>
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
          <div className="w-64">
            <div className="flex p-1 flex-wrap justify-center">
              {wordKanjis.map((item, index) => {
                return (
                  <GlobalKanjiLink
                    key={`${item.kanji}-${index}`}
                    keyword={item.keyword}
                    kanji={item.kanji}
                  />
                );
              })}
            </div>

            <DottedSeparator />
            <SeeMoreDefinition definition={definition} />
            <DottedSeparator />
            <div className="text-xs pt-2 font-bold flex flex-wrap justify-center">
              Learn more from:
            </div>
            <div className="text-xs pb-2 flex flex-wrap justify-center">
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
            <DottedSeparator />
            <SpeakButton word={wordToSpeak} />
          </div>
        }
      />
    </>
  );
};
