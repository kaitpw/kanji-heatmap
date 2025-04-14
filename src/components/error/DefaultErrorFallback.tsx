import { ReachOutToUs, RefreshOrGoBackHome, Wrapper } from "./common";
import { Sumimasen } from "./Sumimasen";

export const DefaultErrorFallback = ({
  message = "Welp... this isn’t supposed to happen! 🫣🫣",
  showDefaultCta = true,
}: {
  message?: string;
  showDefaultCta?: boolean;
}) => {
  return (
    <Wrapper>
      <Sumimasen />
      <div className="my-1 font-bold text-xs max-w-96">{message}</div>
      {showDefaultCta && (
        <div className="mx-2 text-xs">
          <div>
            <ReachOutToUs />
          </div>
          <div className="mt-1">
            <RefreshOrGoBackHome />
          </div>
        </div>
      )}
    </Wrapper>
  );
};
