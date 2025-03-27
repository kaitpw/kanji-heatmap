import { CopyButton } from "@/components/common/CopyButton";
import { SpeakButton } from "@/components/common/SpeakButton";
import { URL_PARAMS } from "@/lib/settings/url-params";

export const KanjiActionsBtns = ({ kanji }: { kanji: string }) => {
  return (
    <>
      <CopyButton
        textToCopy={`https://kanjiheatmap.com/?${URL_PARAMS.openKanji}=${kanji}`}
        iconType="link"
      />
      <CopyButton textToCopy={kanji} iconType="clipboard" />
      <SpeakButton word={kanji} iconType="volume-2" />
    </>
  );
};
