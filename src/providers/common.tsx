import { createContext, useContext } from "react";

export type DispatchFunction<T> = (key: keyof T, value: T[keyof T]) => void;
export type DispatchFunctionWithUndefined<T> = DispatchFunction<T> | undefined;

export function createContextComponents<T>(defaultValue: T) {
  const StateContext = createContext<T>(defaultValue);
  const DispatchContext =
    createContext<DispatchFunctionWithUndefined<T>>(undefined);

  return { StateContext, DispatchContext };
}

export function useContextWithCatch<T>(
  Context: React.Context<T>,
  provider: string,
  hook?: string
) {
  // if not provided assume that the provider name is the name of the hook
  const context = useContext(Context);
  if (context === undefined) {
    throw new Error(
      `use${hook ?? provider} must be used within a ${provider}Provider`
    );
  }
  return context;
}
