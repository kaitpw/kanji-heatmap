import {
  randomCn,
  randomCn2,
  randomCnColorful,
  randomCn2Colorful,
} from "@/lib/random-cn";
import { useVirtualListDims } from "./useVirtualDims";
import React from "react";
import { useDeferredItemSettings } from "@/providers/item-settings-hooks";

const ESTIMATE_ITEM_COUNT = 125;

const LoadingKanjisRaw = ({
  type = "gradient",
}: {
  type?: "colorful" | "gradient";
}) => {
  const itemSettings = useDeferredItemSettings();
  const isCompact = itemSettings.cardType === "compact";
  const { itemSize, width, listHeight, cols, idealRows } = useVirtualListDims(
    ESTIMATE_ITEM_COUNT,
    itemSettings.cardType
  );

  const itemStyle = isCompact
    ? { minHeight: itemSize - 6, minWidth: width - 6 }
    : { minHeight: itemSize, minWidth: width };

  return (
    <div
      role="status"
      style={{ height: listHeight }}
      className="flex flex-wrap items-start justify-start"
    >
      <div className="sr-only">loading</div>

      {new Array(idealRows).fill(null).map((_, i) => {
        return (
          <div
            className="flex items-center justify-center w-full px-1"
            key={`row-${i}`}
          >
            {new Array(cols).fill(null).map((_, i) => {
              const colorCn = isCompact
                ? type === "colorful"
                  ? randomCn2Colorful()
                  : randomCn2()
                : type === "colorful"
                  ? randomCnColorful()
                  : randomCn();
              return (
                <div
                  key={i}
                  style={itemStyle}
                  className={`animate-pulse transition-all transition-discrete  mr-1 mb-1 grow ${colorCn}`}
                />
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

const LoadingKanjis = React.memo(LoadingKanjisRaw);

export default LoadingKanjis;
