export type JLTPTtypes = "n1" | "n2" | "n3" | "n4" | "n5";

export const JLPTListItems: Record<
  JLTPTtypes,
  { cn: string; color: string; label: string }
> = {
  n1: { cn: "bg-lime-400", color: "lime", label: "N1" },
  n2: { cn: "bg-pink-400", color: "pink", label: "N2" },
  n3: { cn: "bg-blue-400", color: "blue", label: "N3" },
  n4: { cn: "bg-yellow-400", color: "yellow", label: "N4" },
  n5: { cn: "bg-red-400", color: "orange", label: "N5" },
};

export const allJLPTKeys = Object.keys(JLPTListItems) as JLTPTtypes[];
export const JLPTOptions = allJLPTKeys.map((k) => {
  return {
    ...JLPTListItems[k],
    value: k,
  };
});

export const ITEM_CARD_BG_CN = "bg-[#fb02a8]";
export const freqCategoryCount = 6;
// TODO: Generate this as a function of freqCategoryCount
// generating these tw classes on the fly actually doesn't work idk why
export const freqCategoryCn: Record<number, string> = {
  0: "bg-opacity-0",
  1: "bg-opacity-20",
  2: "bg-opacity-40",
  3: "bg-opacity-60",
  4: "bg-opacity-80",
  5: "bg-opacity-100",
};

// TODO: Better typing
export const SEARCH_TYPE_OPTIONS = [
  { value: "keyword", label: "Keyword" },
  { value: "onyomi", label: "オニョミ" },
  { value: "kunyomi", label: "くにょみ" },
];

export const TILE_SIZE = {
  sm: {
    width: 50,
    height: 55,
  },
};

export const HEADER_HEIGHT = 100;
