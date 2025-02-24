import { ReactNode } from "react";
import { useLocalStorage } from "../hooks/use-local-storage";
import { JLTPTtypes } from "@/lib/constants";
import { K_JLPT, K_STROKES } from "@/lib/frequency-rank";
import { createContextComponents, useContextWithCatch } from "./common";

const storageKey = "search-settings";

export type TextSearch = {
  type: string;
  text: string;
};

export type FilterSettings = {
  strokeRange: { min: number; max: number };
  jlpt: JLTPTtypes[];
  freq: {
    source: string;
    rankRange: { min: number; max: number };
  };
};

export type SortSettings = {
  primary: string;
  secondary: string;
};

export type SearchSettings = {
  textSearch: TextSearch;
  filterSettings: FilterSettings;
  sortSettings: SortSettings;
};

export const defaultValue: SearchSettings = {
  textSearch: {
    type: "keyword",
    text: "",
  },
  filterSettings: {
    strokeRange: { min: 0, max: 50 },
    jlpt: ["n1", "n2", "n3", "n4", "n5"] as const,
    freq: {
      source: "None",
      rankRange: { min: 0, max: 1000 },
    },
  },
  sortSettings: {
    primary: K_STROKES,
    secondary: K_JLPT,
  },
};

const { StateContext, DispatchContext } =
  createContextComponents<SearchSettings>(defaultValue);

export function SearchSettingsProvider({ children }: { children: ReactNode }) {
  const [storageData, setItem] = useLocalStorage<SearchSettings>(
    storageKey,
    defaultValue
  );

  return (
    <StateContext.Provider value={storageData}>
      <DispatchContext.Provider value={setItem}>
        {children}
      </DispatchContext.Provider>
    </StateContext.Provider>
  );
}

const providerName = "SearchSettings";

export function useSearchSettings() {
  const context = useContextWithCatch(StateContext, providerName);
  return context;
}

export function useSearchSettingsDispatch() {
  const context = useContextWithCatch(
    DispatchContext,
    providerName,
    `${providerName}Dispatch`
  );
  return context;
}
