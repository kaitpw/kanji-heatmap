import "./JFonts.css";
import {
  Redirect,
  Route,
  RouteComponentProps,
  Switch,
  useLocation,
} from "wouter";
import {
  ListScreen,
  VennDiagramScreen,
  NetworkGraphScreen,
  GroupsScreen,
} from "@/components/screens";
import { NavigationListItem, NavLayout } from "@/components/layouts/nav";
import Header from "@/components/sections/Header";
import { ThemeProvider } from "@/components/providers/theme-provider";
import React from "react";
const navItems: {
  href: string;
  title: string;
  component: React.ComponentType<
    RouteComponentProps<{
      [param: number]: string | undefined;
    }>
  >;
}[] = [
  { href: "/", title: "Basic List", component: ListScreen },
  {
    href: "/frequency-venn-diagram",
    title: "Frequency Venn Diagram",
    component: VennDiagramScreen,
  },
  {
    href: "/dependency-network-graph",
    title: "Dependency Network Graph",
    component: NetworkGraphScreen,
  },
  {
    href: "/grouped-by-onyomi",
    title: "Grouped by Onyomi",
    component: GroupsScreen,
  },
  {
    href: "/kanji-100",
    title: "100 Most Frequent Kanji By Kanshudo",
    component: ListScreen,
  },
  {
    href: "/components-50",
    title: "50 Most Common Components By Kanshudo",
    component: ListScreen,
  },
  {
    href: "/jouyou-kanji-components",
    title: "Jouyou Kanji Components",
    component: ListScreen,
  },
];

export const Nav = () => {
  const [location] = useLocation();

  const triggerTitle =
    navItems.find((item) => item.href === location)?.title ?? "Menu";

  return (
    <NavLayout triggerTitle={triggerTitle}>
      <>
        {navItems.map((item) => {
          return (
            <NavigationListItem
              key={item.href}
              href={item.href}
              title={item.title}
            >
              Description here
            </NavigationListItem>
          );
        })}
      </>
    </NavLayout>
  );
};

const App = () => (
  <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
    <Header nav={<Nav />} />
    <main>
      <Switch>
        {navItems.map((item) => {
          return (
            <React.Fragment key={item.href}>
              <Route path={item.href} component={item.component} />
              <Route path={`${item.href}/*`}>
                <Redirect to={item.href} replace />
              </Route>
            </React.Fragment>
          );
        })}
        <Redirect to="/" replace />
      </Switch>
    </main>
  </ThemeProvider>
);

export default App;
