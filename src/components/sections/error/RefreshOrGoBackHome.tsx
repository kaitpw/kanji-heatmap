import { cnTextLink } from "@/lib/generic-cn";
import { Link } from "wouter";

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
