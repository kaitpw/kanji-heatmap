import wanakana from "@/lib/wanakana-adapter";
import { useGetKanjiInfoFn } from "@/kanji-worker/kanji-worker-hooks";
import { ellipsisCn, loadingCn } from "./kanji-item-button-hooks";

export const ExpandedBtnContent = ({ kanji }: { kanji: string }) => {
  const getInfo = useGetKanjiInfoFn();
  const kanjiInfo = getInfo?.(kanji);

  if (kanjiInfo == null) {
    return (
      <span
        className={`${loadingCn} block`}
        role="status"
        aria-label="loading"
      />
    );
  }

  const { on, kun, keyword } = kanjiInfo;

  return (
    <>
      <span className={`${ellipsisCn} block text-sm kanji-font`}>
        {wanakana.toKatakana(on)}
        <>
          {kun && kun.length > 0 ? (
            <>
              {" • "}
              {kun}
            </>
          ) : (
            ""
          )}
        </>
      </span>
      <span className="kanji-font text-5xl block">{kanji}</span>
      <span
        className={`${ellipsisCn} block text-xs font-extrabold uppercase mt-1 romaji-font`}
      >
        {keyword}
      </span>
    </>
  );
};
