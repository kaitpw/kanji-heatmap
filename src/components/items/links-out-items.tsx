import { BugIcon } from "lucide-react";
import { KoFiIcon } from "../icons";
import { outLinks } from "@/lib/constants";
import DiscordIcon from "../icons/DiscordIcon";

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
  text: "Donate on Ko-Fi",
  icon: <KoFiIcon />,
};

const linksOutItems = {
  bugItem,
  discordItem,
  kofiItem,
};

export { linksOutItems };
