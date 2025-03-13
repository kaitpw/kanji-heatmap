import { useWindowSize } from "@/hooks/use-window-size";
import { HEADER_HEIGHT, TILE_SIZE } from "@/lib/constants";

export const useVirtualListDims = (
  itemCount: number,
  size: "compact" | "expanded"
) => {
  const [windowWidth, windowHeight] = useWindowSize();
  const tileSize = size === "compact" ? TILE_SIZE.sm : TILE_SIZE.lg;

  const cols = Math.floor(windowWidth / tileSize.width);
  const rows = Math.ceil(itemCount / cols);
  const listHeight = windowHeight - HEADER_HEIGHT;
  const itemNums = cols * Math.ceil(windowHeight / tileSize.height);

  return {
    cols,
    rows,
    listHeight,
    itemSize: tileSize.height,
    width: tileSize.width,
    itemNums,
  };
};
