import { Link } from "wouter";
import { cnTextLink } from "@/lib/generic-cn";

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
      or go back
      <Link to="/" className={cnTextLink}>
        home.
      </Link>
    </>
  );
};
