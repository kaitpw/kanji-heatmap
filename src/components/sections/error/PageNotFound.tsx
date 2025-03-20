import { ReachOutToUs } from "./ReachOutToUs";
import { RefreshOrGoBackHome } from "./RefreshOrGoBackHome";
import { Sumimasen } from "./Sumimasen";
import { Wrapper } from "./common";

export const PageNotFound = () => {
  return (
    <Wrapper>
      <Sumimasen />
      <div className="my-2 font-bold">Page Not Found</div>
      <div className="text-xs">
        <div className="m-1 text-xs">
          <ReachOutToUs prefix="If you think this is a mistake, you can report on " />
          <br />
          <RefreshOrGoBackHome />
        </div>
      </div>
    </Wrapper>
  );
};
