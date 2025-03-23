import { ExternalKanjiLinks } from "@/components/common/ExternalKanjiLinks";
import { ReachOutToUs, Wrapper } from "./common";
import { Sumimasen } from "./Sumimasen";
import { ClearFiltersCTA } from "../dependent/routing";

export const NoSearchResults = () => {
  return (
    <Wrapper>
      <Sumimasen />
      <div className="my-2 font-bold">
        No kanji match your search settings. <br />
        <ClearFiltersCTA />
      </div>

      <div className="text-xs flex items-center flex-wrap mx-4">
        <ReachOutToUs
          prefix={`. If you think this is a mistake, you can let us know on `}
        />
      </div>
      <div className="text-xs pt-4 text-left">
        <span>Alternatively, you can try looking in the following places:</span>
        <div className="flex flex-col items-center justify-center my-2 max-w-96">
          <ExternalKanjiLinks kanji={"捜"} />
        </div>
      </div>
    </Wrapper>
  );
};
