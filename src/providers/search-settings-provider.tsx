import { ReactNode } from "react";
import { useLocalStorage } from "../hooks/use-local-storage";
import { K_JLPT, K_STROKES } from "@/lib/frequency-rank";
import { createContextComponents, useContextWithCatch } from "./helpers";
import { SearchSettings } from "@/lib/constants";

const storageKey = "search-settings";

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
