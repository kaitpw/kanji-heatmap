import { cnTextLink } from "@/lib/generic-cn";

export const ExternalTextLink = ({
  href,
  text,
}: {
  href: string;
  text: string;
}) => {
  return (
    <a href={href} target="_blank" rel="noreferrer" className={cnTextLink}>
      {text}
    </a>
  );
};
