import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const selectRandom = <T>(arr: T[]) => {
  const random = Math.floor(Math.random() * arr.length);
  return arr[random];
};
