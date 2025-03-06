import { ReactNode } from "react";
import { useLocalStorage } from "../hooks/use-local-storage";
import { createContextComponents, useContextWithCatch } from "./helpers";
import { ItemSettings } from "@/lib/constants";

const storageKey = "item-settings";

export const defaultValue: ItemSettings = {
  cardType: "compact",
  borderColorAttached: true,
  backgroundColorSettingDataSource: "None",
};

const { StateContext, DispatchContext } =
  createContextComponents<ItemSettings>(defaultValue);

export function ItemSettingsProvider({ children }: { children: ReactNode }) {
  const [storageData, setItem] = useLocalStorage<ItemSettings>(
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

const providerName = "ItemSettings";

export function useItemSettings() {
  const context = useContextWithCatch(StateContext, providerName);
  return context;
}

export function useItemSettingsDispatch() {
  const context = useContextWithCatch(
    DispatchContext,
    providerName,
    `${providerName}Dispatch`
  );
  return context;
}
