import { outLinks } from "@/lib/external-links";
import { BugIcon, DiscordIcon, KoFiIcon } from "../icons";

const bugItem = {
  href: outLinks.githubIssue,
  text: "Report bug on GitHub issues 🐛🐞",
  icon: <BugIcon />,
};

const discordItem = {
  href: outLinks.discord,
  text: "Join our Discord server",
  icon: <DiscordIcon />,
};

const kofiItem = {
  href: outLinks.koFi,
  text: "Motivate us with a Ko-Fi ☕🧋🍵",
  icon: <KoFiIcon />,
};

const linksOutItems = {
  bugItem,
  discordItem,
  kofiItem,
};

export { linksOutItems };
