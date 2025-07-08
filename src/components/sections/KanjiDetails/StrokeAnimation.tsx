/* eslint-disable @typescript-eslint/no-explicit-any */
import Raphael from "raphael";
import "dmak";
import { useEffect, useId, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import assetsPaths from "@/lib/assets-paths";
import { PlayCircle, Snail } from "@/components/icons";

type AnimationSpeed = "fast" | "slow";

const SPEEDS: Record<AnimationSpeed, { rate: number }> = {
  fast: { rate: 0.0095 },
  slow: { rate: 0.022 },
};

const SVG_SIZE = 280;
const CONTAINER_CN = `flex w-full justify-center my-4 h-[${SVG_SIZE}px]`;

const KanjiDMAK = ({
  kanji,
  step = SPEEDS.slow.rate,
}: {
  kanji: string;
  step?: number;
}) => {
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  const dmakInstanceRef = useRef<any>(null);
  const id = useId();
  const kanjiId = `${id}-${kanji}-draw`;

  useEffect(() => {
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    (window as any).Raphael = Raphael;

    if (dmakInstanceRef.current) {
      return;
    }

    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    dmakInstanceRef.current = new (window as any).Dmak(kanji, {
      element: kanjiId,
      uri: import.meta.env.MODE === "development" ||
          window.location.protocol === "http:"
        ? assetsPaths.dev.KANJI_SVGS
        : assetsPaths.KANJI_SVGS,
      height: SVG_SIZE,
      width: SVG_SIZE,
      step: step,

      stroke: { attr: { stroke: "random" } },
    });

    return () => {
      // biome-ignore lint/suspicious/noExplicitAny: <explanation>
      (window as any).Raphael = null;
    };
  }, [kanji, kanjiId, step]);

  return <div id={kanjiId} />;
};

export const StrokeAnimation = ({ kanji }: { kanji: string }) => {
  const [key, setKey] = useState(1);
  const [speed, setSpeed] = useState<AnimationSpeed>("fast");

  return (
    <div className="p-4">
      {/** key needed to redraw on change  */}
      <div
        className={CONTAINER_CN}
        style={{ height: SVG_SIZE }}
        key={`${kanji}-${speed}-${key}`}
      >
        <KanjiDMAK kanji={kanji} step={SPEEDS[speed].rate} />
      </div>
      <div className="flex justify-center space-x-2">
        <Button
          onClick={() => {
            setSpeed("fast");
            setKey((x) => {
              return x + 1;
            });
          }}
        >
          <PlayCircle className="scale-150" />
          <span className="sr-only">Animate</span>
        </Button>
        <Button
          onClick={() => {
            setSpeed("slow");
            setKey((x) => {
              return x + 1;
            });
          }}
          variant={"secondary"}
        >
          <Snail className="scale-150" />{" "}
          <span className="sr-only">Animate Slowly</span>
        </Button>
      </div>
    </div>
  );
};

export default StrokeAnimation;
