import { selectRandom } from "@/lib/utils";
import { ExternalTextLink } from "./ExternalTextLink";
import { outLinks } from "@/lib/constants";
import { cnTextLink } from "@/lib/generic-cn";

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
export const DefaultErrorFallback = ({
  message = "This is unexpected.",
  showDefaultCta = true,
}: {
  message?: string;
  showDefaultCta?: boolean;
}) => {
  return (
    <div className="h-full w-95 flex flex-col items-center justify-center text-xs p-4 m-2 bg-gray-100 dark:bg-slate-900 bg-opacity-40 rounded-3xl">
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
      <div className="my-1 font-bold">{message}</div>

      {showDefaultCta && (
        <div className="mx-2 ">
          Try{" "}
          <button
            className={cnTextLink}
            onClick={() => {
              window?.location.reload();
            }}
          >
            refreshing the page
          </button>{" "}
          or{" "}
          <ExternalTextLink
            href={outLinks.githubIssue}
            text="report the issue on Github."
          />
        </div>
      )}
    </div>
  );
};
