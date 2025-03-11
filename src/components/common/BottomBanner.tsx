import { useNetworkState } from "@uidotdev/usehooks";
import { ExternalTextLink } from "./ExternalTextLink";
import { outLinks } from "@/lib/constants";

export const BottomBanner = () => {
  const network = useNetworkState();

  const message =
    network.online === false ? (
      <>
        Some features might be unavailable in offline mode. Don't worry, you can
        still use the site. Reconnect to enjoy all features. {"٩(๑❛ᴗ❛๑)۶"}
      </>
    ) : ["slow-2g", "2g", "3g"].includes(network.effectiveType ?? "") ||
      network.saveData === true ? (
      "(◍•ᴗ•◍) It seems your internet connection is a bit slow right now, don't worry, you can still use the site, but some features might take longer to load."
    ) : null;

  if (message != null) {
    return (
      <div className="fixed bottom-0 left-0 bg-lime-400 w-full text-xs font-extrabold py-1">
        {message}
      </div>
    );
  }

  return (
    <div className="fixed bottom-0 left-0 bg-lime-400 text-black w-full text-xs font-extrabold py-1">
      {"(๑ > ᴗ < ๑) "}
      If you enjoy the site,
      <ExternalTextLink
        href={outLinks.githubIssue}
        text={"drop by and say hello!"}
      />
    </div>
  );
};

export default BottomBanner;
