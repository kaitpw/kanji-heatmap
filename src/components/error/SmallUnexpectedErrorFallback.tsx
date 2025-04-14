import { outLinks } from "@/lib/external-links";
import { ExternalTextLink } from "../common/ExternalTextLink";

export const SmallUnexpectedErrorFallback = () => {
  return (
    <div className="w-full text-xs h-full font-bold flex justify-center items-center p-2">
      <div>
        すみません 🙇🏽‍♀️ 🙇. <br /> Report error on
        <ExternalTextLink text="Discord." href={outLinks.discord} />
      </div>
    </div>
  );
};
