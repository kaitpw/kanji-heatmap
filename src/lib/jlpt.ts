export type JLTPTtypes = "n1" | "n2" | "n3" | "n4" | "n5" | "none";
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
    cn: "bg-lime-400",
    cnBorder: "border-lime-400",
    color: "lime",
    label: "N1",
  },
  n2: {
    cn: "bg-pink-400",
    cnBorder: "border-pink-400",
    color: "pink",
    label: "N2",
  },
  n3: {
    cn: "bg-blue-400",
    cnBorder: "border-blue-400",
    color: "blue",
    label: "N3",
  },
  n4: {
    cn: "bg-yellow-400",
    cnBorder: "border-yellow-400",
    color: "yellow",
    label: "N4",
  },
  n5: {
    cn: "bg-red-400",
    cnBorder: "border-red-400",
    color: "orange",
    label: "N5",
  },
  none: {
    cn: "bg-gray-400",
    cnBorder: "border-gray-400",
    color: "gray",
    label: "Not in JLPT",
  },
};

export const allJLPTKeys = Object.keys(JLPTListItems) as JLTPTtypes[];
export const JLPTOptions = allJLPTKeys.map((k) => {
  return {
    ...JLPTListItems[k],
    value: k,
  };
});
