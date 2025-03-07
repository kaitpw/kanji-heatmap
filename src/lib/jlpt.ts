import { selectRandom } from "./utils";

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

const jlpts: JLTPTtypes[] = ["n1", "n2", "n3", "n4", "n5"];
const duration: string[] = ["duration-1000", "duration-700"];
const delay: string[] = ["", "delay-500", "delay-1000"];
export const randomCn = () => {
  const a = selectRandom(jlpts);
  const b = selectRandom(jlpts);
  const c = selectRandom(duration);
  const d = selectRandom(delay);
  const cn = `${JLPTListItems[a].cn} ${JLPTListItems[b].cnBorder} ${c} ${d} !border-8 !rounded-sm`;
  return cn;
};

export const randomCn2 = () => {
  const a = selectRandom(jlpts);
  const b = selectRandom(jlpts);
  const c = selectRandom(duration);
  const d = selectRandom(delay);
  const cn = `${JLPTListItems[a].cn} ${JLPTListItems[b].cnBorder} ${c} ${d} !border-4 !rounded-lg !hover:border-cyan-500 !hover:bg-lime-500`;
  return cn;
};

export const allJLPTKeys = Object.keys(JLPTListItems) as JLTPTtypes[];
export const JLPTOptions = allJLPTKeys.map((k) => {
  return {
    ...JLPTListItems[k],
    value: k,
  };
});
