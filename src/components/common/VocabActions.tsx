import { GenericPopover } from "@/components/common/GenericPopover";

import { SpeakButton } from "@/components/common/SpeakButton";
import { CopyButton } from "@/components/common/CopyButton";
import { ReactNode } from "react";
import { InfoIcon } from "../icons";

const IconMeanings = ({ btn, text }: { btn: ReactNode; text: string }) => {
  return (
    <>
      <div className="flex items-center w-full justify-left">
        {btn}
        <span className="ml-2">{text}</span>
      </div>
    </>
  );
};

export const VocabActions = ({
  word,
  kana,
}: {
  word: string;
  kana: string;
}) => {
  return (
    <div className="flex relative flex-wrap justify-center space-x-1 items-center p-2">
      <CopyButton textToCopy={word} iconType={"clipboard"} />
      <SpeakButton word={kana} iconType={"volume-2"} />
      <GenericPopover
        trigger={
          <InfoIcon className="inline-block absolute top-2 right-2" size={18} />
        }
        content={
          <div className="flex flex-col w-full text-xs p-2 space-y-1">
            <IconMeanings
              btn={<CopyButton textToCopy={kana} iconType={"copy"} />}
              text={"Copy Kana"}
            />
            <IconMeanings
              btn={<CopyButton textToCopy={word} iconType={"clipboard"} />}
              text={"Copy Word"}
            />
            <IconMeanings
              btn={<SpeakButton word={kana} iconType={"volume-2"} />}
              text={"Listen to Kana reading"}
            />
            <IconMeanings
              btn={<SpeakButton word={word} iconType="audio-lines" />}
              text={"Listen to default reading"}
            />
          </div>
        }
      />
    </div>
  );
};
