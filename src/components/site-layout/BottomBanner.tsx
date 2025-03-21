import { ReactNode } from "react";
import { useNetworkState } from "@/hooks/use-network-state";
import { outLinks } from "@/lib/constants";
import { ExternalTextLink } from "@/components/common/ExternalTextLink";

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
    return (
      <Layout>
        {"٩(๑❛ᴗ❛๑)۶"} A few features may be unavailable in offline mode.{" "}
        {`Don't`}
        worry, you can still use the site. Reconnect to enjoy all features.
        {"💖"}
      </Layout>
    );
  }

  if (network.saveData === true) {
    return (
      <Layout>
        {"(╭ರ_•́)"} It seems that {`you're`} in data-saving mode, {`don't`}{" "}
        worry, you can still use the site, but some features may take longer to
        load.
      </Layout>
    );
  }

  if (["slow-2g", "2g", "3g"].includes(network.effectiveType ?? "")) {
    return (
      <Layout>
        {`(๑ > ᴗ < ๑) Your internet connection seems a bit slow (${network.effectiveType}), don't worry, you can still use the site, but some features may take
        longer to load.`}
      </Layout>
    );
  }

  return (
    <Layout>
      {"(◍•ᴗ•◍)"} Say hello to us on
      <ExternalTextLink
        href={outLinks.discord}
        text="Discord,"
        cnType="limeBg"
      />
      <ExternalTextLink
        href={outLinks.githubIssue}
        text={"Github,"}
        cnType="limeBg"
      />
      or
      <ExternalTextLink href={outLinks.koFi} text={"Ko-Fi."} cnType="limeBg" />
      {"🫰🫰"}
    </Layout>
  );
};

export default BottomBanner;
