import { ReactNode } from "react";

export const Layout = ({
  first,
  second,
}: {
  first: ReactNode;
  second: ReactNode;
}) => {
  return (
    <div className="w-full flex flex-col overflow-y-scroll overflow-x-hidden md:flex-row md:space-x-1 ">
      <div className="pl-2 md:sticky md:top-[0px] md:left-[0px] md:min-w-96 md:max-w-96 md:w-96">
        {first}
      </div>
      <div className="grow">{second}</div>
    </div>
  );
};
