import { outLinks } from "@/lib/constants";
import { ExternalTextLink } from "@/components/common/ExternalTextLink";
import { GenericPopover } from "@/components/common/GenericPopover";
import { RomajiBadge } from "@/components/common/RomajiBadge";
import { KanjiLink } from "./KanjiLink";

export const SingleComponent = ({
  kanji,
  keyword,
  phonetics = [],
  isKanji,
}: {
  kanji: string;
  keyword?: string;
  phonetics?: string[];
  isKanji: boolean;
}) => {
  return (
    <GenericPopover
      trigger={
        <button
          className={`flex flex-col m-1 kanji-font text-2xl border-2 rounded-2xl p-1 ${phonetics.length > 0 ? " border-lime-400" : "border-dotted"}`}
        >
          {kanji}
        </button>
      }
      content={
        <div className="text-xs p-2 font-bold">
          {keyword == null ? (
            <div className="w-32 my-2">
              Keyword Missing
              <br />
              <ExternalTextLink
                text="Report Bug."
                href={outLinks.discord}
              />{" "}
            </div>
          ) : isKanji ? (
            <KanjiLink keyword={keyword} kanji={kanji} />
          ) : (
            <span className="block">{keyword}</span>
          )}
          {phonetics.map((phonetic) => (
            <RomajiBadge key={phonetic} kana={phonetic} />
          ))}
        </div>
      }
    />
  );
};
