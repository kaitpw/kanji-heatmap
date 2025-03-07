/* eslint-disable @typescript-eslint/no-explicit-any */
import Raphael from "raphael";

import "dmak";
import { useEffect, useId, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";

const SVG_SIZE = 300;
const CONTAINER_CN = `flex w-full justify-center m-4 h-[${SVG_SIZE}px]`;

const KanjiDMAK = ({ kanji }: { kanji: string }) => {
  const dmakInstanceRef = useRef<any>(null);
  const id = useId();
  const kanjiId = `${id}-${kanji}-draw`;

  useEffect(() => {
    (window as any).Raphael = Raphael;

    if (dmakInstanceRef.current) {
      return;
    }

    dmakInstanceRef.current = new (window as any).Dmak(kanji, {
      element: kanjiId,
      // uri: "/kanji/",
      uri: "https://kanjivg.tagaini.net/kanjivg/kanji/",
      height: SVG_SIZE,
      width: SVG_SIZE,
      step: 0.01,
      stroke: { attr: { stroke: "random" } },
    });

    return () => {
      (window as any).Raphael = null;
    };
  }, [kanji, kanjiId]);

  return <div id={kanjiId} />;
};

export const StrokeAnimation = ({ kanji }: { kanji: string }) => {
  const [key, setKey] = useState(1);
  return (
    <div className="p-4">
      <Button
        onClick={() => {
          setKey((x) => {
            return x + 1;
          });
        }}
        variant={"outline"}
      >
        Write <Play />
      </Button>

      <div className={CONTAINER_CN} style={{ height: SVG_SIZE }}>
        <KanjiDMAK kanji={kanji} key={key} />
      </div>
    </div>
  );
};

export default StrokeAnimation;
