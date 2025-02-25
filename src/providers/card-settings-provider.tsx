import { ReactNode } from "react";
import { useLocalStorage } from "../hooks/use-local-storage";
import { createContextComponents, useContextWithCatch } from "./common";
import { CardSettings } from "@/lib/constants";

const storageKey = "card-settings";

export const defaultValue: CardSettings = {
  cardType: "compact",
  borderColorAttached: false,
  backgroundColorSettingDataSource: "None",
};

const { StateContext, DispatchContext } =
  createContextComponents<CardSettings>(defaultValue);

export function CardSettingsProvider({ children }: { children: ReactNode }) {
  const [storageData, setItem] = useLocalStorage<CardSettings>(
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

const providerName = "CardSettings";

export function useCardSettings() {
  const context = useContextWithCatch(StateContext, providerName);
  return context;
}

export function useCardSettingsDispatch() {
  const context = useContextWithCatch(
    DispatchContext,
    providerName,
    `${providerName}Dispatch`
  );
  return context;
}
