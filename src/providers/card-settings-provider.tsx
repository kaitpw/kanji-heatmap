import { ReactNode, useContext } from "react";
import { useLocalStorage } from "../hooks/use-local-storage";
import { createContext } from "react";

export type DispatchFunction<T> = (key: keyof T, value: T[keyof T]) => void;

export type CardSettings = {
  cardType: "compact" | "expanded";
  borderColorAttached: boolean;
  backgroundColorSettingDataSource: string;
};

export const StateContext = createContext<unknown>(undefined);
export const DispatchContext = createContext<
  DispatchFunction<unknown> | undefined
>(undefined);

const storageKey = "card-settings";

export const defaultValue: CardSettings = {
  cardType: "compact",
  borderColorAttached: false,
  backgroundColorSettingDataSource: "None",
};

export function CardSettingsProvider({ children }: { children: ReactNode }) {
  const [storageData, setItem] = useLocalStorage<CardSettings>(
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

export function useCardSettings() {
  const context = useContext(StateContext as React.Context<CardSettings>);
  if (context === undefined) {
    throw new Error(
      "useCardSettings must be used within a CardSettingsProviderr"
    );
  }
  return context;
}

export function useCardSettingsDispatch() {
  const context = useContext(
    DispatchContext as React.Context<DispatchFunction<CardSettings>>
  );
  if (context === undefined) {
    throw new Error(
      "useCardSettingsDispatch must be used within a CardSettingsProviderr"
    );
  }
  return context;
}
