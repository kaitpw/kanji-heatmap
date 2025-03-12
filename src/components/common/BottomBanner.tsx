import { useNetworkState } from "@uidotdev/usehooks";
import { ExternalTextLink } from "./ExternalTextLink";
import { outLinks } from "@/lib/constants";
import { ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="fixed bottom-0 left-0 bg-lime-400 text-black w-full text-xs font-extrabold pt-1 pb-[env(safe-area-inset-bottom)]">
      {children}
    </div>
  );
};
export const BottomBanner = () => {
  const network = useNetworkState();

  if (!network.online) {
    <Layout>
      Some features might be unavailable in offline mode. Don't worry, you can
      still use the site. Reconnect to enjoy all features. ٩(๑❛ᴗ❛๑)۶
    </Layout>;
  }

  if (network.saveData === true) {
    return (
      <Layout>
        (╭ರ_•́) It seems that you're in data-saving mode, don't worry, you can
        still use the site, but some features might take longer to load.
      </Layout>
    );
  }

  if (["slow-2g", "2g", "3g"].includes(network.effectiveType ?? "")) {
    return (
      <Layout>
        {"(๑ > ᴗ < ๑) "}
        It seems your internet connection is a bit slow right now, don't worry,
        you can still use the site, but some features might take longer to load.
      </Layout>
    );
  }

  return (
    <Layout>
      (◍•ᴗ•◍)
      <ExternalTextLink
        href={outLinks.githubIssue}
        text={"Drop by and say hello!"}
      />
    </Layout>
  );
};

export default BottomBanner;
