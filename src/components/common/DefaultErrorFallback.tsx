import { selectRandom } from "@/lib/utils";
import { ExternalTextLink } from "./ExternalTextLink";
import { outLinks } from "@/lib/constants";
import { cnTextLink } from "@/lib/generic-cn";
import { Link } from "wouter";
import { ExternalKanjiLinks } from "./ExternalKanjiLinks";
import { ReactNode } from "react";

const APOLOGIZING_SYMBOL = [
  "(シ_ _)シ",
  "m(_ _)m",
  "m(._.)m",
  "<(_ _)>",
  "(_ _*)",
  "m(｡≧ _ ≦｡)m",
  //  "(´；ω；｀)",
  "(｡•́︿•̀｡)",
  //  "(；人；)",
];

export const Sumimasen = () => {
  return (
    <>
      <span className="text-xl my-1 kanji-font">{"すみません"}</span>
      <div className="flex space-x-2 justify-center items-center">
        {Math.random() < 0.8 ? (
          <code className="text-md font-bolder text-xl text-pink-500">
            {selectRandom(APOLOGIZING_SYMBOL)}
          </code>
        ) : (
          <div className="text-3xl">{"🙇🏽‍♀️ 🙇"}</div>
        )}
      </div>
    </>
  );
};

const Wrapper = ({ children }: { children: ReactNode }) => {
  return (
    <div className="h-full w-95 flex flex-col items-center justify-center p-4 m-2">
      {children}
    </div>
  );
};

const ReachOutToUs = ({
  prefix = " Please let us know on ",
}: {
  prefix?: string;
}) => {
  return (
    <>
      {prefix}
      <ExternalTextLink href={outLinks.discord} text="Discord," />
      <ExternalTextLink href={outLinks.githubIssue} text="Github," /> or
      <ExternalTextLink href={outLinks.koFi} text="Ko-Fi." />
    </>
  );
};

const RefreshOrGoBackHome = () => {
  return (
    <>
      Meanwhile, you can try{" "}
      <button
        className={cnTextLink}
        onClick={() => {
          window?.location.reload();
        }}
      >
        refreshing the page
      </button>{" "}
      or go back
      <Link to="/" className={cnTextLink}>
        home.
      </Link>
    </>
  );
};
export const DefaultCta = () => {
  return (
    <div className="mx-2 text-xs">
      <ReachOutToUs />
      <br />
      <RefreshOrGoBackHome />
    </div>
  );
};

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
