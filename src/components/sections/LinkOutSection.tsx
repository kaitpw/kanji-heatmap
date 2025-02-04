import LinkOutIcon from "../common/LinkOutIcon";
import { GithubIcon, KoFiIcon } from "../icons";

const LinkOutSection = () => {
  return (
    <>
      <LinkOutIcon
        href="https://github.com/mithi/"
        hoverText=" View source code on Github"
        srOnlyText="View source code in Github"
        icon={<GithubIcon />}
      />
      <LinkOutIcon
        href="https://ko-fi.com/minimithi"
        hoverText="Buy me a Ko-Fi"
        srOnlyText="Buy me a Ko-Fi"
        icon={<KoFiIcon />}
      />
    </>
  );
};

export default LinkOutSection;
