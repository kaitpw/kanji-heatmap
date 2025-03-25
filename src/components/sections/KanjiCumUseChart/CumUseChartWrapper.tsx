import { ReactNode } from "react";

export const CumUseChartWrapper = ({
  legends,
  children,
}: {
  legends: ReactNode;
  children: ReactNode;
}) => {
  return (
    <article className="flex justify-center flex-col items-center">
      <div className="w-full max-w-5xl">
        <h1 className="font-bold text-lg md:text-xl my-3">
          Cumulative Usage vs Frequency Rank
        </h1>

        <div>{children}</div>
        <div className="flex flex-wrap justify-center">{legends}</div>
        <div className="mx-2 text-left">
          <p className="text-base my-2">
            The x-axis lists items by their frequency rank (Rank 1224**), and
            the y-axis shows the cumulative percentage of total usage up to that
            rank. The graph highlights how quickly the most frequent items build
            up to account for the bulk of the overall usage.
          </p>
          <p className="my-2 text-xs">
            **Ranks are Standard competition (or Rank 1224) means items that
            rank equally receive the same ranking number, and then a gap is left
            after the equally ranked items in the ranking number.
          </p>
        </div>
      </div>
    </article>
  );
};

export default CumUseChartWrapper;
