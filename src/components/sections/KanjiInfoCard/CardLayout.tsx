import { ReactNode } from "react";

export const KanjiCardLayout = ({
  main,
  firstWord,
  secondWord,
  components,
  badges,
}: {
  main: ReactNode;
  firstWord: ReactNode;
  secondWord: ReactNode;
  components?: ReactNode;
  badges?: ReactNode;
}) => {
  return (
    <article className="w-full rounded-lg border-2 border-dotted">
      <div className="flex">
        <div className=" border-r-2 border-dotted">{main}</div>
        <div className="px-2 w-full pb-4 pt-4">
          {firstWord}
          {firstWord && secondWord && (
            <div className="mt-6 mb-2 border-b-2 border-dotted w-full" />
          )}
          {secondWord}
        </div>
      </div>
      {components && (
        <>
          <div className="flex justify-center flex-wrap mr-4  border-t-2 border-dotted pt-1 w-full">
            {components}
          </div>
        </>
      )}
      {badges && (
        <div className="flex space-x-1 justify-center flex-wrap space-y-1 border-t-2 border-dotted mt-1 mb-2 pt-1 px-2">
          <div />
          {badges}
        </div>
      )}
    </article>
  );
};
