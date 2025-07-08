import type { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { useSpeak } from "@/hooks/use-jp-speak";
import { AudioLines, Headphones, Volume2 } from "../icons";

type AudioIconType = "audio-lines" | "volume-2" | "headphones";
const audioIcons: Record<AudioIconType, ReactNode> = {
  "audio-lines": <AudioLines />,
  "volume-2": <Volume2 />,
  headphones: <Headphones />,
};
export const TtsSpeakButton = ({
  text, // this should be kana
  iconType,
  directText,
}: {
  text: string;
  iconType: AudioIconType;
  directText?: boolean;
}) => {
  const { speak, isLoading } = useSpeak(text, { directText });

  return (
    <Button
      variant={"outline"}
      size="icon"
      className="h-8 w-8 relative rounded-xl"
      onClick={() => {
        speak();
      }}
      disabled={isLoading}
    >
      {audioIcons[iconType]}
    </Button>
  );
};
