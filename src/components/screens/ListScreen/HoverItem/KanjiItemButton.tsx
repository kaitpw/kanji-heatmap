import { forwardRef } from "react";

import {
  useGetKanjiInfoFn,
  useKanjiInfo,
} from "@/kanji-worker/kanji-worker-provider";
import {
  freqCategoryCn,
  getFreqCategory,
  ITEM_CARD_BG_CN,
  JLPTListItems,
} from "@/lib/constants";
import * as wanakana from "wanakana";
import { freqMap } from "@/lib/frequency-rank";
import { KanjiInfoFrequency } from "@/lib/kanji-worker-constants";
import { useItemSettings } from "@/providers/item-settings-provider";

interface TriggerProps {
  onClick?: () => void;
  kanji: string;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  onFocus?: () => void;
  onBlur?: () => void;
}

const cn = `h-95 w-full p-1.5 rounded-lg text-2xl ml-1 border-4 bg-opacity-100 ${ITEM_CARD_BG_CN} z-0 hover:border-[#2effff] transition-all transition-discrete duration-500`;
const ellipsisCn =
  "!text-ellipsis !text-nowrap !w-24 !overflow-hidden !whitespace-nowrap";
const loadingCn = `${cn} animate-pulse h-full !bg-lime-500 !border-3`;

const ExpandedBtnContent = ({ kanji }: { kanji: string }) => {
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
      <span className="kanji-font text-5xl block -mt-1">{kanji}</span>
      <span
        className={`${ellipsisCn} block text-xs font-extrabold uppercase mt-1`}
      >
        {keyword}
      </span>
    </>
  );
};

const useItemBtnCn = (kanji: string) => {
  const getInfo = useGetKanjiInfoFn();
  const itemSettings = useItemSettings();
  const kanjiInfo = getInfo?.(kanji);
  const dontIncludeFreq =
    itemSettings.backgroundColorSettingDataSource == null ||
    itemSettings.backgroundColorSettingDataSource == "None";

  const kanjiFreq = useKanjiInfo(
    kanji,
    dontIncludeFreq ? "none" : "frequency-ranks"
  );

  if (
    kanjiInfo == null ||
    (dontIncludeFreq == false && kanjiFreq.data == null)
  ) {
    return { loadingCn };
  }

  const dontIncludeJLPT = itemSettings.borderColorAttached === false;

  const freqData = kanjiFreq.data as Record<keyof KanjiInfoFrequency, number>;
  const freqType = freqMap[itemSettings.backgroundColorSettingDataSource];
  const freqRank = freqType ? freqData[freqType] : undefined;
  const freqRankCategory = getFreqCategory(freqRank);

  const textColor =
    freqRankCategory > 3 || dontIncludeFreq
      ? "text-white"
      : "dark:text-white text-black";
  const { jlpt } = kanjiInfo;

  const border = dontIncludeJLPT
    ? "border-[#fb02a8]"
    : JLPTListItems[jlpt].cnBorder;

  const bgColor =
    freqRankCategory === 0 && dontIncludeFreq === false
      ? "dark:bg-black bg-white"
      : freqCategoryCn[freqRankCategory];

  const btnCnRaw = `${cn} ${border} ${bgColor} ${textColor}`;
  const btnCn =
    itemSettings.cardType === "compact"
      ? `${btnCnRaw} kanji-font`
      : `${btnCnRaw} border-8 flex flex-col justify-center items-center`;

  return { btnCn, itemType: itemSettings.cardType };
};

export const KanjiItemButton = forwardRef<HTMLButtonElement, TriggerProps>(
  (props, ref) => {
    const { kanji, ...rest } = props;
    const { loadingCn, btnCn, itemType } = useItemBtnCn(kanji);

    if (loadingCn) {
      return (
        <button
          ref={ref}
          className={loadingCn}
          role="status"
          aria-label="loading"
        />
      );
    }

    if (itemType === "compact") {
      return (
        <button className={btnCn} ref={ref} {...rest}>
          {kanji}
        </button>
      );
    }

    return (
      <button className={btnCn} ref={ref} {...rest}>
        <ExpandedBtnContent kanji={kanji} />
      </button>
    );
  }
);
