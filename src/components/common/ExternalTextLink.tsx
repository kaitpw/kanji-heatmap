export const ExternalTextLink = ({
  href,
  text,
}: {
  href: string;
  text: string;
}) => {
  return (
    <a
      className="underline hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md p-1 mx-1"
      href={href}
      target="_blank"
      rel="noreferrer"
    >
      {text}
    </a>
  );
};
