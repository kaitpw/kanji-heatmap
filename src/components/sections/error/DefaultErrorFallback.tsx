import { ReachOutToUs } from "./ReachOutToUs";
import { RefreshOrGoBackHome } from "./RefreshOrGoBackHome";
import { Sumimasen } from "./Sumimasen";
import { Wrapper } from "./common";

export const DefaultErrorFallback = ({
  message = "This is unexpected.",
  showDefaultCta = true,
}: {
  message?: string;
  showDefaultCta?: boolean;
}) => {
  return (
    <Wrapper>
      <Sumimasen />
      <div className="my-1 font-bold text-xs">{message}</div>
      {showDefaultCta && (
        <div className="mx-2 text-xs">
          <ReachOutToUs />
          <br />
          <RefreshOrGoBackHome />
        </div>
      )}
    </Wrapper>
  );
};
