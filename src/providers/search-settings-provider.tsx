import { createContext, ReactNode, useContext } from "react";
import { useLocalStorage } from "../hooks/use-local-storage";
import { JLTPTtypes } from "@/lib/constants";
import { K_JLPT, K_STROKES } from "@/lib/frequency-rank";

export type DispatchFunction<T> = (key: keyof T, value: T[keyof T]) => void;

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

const storageKey = "search-settings";
export const StateContext = createContext<unknown>(undefined);
export const DispatchContext = createContext<
  DispatchFunction<unknown> | undefined
>(undefined);

export const defaultValue: SearchSettings = {
  textSearch: {
    type: "keyword",
    text: "",
  },
  filterSettings: {
    strokeRange: { min: 0, max: 50 },
    jlpt: ["n1", "n2"] as const,
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

export function SearchSettingsProvider({ children }: { children: ReactNode }) {
  const [storageData, setItem] = useLocalStorage<SearchSettings>(
    storageKey,
    defaultValue
  );

  return (
    <StateContext.Provider value={storageData}>
      <DispatchContext.Provider value={setItem as DispatchFunction<unknown>}>
        {children}
      </DispatchContext.Provider>
    </StateContext.Provider>
  );
}

export function useSearchSettings() {
  const context = useContext(StateContext as React.Context<SearchSettings>);
  if (context === undefined) {
    throw new Error(
      "useSearchSettings must be used within a SearchSettingsProviderr"
    );
  }
  return context;
}

export function useSearchSettingsDispatch() {
  const context = useContext(
    DispatchContext as React.Context<DispatchFunction<SearchSettings>>
  );
  if (context === undefined) {
    throw new Error(
      "useSearchSettingsDispatch must be used within a SearchSettingsProviderr"
    );
  }
  return context;
}
