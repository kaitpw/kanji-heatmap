import { ReactNode } from "react";

export const Wrapper = ({ children }: { children: ReactNode }) => {
  return (
    <div className="h-full w-95 flex flex-col items-center justify-center p-4 m-2">
      {children}
    </div>
  );
};
