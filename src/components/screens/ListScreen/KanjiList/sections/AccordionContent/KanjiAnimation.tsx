/* eslint-disable @typescript-eslint/no-explicit-any */
import Raphael from "raphael";
(window as any).Raphael = Raphael;

import "dmak";
import { useEffect, useId, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";

const KanjiDMAK = ({ kanji }: { kanji: string }) => {
  const dmakInstanceRef = useRef<any>(null);
  const id = useId();
  const kanjiId = `${id}-${kanji}-draw`;
  const isMounted = useRef(false);

  useEffect(() => {
    if (dmakInstanceRef.current || isMounted.current) {
      return;
    }

    dmakInstanceRef.current = new (window as any).Dmak(kanji, {
      element: kanjiId,
      // uri: "/kanji/",
      uri: "http://kanjivg.tagaini.net/kanjivg/kanji/",
      height: 400,
      width: 400,
      step: 0.01,
      stroke: { attr: { stroke: "random" } },
    });
    isMounted.current = true;

    return () => {
      if (dmakInstanceRef.current) {
        (dmakInstanceRef.current as any)?.stop?.();
        dmakInstanceRef.current = null;
      }
    };
  }, [kanji, kanjiId]);

  return <div id={kanjiId} />;
};

const KanjiAnimation = ({ kanji }: { kanji: string }) => {
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
        Play <Play />
      </Button>

      <div className="flex w-full justify-center p-4 h-[400px]">
        <KanjiDMAK kanji={kanji} key={key} />
      </div>
    </div>
  );
};
export default KanjiAnimation;
