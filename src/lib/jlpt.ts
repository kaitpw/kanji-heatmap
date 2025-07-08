export const JLPT_TYPE_ARR = ["n5", "n4", "n3", "n2", "n1", "none"] as const;
export type JLTPTtypes = (typeof JLPT_TYPE_ARR)[number];

export const validJlpts: JLTPTtypes[] = JLPT_TYPE_ARR.filter(
  (jlpt) => jlpt !== "none"
);

export const JLPTRank: Record<JLTPTtypes, number> = {
  n5: 0,
  n4: 1,
  n3: 2,
  n2: 3,
  n1: 4,
  none: 5,
};

export const JLPTListItems: Record<
  JLTPTtypes,
  { cn: string; color: string; label: string; cnBorder: string }
> = {
  n1: {
    cn: "bg-blue-900",
    cnBorder: "border-blue-900",
    color: "dark blue",
    label: "N1",
  },
  n2: {
    cn: "bg-blue-700",
    cnBorder: "border-blue-700",
    color: "blue",
    label: "N2",
  },
  n3: {
    cn: "bg-blue-500",
    cnBorder: "border-blue-500",
    color: "medium blue",
    label: "N3",
  },
  n4: {
    cn: "bg-blue-300",
    cnBorder: "border-blue-300",
    color: "light blue",
    label: "N4",
  },
  n5: {
    cn: "bg-blue-100",
    cnBorder: "border-blue-100",
    color: "very light blue",
    label: "N5",
  },
  none: {
    cn: "bg-gray-400",
    cnBorder: "border-gray-400",
    color: "gray",
    label: "Not in JLPT",
  },
};

export const JLPTOptions = JLPT_TYPE_ARR.map((k) => {
  return {
    ...JLPTListItems[k],
    value: k,
  };
});

export const JLPTOptionsCount = JLPT_TYPE_ARR.length;
