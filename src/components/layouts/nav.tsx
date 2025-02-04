import * as React from "react";
import { Link } from "wouter";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

export const NavLayout = ({
  triggerTitle,
  children,
}: {
  triggerTitle: string;
  children: React.ReactNode;
}) => {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="bg-gray-100 py-0">
            {triggerTitle}
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="flex flex-col justify-start items-start text-start">
              {children}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export const NavigationListItem = ({
  title,
  children,
  href,
}: {
  title: string;
  children?: React.ReactNode;
  href: string;
}) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          href={href}
          className={
            "m-1 block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
          }
        >
          <div className="text-sm font-medium leading-none w-48">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
};
