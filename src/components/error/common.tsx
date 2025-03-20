import { ReactNode } from "react";
import { outLinks } from "@/lib/constants";
import { ExternalTextLink } from "@/components/common/ExternalTextLink";

import { cnTextLink } from "@/lib/generic-cn";
import { GlobalHomeLink } from "../dependent/routing";

export const RefreshOrGoBackHome = () => {
  return (
    <>
      Meanwhile, you can try{" "}
      <button
        className={cnTextLink}
        onClick={() => {
          window?.location.reload();
        }}
      >
        refreshing the page
      </button>{" "}
      or go back <GlobalHomeLink />
    </>
  );
};

export const Wrapper = ({ children }: { children: ReactNode }) => {
  return (
    <div className="h-full w-95 flex flex-col items-center justify-center p-4 m-2">
      {children}
    </div>
  );
};

export const ReachOutToUs = ({
  prefix = " Please let us know on ",
}: {
  prefix?: string;
}) => {
  return (
    <>
      {prefix}
      <ExternalTextLink href={outLinks.discord} text="Discord," />
      <ExternalTextLink href={outLinks.githubIssue} text="Github," /> or
      <ExternalTextLink href={outLinks.koFi} text="Ko-Fi." />
    </>
  );
};
