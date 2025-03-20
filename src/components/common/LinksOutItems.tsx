import { linksOutItems } from "../items/links-out-items";
import LinkOutIcon from "./LinkOutIcon";

export const LinksOutItems = () => {
  return (
    <>
      {Object.values(linksOutItems).map((item) => {
        return (
          <LinkOutIcon
            key={item.href}
            href={item.href}
            hoverText={item.text}
            srOnlyText={item.text}
            icon={item.icon}
          />
        );
      })}
    </>
  );
};
