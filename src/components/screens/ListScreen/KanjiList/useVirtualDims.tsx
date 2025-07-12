import { useWindowSize } from "@/hooks/use-window-size";

export const TILE_SIZE = {
  sm: {
    width: 70,
    height: 75,
  },
  lg: {
    width: 140,
    height: 150,
  },
};

export const useVirtualListDims = (
  itemCount: number,
  size: "compact" | "expanded"
) => {
  const [windowWidth, windowHeight] = useWindowSize();
  const tileSize = size === "compact" ? TILE_SIZE.sm : TILE_SIZE.lg;

  const cols = Math.floor(windowWidth / tileSize.width);
  const rows = Math.ceil(itemCount / cols);
  const idealRows = Math.ceil(windowHeight / tileSize.height);
  const itemNums = cols * idealRows;

  return {
    cols,
    rows,
    itemSize: tileSize.height,
    width: tileSize.width,
    itemNums,
    idealRows,
  };
};
