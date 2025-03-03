import { ReactNode } from "react";
import { Separator } from "@/components/ui/separator";
import { GenericPopover } from "@/components/common/GenericPopover";

export const MainCardContent = ({
  kanji,
  keyword,
}: {
  kanji: string;
  keyword: string;
}) => {
  return (
    <>
      <div className="mr-4 px-4 rounded-3xl">
        <span className="text-[120px] kanji-font">{kanji}</span>
        <div className="text-md uppercase -mt-4">{keyword}</div>
      </div>
    </>
  );
};

export const KanjiSingleComponent = ({
  kanji,
  keyword,
}: {
  kanji: string;
  keyword: string;
}) => {
  return (
    <GenericPopover
      trigger={
        <button className="flex flex-col m-1 kanji-font text-4xl border-4 border-lime-400 rounded-3xl p-2">
          {kanji}
        </button>
      }
      content={<div className="text-xs uppercase p-2 font-bold">{keyword}</div>}
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
    <div className="w-full flex flex-col overflow-y-scroll md:flex-row md:space-x-1">
      <div className="md:sticky top-[0px] left-[0px] mx-6">{first}</div>
      <div>{second}</div>
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
    <div className="m-2">
      <div className="flex">
        <div className="mr-4 border-r-2 border-dotted">{mainCard}</div>
        <div>
          {firstWordCard}
          <Separator className="my-4" />
          {secondWordCard}
        </div>
      </div>
      {kanjiComponents && (
        <>
          <Separator className="my-4" />

          <div className="flex w-full mr-4 p-2">{kanjiComponents}</div>
        </>
      )}
      <Separator className="my-4" />
      {frequencyBadges && (
        <div className="flex space-x-1 flex-wrap space-y-1">
          <div />
          {frequencyBadges}
        </div>
      )}
    </div>
  );
};
