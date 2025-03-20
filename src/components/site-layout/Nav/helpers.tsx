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
    <NavigationMenu className="relative z-50">
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="py-0 font-bold px-3 h-7 bg-black dark:bg-white text-white dark:text-black data-[state=open]:bg-black data-[state=open]:text-white focus:bg-black focus:text-white hover:bg-black hover:text-white">
            <span className=" w-24 text-ellipsis truncate sm:w-[240px]">
              {triggerTitle}
            </span>
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="flex flex-col justify-start items-start max-h-[75svh] text-start overflow-y-auto overflow-x-hidden">
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
            "mt-1 ml-1 mr-2 block select-none space-y-1 rounded-md px-3 py-2 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
          }
        >
          <div className="text-sm font-medium leading-none w-48">{title}</div>
          <p className="line-clamp-2 text-xs leading-snug text-muted-foreground">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
};
