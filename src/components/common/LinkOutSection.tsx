import { ModeToggle } from "../ui/mode-toggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { EllipsisIcon } from "../icons";
import { LinksOutItems } from "./LinksOutItems";

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
