import { selectRandom } from "@/lib/utils";
import { ExternalTextLink } from "./ExternalTextLink";
import { outLinks } from "@/lib/constants";
import { cnTextLink } from "@/lib/generic-cn";
import { Link } from "wouter";
import { ExternalKanjiLinks } from "./ExternalKanjiLinks";

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

export const DefaultCta = () => {
  return (
    <div className="mx-2 text-xs w-w6">
      Please let us know about this
      <ExternalTextLink href={outLinks.discord} text="Discord," />
      <ExternalTextLink href={outLinks.githubIssue} text="Github," /> or
      <ExternalTextLink href={outLinks.githubIssue} text="Ko-Fi" /> - we'll try
      to address them promptly.
      <br />
      Meanwhile, you can try{" "}
      <button
        className={cnTextLink}
        onClick={() => {
          window?.location.reload();
        }}
      >
        refreshing the page
      </button>{" "}
      or check back later.
      <br />
      Go back
      <Link to="/" className={cnTextLink}>
        home.
      </Link>
    </div>
  );
};

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

export const KanjiNotFound = ({ kanji }: { kanji: string }) => {
  return (
    <div className="h-full w-95 flex flex-col items-center justify-center p-4 m-2 rounded-3xl">
      <Sumimasen />
      <div className="my-1 font-bold text-xs">
        No information about "{kanji}" found.
      </div>
      <div className="text-xs w-96 py-2  my-2 text-left border-t">
        <span>You can try looking for it in the following places:</span>
        <div className="flex flex-col items-center justify-center my-2">
          <ExternalKanjiLinks kanji={kanji} />
        </div>
      </div>
    </div>
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
    <div className="h-full w-95 flex flex-col items-center justify-center p-4 m-2 rounded-3xl">
      <Sumimasen />
      <div className="my-1 font-bold text-xs">{message}</div>
      {showDefaultCta && <DefaultCta />}
    </div>
  );
};
