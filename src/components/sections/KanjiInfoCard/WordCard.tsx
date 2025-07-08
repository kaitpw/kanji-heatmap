import { Button } from "@/components/ui/button";
import { DottedSeparator } from "@/components/ui/dotted-separator";

import { GenericPopover } from "@/components/common/GenericPopover";
import { ExternalTextLink } from "@/components/common/ExternalTextLink";

import { GlobalKanjiLink } from "@/components/dependent/routing";
import { HiraganaWord } from "@/components/dependent/kana/HiraganaWord";
import { externalLinks } from "@/lib/external-links";
import { SeeMore } from "@/components/common/SeeMore";
import { CopyButton } from "@/components/common/CopyButton";
import { InfoIcon } from "lucide-react";

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
              {externalLinks.map((item) => {
                return (
                  <ExternalTextLink
                    key={item.name}
                    href={item.url(word)}
                    text={item.name}
                  />
                );
              })}
              <GenericPopover
                trigger={
                  <InfoIcon
                    className="inline-block absolute top-2 right-2"
                    size={18}
                  />
                }
                content={
                  <div className="flex flex-col w-full text-xs p-2 space-y-1">
                    <div className="flex items-center w-full justify-left">
                      <CopyButton textToCopy={word} iconType={"clipboard"} />
                      <span className="ml-2">{"Copy Kanji"}</span>
                    </div>
                    <div className="flex items-center w-full justify-left">
                      <CopyButton
                        textToCopy={spacedKana.split(" ").join("")}
                        iconType={"copy"}
                      />
                      <span className="ml-2">{"Copy Kana"}</span>
                    </div>
                  </div>
                }
              />
            </div>
          </div>
        }
      />
    </>
  );
};
