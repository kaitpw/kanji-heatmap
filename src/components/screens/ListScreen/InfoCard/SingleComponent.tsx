import { GenericPopover } from "@/components/common/GenericPopover";
import { RomajiBadge } from "@/components/common/RomajiBadge";

export const SingleComponent = ({
  kanji,
  keyword,
  phonetic,
}: {
  kanji: string;
  keyword: string;
  phonetic?: string;
}) => {
  return (
    <GenericPopover
      trigger={
        <button
          className={`flex flex-col m-1 kanji-font text-4xl border-2 border-dotted rounded-3xl p-2 ${phonetic ? "bg-lime-100 dark:bg-lime-800" : ""}`}
        >
          {kanji}
        </button>
      }
      content={
        <div className="text-xs uppercase p-2 font-bold">
          <span className="block">{keyword}</span>{" "}
          {phonetic && <RomajiBadge kana={phonetic} />}{" "}
        </div>
      }
    />
  );
};
