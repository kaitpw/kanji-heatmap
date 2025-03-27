import { Button } from "@/components/ui/button";
import { DottedSeparator } from "@/components/ui/dotted-separator";

import { GenericPopover } from "@/components/common/GenericPopover";
import { ExternalTextLink } from "@/components/common/ExternalTextLink";

import { GlobalKanjiLink } from "@/components/dependent/routing";
import { HiraganaWord } from "@/components/dependent/kana/HiraganaWord";
import { vocabExternalLinks } from "@/lib/external-links";
import { SeeMore } from "@/components/common/SeeMore";
import { VocabActions } from "@/components/common/VocabActions";

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
            <SeeMore definition={definition} />
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
            <VocabActions kana={spacedKana.split(" ").join("")} word={word} />
          </div>
        }
      />
    </>
  );
};
