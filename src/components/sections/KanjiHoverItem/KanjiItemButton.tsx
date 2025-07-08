import { forwardRef } from "react";
import { ReportBugIconBtn } from "@/components/common/ReportBugIconBtn";
import { CircularJLPTBadge } from "@/components/common/jlpt/CircularJLPTBadge";
import {
  loadingCn,
  useItemBtnCn,
  useItemType,
} from "./kanji-item-button-hooks";
import { ExpandedBtnContent } from "./ExpandedBtnContent";
import { useSetOpenedParam } from "@/components/dependent/routing/routing-hooks";
import { useGetKanjiInfoFn } from "@/kanji-worker/kanji-worker-hooks";

export const KanjiBtnErrorFallback = () => {
  return (
    <div className={`${loadingCn} h-full`}>
      <ReportBugIconBtn />
    </div>
  );
};

interface TriggerProps {
  onClick?: () => void;
  kanji: string;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  onFocus?: () => void;
  onBlur?: () => void;
}

const KanjiItemButton = forwardRef<HTMLButtonElement, TriggerProps>(
  (props, ref) => {
    const { kanji, onClick, ...rest } = props;
    const btnCn = useItemBtnCn(kanji);
    const itemType = useItemType();
    const setKanji = useSetOpenedParam();
    const getInfo = useGetKanjiInfoFn();
    const kanjiInfo = getInfo?.(kanji);

    if (itemType === "compact") {
      return (
        <button
          type="button"
          className={`${btnCn} relative`}
          onClick={() => {
            onClick?.();
            setKanji(kanji);
          }}
          ref={ref}
          {...rest}
        >
          {kanji}
          {kanjiInfo?.jlpt && kanjiInfo.jlpt !== "none" && (
            <CircularJLPTBadge jlpt={kanjiInfo.jlpt} />
          )}
        </button>
      );
    }

    return (
      <button
        type="button"
        className={`${btnCn} relative`}
        onClick={() => {
          onClick?.();
          setKanji(kanji);
        }}
        ref={ref}
        {...rest}
      >
        <ExpandedBtnContent kanji={kanji} />
        {kanjiInfo?.jlpt && kanjiInfo.jlpt !== "none" && (
          <CircularJLPTBadge jlpt={kanjiInfo.jlpt} />
        )}
      </button>
    );
  },
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
