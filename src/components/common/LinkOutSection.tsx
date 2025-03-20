import { ModeToggle } from "../ui/mode-toggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { linksOutItems } from "../items/links-out-items";
import { EllipsisIcon } from "../icons";
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

const MenuItems = () => {
  return (
    <div className="flex space-x-1">
      <ModeToggle />
      <LinksOutItems />
    </div>
  );
};

export function Menu({ cn }: { cn: string }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className={cn}>
        <Button variant="outline" size="icon" className="h-8 w-8">
          <EllipsisIcon />
          <span className="sr-only">Menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="center" className="p-3 mx-1">
        <MenuItems />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

const LinkOutSection = () => {
  return (
    <>
      <Menu cn="md:hidden" />
      <div className="hidden md:block">
        <MenuItems />
      </div>
    </>
  );
};

export default LinkOutSection;
