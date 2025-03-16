import {
  randomCn,
  randomCn2,
  randomCnColorful,
  randomCn2Colorful,
} from "@/lib/random-cn";
import { useVirtualListDims } from "./useVirtualDims";
import { useDeferredItemSettings } from "@/providers/item-settings-provider";
import React from "react";

const ESTIMATE_ITEM_COUNT = 125;

const LoadingKanjisRaw = ({
  type = "gradient",
}: {
  type?: "colorful" | "gradient";
}) => {
  const itemSettings = useDeferredItemSettings();
  // TODO: Generate count depending on window size
  const isCompact = itemSettings.cardType === "compact";

  const { itemSize, width, listHeight, cols, itemNums } = useVirtualListDims(
    ESTIMATE_ITEM_COUNT,
    itemSettings.cardType
  );

  const count = itemNums + cols;

  const itemStyle = isCompact
    ? { height: itemSize - 6, width: width - 6 }
    : { height: itemSize - 4, width: width - 5 };

  const containerStyle = isCompact
    ? { height: listHeight }
    : { height: listHeight };

  return (
    <div
      role="status"
      style={containerStyle}
      className="flex flex-wrap items-start justify-start"
    >
      <div className="sr-only">loading</div>
      {new Array(count).fill(null).map((_, i) => {
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
            className={`animate-pulse m-1 transition-all transition-discrete ${colorCn}`}
          />
        );
      })}
    </div>
  );
};

const LoadingKanjis = React.memo(LoadingKanjisRaw);

export default LoadingKanjis;
