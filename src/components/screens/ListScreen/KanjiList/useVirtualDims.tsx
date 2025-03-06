import { useWindowSize } from "@react-hook/window-size"; // Debounced values

export const TILE_SIZE = {
  sm: {
    width: 50,
    height: 55,
  },
  lg: {
    width: 135,
    height: 118,
  },
};

export const HEADER_HEIGHT = 100;

export const useVirtualListDims = (
  itemCount: number,
  size: "compact" | "expanded"
) => {
  const [windowWidth, windowHeight] = useWindowSize();
  const tileSize = size === "compact" ? TILE_SIZE.sm : TILE_SIZE.lg;

  const cols = Math.floor(windowWidth / tileSize.width);
  const rows = Math.ceil(itemCount / cols);
  const listHeight = windowHeight - HEADER_HEIGHT;

  return {
    cols,
    rows,
    listHeight,
    itemSize: tileSize.height,
    width: tileSize.width,
  };
};
