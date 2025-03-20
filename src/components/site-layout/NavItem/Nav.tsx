import { NavigationListItem, NavLayout } from "./helpers";
import { ReactNode } from "react";

export const Nav = ({
  triggerTitle,
  navItems,
  footer,
}: {
  triggerTitle: string;
  navItems: { href: string; title: string; description?: string }[];
  footer: ReactNode;
}) => {
  return (
    <NavLayout triggerTitle={triggerTitle}>
      {navItems.map((item) => {
        return (
          <NavigationListItem href={item.href} title={item.title}>
            {item.description}
          </NavigationListItem>
        );
      })}

      <div className="flex justify-center text-xs w-full py-1 border-t border-dotted">
        {footer}
      </div>
    </NavLayout>
  );
};
