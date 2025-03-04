import { BugIcon, EllipsisIcon } from "lucide-react";
import LinkOutIcon from "../common/LinkOutIcon";
import { KoFiIcon } from "../icons";
import { ModeToggle } from "../ui/mode-toggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { ReactNode } from "react";

const linkOutItems: {
  href: string;
  text: string;
  icon: ReactNode;
}[] = [
  {
    href: "https://github.com/mithi/mithi/issues/new?title=Kanji%20Companion%20Bug",
    text: "Report Something Wrong",
    icon: <BugIcon />,
  },
  {
    href: "https://ko-fi.com/minimithi",
    text: "Buy me a Ko-Fi",
    icon: <KoFiIcon />,
  },
];

const MenuItems = () => {
  return (
    <div className="flex space-x-1">
      <ModeToggle />
      {linkOutItems.map((item) => {
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
