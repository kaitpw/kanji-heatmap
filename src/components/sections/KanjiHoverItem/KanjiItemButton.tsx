import { forwardRef } from "react";
import { CircularFreqBadge } from "@/components/common/freq";
import { useItemBtnCn, useItemType } from "./kanji-item-button-hooks";
import { ExpandedBtnContent } from "./ExpandedBtnContent";
import {
  useBgSrc,
  useSetOpenedParam,
} from "@/components/dependent/routing/routing-hooks";
import { useGetKanjiInfoFn } from "@/kanji-worker/kanji-worker-hooks";
import { freqMap } from "@/lib/options/options-label-maps";

interface TriggerProps {
  onClick?: () => void;
  kanji: string;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  onFocus?: () => void;
  onBlur?: () => void;
  disableUrlUpdate?: boolean;
}

const KanjiItemButton = forwardRef<HTMLButtonElement, TriggerProps>(
  (props, ref) => {
    const { kanji, onClick, disableUrlUpdate = false, ...rest } = props;
    const btnCn = useItemBtnCn(kanji);
    const itemType = useItemType();
    const setKanji = useSetOpenedParam();
    const getInfo = useGetKanjiInfoFn();
    const bgSrc = useBgSrc();
    const kanjiInfo = getInfo?.(kanji);

    // Get frequency data
    const freqType =
      bgSrc === null || bgSrc === "none" ? "none" : (freqMap[bgSrc] ?? "none");
    const freqRank =
      freqType !== "none" && kanjiInfo?.frequency
        ? kanjiInfo.frequency[freqType]
        : undefined;

    const handleClick = () => {
      onClick?.();
      if (!disableUrlUpdate) {
        setKanji(kanji);
      }
    };

    if (itemType === "compact") {
      return (
        <button
          type="button"
          className={`${btnCn} relative`}
          onClick={handleClick}
          ref={ref}
          {...rest}
        >
          {kanji}

          {freqRank && <CircularFreqBadge freqRank={freqRank} />}
        </button>
      );
    }

    return (
      <button
        type="button"
        className={`${btnCn} relative`}
        onClick={handleClick}
        ref={ref}
        {...rest}
      >
        <ExpandedBtnContent kanji={kanji} />

        {freqRank && <CircularFreqBadge freqRank={freqRank} />}
      </button>
    );
  }
);

KanjiItemButton.displayName = "KanjiItemButton";

const KanjiItemSimpleButton = ({
  kanji,
  onClick,
}: {
  kanji: string;
  onClick: () => void;
}) => {
  const btnCn = useItemBtnCn(kanji);
  const setKanji = useSetOpenedParam();

  return (
    <button
      type="button"
      className={`${btnCn} flex flex-col justify-center items-center w-full `}
      onClick={() => {
        onClick();
        setKanji(kanji);
      }}
    >
      <ExpandedBtnContent kanji={kanji} />
    </button>
  );
};

export { KanjiItemButton, KanjiItemSimpleButton };
