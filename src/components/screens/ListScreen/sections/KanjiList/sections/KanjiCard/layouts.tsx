import { ReactNode } from "react";
import { Card } from "@/components/ui/card";

export const MainCardContent = ({
  kanji,
  keyword,
}: {
  kanji: string;
  keyword: string;
}) => {
  return (
    <>
      <div className="text-[100px] md:text-[180px] lg:text-[250px] kanji-font">
        {kanji}
      </div>
      <div className="text-md uppercase">{keyword}</div>
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
    <div className="flex flex-col m-1">
      <Card className="kanji-font flex justify-center items-center text-4xl h-14 w-14 rounded-full">
        {kanji}
      </Card>
      <div className="text-xs mt-1 uppercase">{keyword}</div>
    </div>
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
      <div className="md:sticky top-[0px] left-[0px] md:w-1/2 2xl:w-1/3">
        {first}
      </div>
      <div className="md:w-1/2 2xl:w-2/3">{second}</div>
    </div>
  );
};

export const KanjiCardLayout = ({
  mainCard,
  firstWordCard,
  secondWordCard,
  kanjiComponents,
  frequencyBadges,
  phoneticComponent,
}: {
  mainCard: ReactNode;
  firstWordCard: ReactNode;
  secondWordCard: ReactNode;
  kanjiComponents?: ReactNode;
  frequencyBadges?: ReactNode;
  phoneticComponent?: ReactNode;
}) => {
  return (
    <>
      <div className="flex flex-col md:flex-row">
        <div className=" pb-0 md:pb-2 md:w-1/2 py-2 px-1 md:p-2 md:pr-0">
          <Card className="flex-col py-2 md:py-8 justify-center items-center space-y-2">
            {mainCard}
          </Card>
        </div>
        <div className="flex md:flex-col md:w-1/2">
          <div className="w-1/2 h-full mt-2 mb-1 px-1 md:px-2 mx-0 md:m-0 md:pt-2 md:pb-1 md:w-full md:h-1/2">
            <Card className="h-full flex justify-center items-center py-2">
              <div className="flex flex-col items-center justify-center py-2">
                {firstWordCard}
              </div>
            </Card>
          </div>
          <div className="w-1/2 h-full mt-2 mb-1 px-1 md:px-2 mx-0 md:m-0 md:pt-1 md:pb-2 md:w-full md:h-1/2">
            <Card className="h-full flex justify-center items-center py-2">
              <div className="flex flex-col items-center justify-center py-2">
                {secondWordCard}
              </div>
            </Card>
          </div>
        </div>
      </div>
      {kanjiComponents && phoneticComponent && (
        <div className="flex justify-center items-center mb-2 mx-1 md:mx-2">
          {phoneticComponent && (
            <Card className="p-1.5 flex grow justify-center items-center mr-2">
              {phoneticComponent}
            </Card>
          )}
          {kanjiComponents && (
            <Card className="p-1 flex grow justify-center items-center h-full">
              {kanjiComponents}
            </Card>
          )}
        </div>
      )}
      {frequencyBadges && (
        <div className="flex space-x-1 justify-center flex-wrap space-y-1 mb-4">
          <div />
          {frequencyBadges}
        </div>
      )}
    </>
  );
};
