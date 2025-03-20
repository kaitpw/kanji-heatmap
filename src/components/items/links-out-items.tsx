import { outLinks } from "@/lib/constants";
import { BugIcon, KoFiIcon, DiscordIcon } from "../icons";

const bugItem = {
  href: outLinks.githubIssue,
  text: "Report bug on Github issues",
  icon: <BugIcon />,
};

const discordItem = {
  href: outLinks.discord,
  text: "Join our Discord server",
  icon: <DiscordIcon />,
};

const kofiItem = {
  href: outLinks.koFi,
  text: "Support us on Ko-Fi",
  icon: <KoFiIcon />,
};

const linksOutItems = {
  bugItem,
  discordItem,
  kofiItem,
};

export { linksOutItems };
