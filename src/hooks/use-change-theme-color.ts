import { useCallback, useLayoutEffect, useRef } from "react";

const LOCAL_STORAGE_THEME_COLOR_KEY = "theme-color";

// Only store RGB values
export const themeColorsRgb = [
  "251, 2, 168", // pink
  "25, 60, 184", // blue
  "170, 0, 255", // purple
  "0, 170, 255", // light blue
];

// rgbToHex(color)
export const useChangeThemeColor = () => {
  const colorIdRef = useRef(0);

  const setThemeColor = useCallback((colorIndex: number) => {
    document.documentElement.style.setProperty(
      "--theme-color-selected",
      themeColorsRgb[colorIndex]
    );
    localStorage.setItem(LOCAL_STORAGE_THEME_COLOR_KEY, colorIndex.toString());
  }, []);

  const nextThemeColor = useCallback(() => {
    colorIdRef.current = (colorIdRef.current + 1) % themeColorsRgb.length;
    setThemeColor(colorIdRef.current);
  }, [setThemeColor]);

  useLayoutEffect(() => {
    const themeColor = Number(
      localStorage.getItem(LOCAL_STORAGE_THEME_COLOR_KEY)
    );

    if (Number.isNaN(themeColor)) {
      setThemeColor(0);
      return;
    }

    setThemeColor(themeColor);
  }, [setThemeColor]);

  return nextThemeColor;
};
