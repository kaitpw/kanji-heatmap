import { ExternalKanjiLinks } from "../../common/ExternalKanjiLinks";
import { Sumimasen } from "./Sumimasen";
import { Wrapper } from "./common";

export const KanjiNotFound = ({ kanji }: { kanji: string }) => {
  return (
    <Wrapper>
      <Sumimasen />
      <div className="my-2 font-bold">"{kanji}" Not Found</div>
      <div className="text-xs w-96 py-2  my-2 text-left border-t">
        <span>You can try looking for it in the following places:</span>
        <div className="flex flex-col items-center justify-center my-2">
          <ExternalKanjiLinks kanji={kanji} />
        </div>
      </div>
    </Wrapper>
  );
};
