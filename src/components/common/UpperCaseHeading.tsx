import { ReactNode } from "react";

export const UppercaseHeading = ({
  title,
  icon,
}: {
  title: string;
  icon: ReactNode;
}) => {
  return (
    <h1 className="mb-3 text-md font-bold flex items-center border-b w-full border-dotted ">
      {icon} <span className="pl-1">{title}</span>
    </h1>
  );
};
