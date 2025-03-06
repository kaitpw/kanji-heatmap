import { ReactNode } from "react";
import { GenericPopover } from "@/components/common/GenericPopover";
import { RomajiBadge } from "@/components/common/RomajiBadge";

export const MainCardContent = ({
  kanji,
  keyword,
}: {
  kanji: string;
  keyword: string;
}) => {
  return (
    <>
      <div className="mr-4 pl-2 rounded-3xl">
        <span className="text-[120px] kanji-font">{kanji}</span>
        <div className="text-md uppercase -mt-4">{keyword}</div>
      </div>
    </>
  );
};

export const KanjiSingleComponent = ({
  kanji,
  keyword,
  phonetic,
}: {
  kanji: string;
  keyword: string;
  phonetic?: string;
}) => {
  return (
    <GenericPopover
      trigger={
        <button
          className={`flex flex-col m-1 kanji-font text-4xl border-2 border-dotted rounded-3xl p-2 ${phonetic ? "bg-lime-100 dark:bg-lime-800" : ""}`}
        >
          {kanji}
        </button>
      }
      content={
        <div className="text-xs uppercase p-2 font-bold">
          <span className="block">{keyword}</span>{" "}
          {phonetic && <RomajiBadge kana={phonetic} />}{" "}
        </div>
      }
    />
  );
};

export const KanjiInfoLayout = ({
  first,
  second,
}: {
  first: ReactNode;
  second: ReactNode;
}) => {
  return (
    <div className="w-full flex flex-col overflow-y-scroll overflow-x-hidden md:flex-row md:space-x-1 ">
      <div className="pl-2 md:sticky md:top-[0px] md:left-[0px] md:min-w-96 md:max-w-96 md:w-96">
        {first}
      </div>
      <div className="grow">{second}</div>
    </div>
  );
};

export const KanjiCardLayout = ({
  mainCard,
  firstWordCard,
  secondWordCard,
  kanjiComponents,
  frequencyBadges,
}: {
  mainCard: ReactNode;
  firstWordCard: ReactNode;
  secondWordCard: ReactNode;
  kanjiComponents?: ReactNode;
  frequencyBadges?: ReactNode;
}) => {
  return (
    <article className="w-full rounded-lg border-2 border-dotted">
      <div className="flex">
        <div className=" border-r-2 border-dotted">{mainCard}</div>
        <div className="px-2 w-full pb-4 pt-4">
          {firstWordCard}
          <div className="mt-6 mb-2 border-b-2 border-dotted w-full" />
          {secondWordCard}
        </div>
      </div>
      {kanjiComponents && (
        <>
          <div className="flex justify-center flex-wrap mr-4 p-2 border-t-2 border-dotted pt-3 w-full">
            {kanjiComponents}
          </div>
        </>
      )}
      {frequencyBadges && (
        <div className="flex space-x-1 justify-center flex-wrap space-y-1 border-t-2 border-dotted mt-1 mb-3 pt-4 px-2">
          <div />
          {frequencyBadges}
        </div>
      )}
    </article>
  );
};
