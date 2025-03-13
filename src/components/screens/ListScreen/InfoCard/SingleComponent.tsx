import { GenericPopover } from "@/components/common/GenericPopover";
import { RomajiBadge } from "@/components/common/RomajiBadge";
import { KanjiLink } from "./KanjiLink";

export const SingleComponent = ({
  kanji,
  keyword,
  phonetic,
  isKanji,
}: {
  kanji: string;
  keyword: string;
  phonetic?: string | string[];
  isKanji: boolean;
}) => {
  const phonetics: string[] =
    typeof phonetic === "string"
      ? [phonetic]
      : phonetic == null
        ? []
        : phonetic;
  return (
    <GenericPopover
      trigger={
        <button
          className={`flex flex-col m-1 kanji-font text-2xl border-2 border-dotted rounded-2xl p-1 ${phonetic ? "bg-lime-100 dark:bg-lime-800" : ""}`}
        >
          {kanji}
        </button>
      }
      content={
        <div className="text-xs uppercase p-2 font-bold">
          {isKanji ? (
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
