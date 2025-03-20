import { linksOutItems } from "../items/links-out-items";
import LinkOutIcon from "./LinkOutIcon";

export const ReportBugIconBtn = ({ cnOverride }: { cnOverride?: string }) => {
  const item = linksOutItems.bugItem;
  return (
    <LinkOutIcon
      key={item.href}
      href={item.href}
      hoverText={item.text}
      srOnlyText={item.text}
      icon={item.icon}
      cnOverride={cnOverride}
    />
  );
};
