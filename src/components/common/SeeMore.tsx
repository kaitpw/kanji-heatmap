import { useState } from "react";

export const SeeMore = ({
  definition,
  maxLen = 200,
}: {
  definition: string;
  maxLen?: number;
}) => {
  const [showMore, setShowMore] = useState(false);
  const canSeeAll = definition.length <= maxLen;

  return (
    <div className="text-xs py-2 px-3 text-start">
      {canSeeAll || showMore ? (
        <>{definition}</>
      ) : (
        <>{definition.slice(0, maxLen)}...</>
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
