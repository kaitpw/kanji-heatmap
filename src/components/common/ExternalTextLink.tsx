import { cnTextLink, cnTextLinkLimeBg } from "@/lib/generic-cn";

export const ExternalTextLink = ({
  href,
  text,
  cnType = "default",
}: {
  href: string;
  text: string;
  cnType?: "default" | "limeBg";
}) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className={cnType === "limeBg" ? cnTextLinkLimeBg : cnTextLink}
    >
      {text}
    </a>
  );
};
