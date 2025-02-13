import LinkOutIcon from "../common/LinkOutIcon";
import { GithubIcon, KoFiIcon } from "../icons";
import { ModeToggle } from "../ui/mode-toggle";

const LinkOutSection = () => {
  return (
    <>
      <ModeToggle />
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
