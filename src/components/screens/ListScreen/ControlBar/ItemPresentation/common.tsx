import { ReactNode } from "react";

export const H2 = ({ children }: { children: ReactNode }) => (
  <h2 className="font-bold border-b-2 border-dotted mt-6 mb-2">{children}</h2>
);
