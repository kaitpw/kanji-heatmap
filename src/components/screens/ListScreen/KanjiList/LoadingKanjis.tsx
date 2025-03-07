import { randomCn, randomCn2 } from "@/lib/jlpt";
import { useVirtualListDims } from "./useVirtualDims";
import { useItemSettings } from "@/providers/item-settings-provider";
import React from "react";

const ESTIMATE_ITEM_COUNT = 125;

const LoadingKanjisRaw = () => {
  const itemSettings = useItemSettings();
  // TODO: Generate count depending on window size
  const isCompact = itemSettings.cardType === "compact";

  const { itemSize, width, listHeight, cols, itemNums } = useVirtualListDims(
    ESTIMATE_ITEM_COUNT,
    itemSettings.cardType
  );

  const count = itemNums + cols * 2;

  const itemStyle = isCompact
    ? { height: itemSize - 3, width: width - 4 }
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
        return (
          <div
            key={i}
            style={itemStyle}
            className={`animate-pulse m-1 transition-all transition-discrete ${isCompact ? randomCn2() : randomCn()}`}
          />
        );
      })}
    </div>
  );
};

const LoadingKanjis = React.memo(LoadingKanjisRaw);

export default LoadingKanjis;
