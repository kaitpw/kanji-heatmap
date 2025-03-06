import { HEADER_HEIGHT, TILE_SIZE } from "@/lib/constants";
import { useWindowSize } from "@react-hook/window-size"; // Debounced values

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
