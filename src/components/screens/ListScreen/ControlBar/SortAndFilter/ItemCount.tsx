import { useDeferredValue } from "react";
import { KANJI_COUNT } from "@/lib/options/constants";
import { SearchSettings } from "@/lib/settings/settings";
import { shouldShowAllKanji } from "@/lib/results-utils";

import { useKanjiSearchCount } from "@/kanji-worker/kanji-worker-hooks";

const disclaimer =
  "Given your selected frequency data source, Kanji characters with no available rank are excluded.";

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
    return null;
  }

  const textPrefix =
    settings.textSearch.text.length > 0 ? (
      <>
        Your Search Text is{" "}
        <span className="mx-1 font-extrabold">
          {`"${settings.textSearch.text}"`}.
        </span>
      </>
    ) : (
      ""
    );

  if (data.data >= KANJI_COUNT) {
    return <AllMatchMsg />;
  }

  const textSuffix =
    settings.filterSettings.freq.source !== "none" ? disclaimer : null;

  if (data.data === 0) {
    return (
      <>
        {textPrefix} No Kanji characters match your applied filters. <br />
        {textSuffix}
      </>
    );
  }

  return (
    <>
      {textPrefix} A total of{" "}
      <span className="font-extrabold mx-1">{data.data}</span> of
      <span className="font-extrabold mx-1"> {KANJI_COUNT}</span>
      Kanji characters match your applied filters. <br />
      {textSuffix}
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
