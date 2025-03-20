import { cnTextLink } from "@/lib/generic-cn";
import { GlobalHomeLink } from "../routing-tools";

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
