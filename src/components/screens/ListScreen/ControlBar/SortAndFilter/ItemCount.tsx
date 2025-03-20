import { useDeferredValue } from "react";
import { KANJI_COUNT } from "@/lib/constants";
import { SearchSettings } from "@/lib/settings";
import { shouldShowAllKanji } from "@/lib/kanji-display-utils";

import { useKanjiSearchCount } from "@/kanji-worker/kanji-worker-hooks";

const disclaimer =
  "Given your selected frequency data source, Kanji characters with no available rank  are excluded.";

const AllMatchMsg = () => {
  return (
    <div className="block w-full text-right text-xs">
      All available Kanji (
      {<span className="font-extrabold mx-1">{KANJI_COUNT}</span>}) characters
      match your applied filters.
    </div>
  );
};

const ItemCountComputed = ({ settings }: { settings: SearchSettings }) => {
  const data = useKanjiSearchCount(settings);

  if (data.data == null || data.error) {
    return <></>;
  }

  const textSuffix =
    settings.textSearch.text.length > 0 ? (
      <>
        Your Search Text is{" "}
        <span className="mx-1 font-extrabold">
          "{settings.textSearch.text}".
        </span>
      </>
    ) : (
      ""
    );

  if (data.data === 0) {
    return (
      <>
        {textSuffix} No Kanji characters match your applied filters. <br />
        {disclaimer}{" "}
      </>
    );
  }

  if (data.data >= KANJI_COUNT) {
    return <AllMatchMsg />;
  }

  return (
    <>
      {textSuffix} A total of{" "}
      <span className="font-extrabold mx-1">{data.data}</span> of
      <span className="font-extrabold mx-1"> {KANJI_COUNT}</span>
      Kanji characters match your applied filters. <br />
      {disclaimer}
    </>
  );
};

export const ItemCount = ({ settings }: { settings: SearchSettings }) => {
  const deferredSettings = useDeferredValue(settings);
  const shouldShowAll = shouldShowAllKanji(deferredSettings);

  if (shouldShowAll) {
    return <AllMatchMsg />;
  }

  return (
    <div className="block w-full text-right text-xs">
      <ItemCountComputed settings={deferredSettings} />
    </div>
  );
};
