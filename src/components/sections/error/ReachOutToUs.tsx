import { outLinks } from "@/lib/constants";
import { ExternalTextLink } from "@/components/common/ExternalTextLink";

export const ReachOutToUs = ({
  prefix = " Please let us know on ",
}: {
  prefix?: string;
}) => {
  return (
    <>
      {prefix}
      <ExternalTextLink href={outLinks.discord} text="Discord," />
      <ExternalTextLink href={outLinks.githubIssue} text="Github," /> or
      <ExternalTextLink href={outLinks.koFi} text="Ko-Fi." />
    </>
  );
};
