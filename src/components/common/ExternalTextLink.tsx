import { cnTextLink } from "@/lib/generic-cn";

export const ExternalTextLink = ({
  href,
  text,
}: {
  href: string;
  text: string;
}) => {
  return (
    <a className={cnTextLink} href={href} target="_blank" rel="noreferrer">
      {text}
    </a>
  );
};
