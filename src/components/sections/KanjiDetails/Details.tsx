import { lazy, Suspense } from "react";
import { useGetKanjiInfoFn } from "@/kanji-worker/kanji-worker-hooks";
import { useKanjiInfo } from "@/kanji-worker/kanji-worker-hooks";
import type { GeneralKanjiItem } from "@/lib/kanji/kanji-info-types";
import { DefaultErrorFallback, ErrorBoundary } from "@/components/error";
import SimpleAccordion from "@/components/common/SimpleAccordion";
import { BasicLoading } from "@/components/common/BasicLoading";
import { LinksOutItems } from "@/components/common/LinksOutItems";
import { FrequencyInfo } from "./FrequencyInfo";
import { General } from "./General";
import { MiscellaneousCallout } from "@/components/common/RequestForSuggestion";
import { Button } from "@/components/ui/button";
import { GenericPopover } from "@/components/common/GenericPopover";

import useKeyboardListener from "@/hooks/use-keyboard-listener";
import { useNextPrevKanji } from "@/hooks/use-next-prev-kanji";
import { useSetOpenedParam } from "@/components/dependent/routing/routing-hooks";
import { GLOBAL_KEYBOARD_SHORTCUTS } from "@/lib/options/constants";
import { useChangeFont } from "@/hooks/use-change-font";
import { Keyboard } from "@/components/icons";
import { useSpeak } from "@/hooks/use-jp-speak";

const StrokeAnimation = lazy(() => import("./StrokeAnimation"));

const kbdClass =
  "h-6 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[12px] font-medium opacity-100 sm:flex";

const IconMeanings = ({
  kbd,
  text,
  onClick,
}: {
  kbd: string;
  text: string;
  onClick: () => void;
}) => {
  return (
    <>
      <button
        onClick={onClick}
        className="flex items-center w-full justify-left"
        type="button"
      >
        <kbd className={kbdClass}>{kbd}</kbd>
        <span className="ml-2 text-xs">{text}</span>
      </button>
    </>
  );
};

const KanjiKeyboardShortcuts = ({ kana }: { kana: string }) => {
  const kanjis = useNextPrevKanji(kana);
  const setOpen = useSetOpenedParam();
  const nextFont = useChangeFont();
  const { speak: speakKanji } = useSpeak(kana);
  const prevKanji = () => {
    if (kanjis?.prev) {
      setOpen(kanjis?.prev);
    }
  };
  const nextKanji = () => {
    if (kanjis?.next) {
      setOpen(kanjis?.next);
    }
  };

  useKeyboardListener({
    ArrowLeft: prevKanji,
    ArrowRight: nextKanji,
    0: speakKanji,
  });

  if (kanjis == null) {
    return (
      <Button
        variant={"outline"}
        size="icon"
        className="h-8 w-8 relative rounded-xl"
        disabled={true}
      >
        <Keyboard />
      </Button>
    );
  }

  return (
    <GenericPopover
      trigger={
        <Button
          variant={"outline"}
          size="icon"
          className="h-8 w-8 relative rounded-xl"
        >
          <Keyboard />
        </Button>
      }
      content={
        <div className="p-2 flex flex-col space-y-1">
          <IconMeanings
            kbd="0"
            text="Kanji Default Reading"
            onClick={speakKanji}
          />
          <IconMeanings
            kbd={GLOBAL_KEYBOARD_SHORTCUTS.nextFont}
            onClick={nextFont}
            text="Change font"
          />
          <IconMeanings kbd="→" text="Next Kanji" onClick={nextKanji} />
          <IconMeanings kbd="←" text="Previous Kanji" onClick={prevKanji} />
        </div>
      }
    />
  );
};

export const KanjiDetails = ({ kanji }: { kanji: string }) => {
  const getInfo = useGetKanjiInfoFn();
  const generalInfo = useKanjiInfo(kanji, "general");

  if (getInfo == null) {
    return <BasicLoading />;
  }

  const data = getInfo(kanji);

  if (data == null) {
    return <DefaultErrorFallback message="Failed to load data." />;
  }

  // Get the first kun reading for TTS, fallback to kanji if no kun readings
  const kanaForTTS = (generalInfo.data as GeneralKanjiItem)?.allKun?.[0] ||
    kanji;

  return (
    <div className="py-2 mx-2">
      <SimpleAccordion trigger={"General"} defaultOpen={true}>
        <General kanji={kanji} generalInfo={generalInfo} />
      </SimpleAccordion>
      <SimpleAccordion trigger={"Stroke Order Animation"}>
        <ErrorBoundary details="StrokeAnimation in KanjiDetails">
          <Suspense fallback={<BasicLoading />}>
            <StrokeAnimation kanji={kanji} />
          </Suspense>
        </ErrorBoundary>
      </SimpleAccordion>
      <SimpleAccordion trigger={"Frequency Ranks"}>
        <FrequencyInfo freqRankInfo={data.frequency} />
      </SimpleAccordion>
      <MiscellaneousCallout />
      <div className="w-full flex justify-start space-x-1">
        <LinksOutItems />
        <KanjiKeyboardShortcuts kana={kanaForTTS} />
      </div>
    </div>
  );
};
