import { useVirtualListDims } from "./useVirtualDims";
import { useItemSettings } from "@/providers/item-settings-provider";

const LoadingKanjis = () => {
  const itemSettings = useItemSettings();
  const { itemSize, width, listHeight } = useVirtualListDims(
    200,
    itemSettings.cardType
  );

  return (
    <div
      role="status"
      className="w-full flex flex-wrap justify-center mx-0 px-[12px]"
      style={{ maxHeight: listHeight }}
    >
      <div className="sr-only">loading</div>
      {new Array(200).fill(null).map((_, i) => {
        return (
          <div
            key={i}
            style={{ height: itemSize, width }}
            className={`animate-pulse rounded-lg ml-1 mb-1 bg-cyan-400 border-8 border-pink-600`}
          />
        );
      })}
    </div>
  );
};

export default LoadingKanjis;
