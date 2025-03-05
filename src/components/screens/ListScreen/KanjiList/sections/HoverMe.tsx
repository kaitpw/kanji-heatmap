import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
  HoverCardArrow,
} from "@/components/ui/hover-card";
import React, { forwardRef, useCallback } from "react";
import { KanjiCard, SmallKanjiCard } from "./KanjiCard";
import {
  useGetKanjiInfoFn,
  useKanjiInfo,
} from "@/providers/kanji-worker-provider";
import {
  freqCategoryCn,
  getFreqCategory,
  JLPTListItems,
} from "@/lib/constants";
import { useCardSettings } from "@/providers/card-settings-provider";
import * as wanakana from "wanakana";
import { freqMap } from "@/lib/frequency-rank";
import { KanjiInfoFrequency } from "@/lib/kanji-worker-constants";

interface TriggerProps {
  onClick?: () => void;
  kanji: string;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  onFocus?: () => void;
  onBlur?: () => void;
}

const HOVER_OPEN_DELAY = 350;
const HOVER_CLOSE_DELAY = 200;
const cn =
  "h-95 w-full p-1.5 rounded-lg text-2xl mr-1 border-4 bg-opacity-100 bg-[#fb02a8] z-0 hover:border-[#2effff] transition-all transition-discrete duration-500";

const KanjiItemButton = forwardRef<HTMLButtonElement, TriggerProps>(
  (props, ref) => {
    const { kanji, ...rest } = props;
    const getInfo = useGetKanjiInfoFn();

    const cardSettings = useCardSettings();
    const dontIncludeFreq =
      cardSettings.backgroundColorSettingDataSource == null ||
      cardSettings.backgroundColorSettingDataSource == "None";

    const kanjiInfo = getInfo?.(kanji);
    const kanjiFreq = useKanjiInfo(
      kanji,
      dontIncludeFreq ? "none" : "frequency-ranks"
    );

    const dontIncludeJLPT = cardSettings.borderColorAttached === false;

    if (
      kanjiInfo == null ||
      (dontIncludeFreq == false && kanjiFreq.data == null)
    ) {
      return (
        <button ref={ref} className={`${cn} animate-pulse border-lime-300`}>
          {kanji}
        </button>
      );
    }

    const freqData = kanjiFreq.data as Record<keyof KanjiInfoFrequency, number>;
    const freqType = freqMap[cardSettings.backgroundColorSettingDataSource];
    const freqRank = freqType ? freqData[freqType] : undefined;
    const freqRankCategory = getFreqCategory(freqRank);

    const textColor =
      freqRankCategory > 3 || dontIncludeFreq
        ? "text-white"
        : "dark:text-white text-black";
    const { jlpt, on, kun, keyword } = kanjiInfo;

    const border = dontIncludeJLPT
      ? "border-[#fb02a8]"
      : JLPTListItems[jlpt].cnBorder;

    const bgColor =
      freqRankCategory === 0 && dontIncludeFreq === false
        ? "dark:bg-black bg-white"
        : freqCategoryCn[freqRankCategory];

    if (cardSettings.cardType === "compact") {
      return (
        <button
          className={`${cn} ${border} ${bgColor} ${textColor} kanji-font`}
          ref={ref}
          {...rest}
        >
          {kanji}
        </button>
      );
    }

    return (
      <button
        className={`${cn} ${border} ${bgColor} ${textColor} border-8 flex flex-col justify-center items-center`}
        ref={ref}
        {...rest}
      >
        <span className="kanji-font text-sm block text-ellipsis text-nowrap w-24 overflow-hidden">
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
        <span className="text-xs font-extrabold uppercase mt-1 block text-ellipsis text-nowrap w-24 overflow-hidden">
          {keyword}
        </span>
      </button>
    );
  }
);

const HoverMeRaw = ({
  trigger,
  isOpen,
  setOpen,
  openDrawer,
}: {
  trigger: string;
  isOpen: boolean;
  setOpen: (kanji: string | null) => void;
  openDrawer: (kanji: string | null) => void;
}) => {
  const openTimeoutRef = React.useRef<NodeJS.Timeout>();
  const closeTimeoutRef = React.useRef<NodeJS.Timeout>();

  const handleOpen = useCallback(() => {
    clearTimeout(closeTimeoutRef.current);
    openTimeoutRef.current = setTimeout(() => {
      setOpen(trigger);
    }, HOVER_OPEN_DELAY);
  }, [setOpen, trigger]);

  const handleClose = useCallback(() => {
    clearTimeout(openTimeoutRef.current);
    closeTimeoutRef.current = setTimeout(() => {
      setOpen(null);
    }, HOVER_CLOSE_DELAY);
  }, [setOpen]);

  return (
    <>
      <HoverCard open={isOpen}>
        <HoverCardTrigger asChild>
          <KanjiItemButton
            kanji={trigger}
            onClick={() => {
              setOpen(null);
              openDrawer(trigger);
            }}
            onMouseEnter={handleOpen}
            onMouseLeave={handleClose}
            onBlur={handleClose}
          />
        </HoverCardTrigger>
        <HoverCardContent className="p-1 w-[392px] relative">
          <HoverCardArrow />
          <div className="hidden [@media(min-height:800px)]:[@media(min-width:400px)]:block w-96">
            <KanjiCard kanji={trigger} />
          </div>
          <div className="flex items-center justify-center [@media(min-height:800px)]:[@media(min-width:400px)]:hidden">
            <SmallKanjiCard kanji={trigger} />
          </div>
        </HoverCardContent>
      </HoverCard>
    </>
  );
};

const HoverMe = React.memo(HoverMeRaw);

export default HoverMe;
