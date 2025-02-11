import "./App.css";
import { Route, RouteComponentProps, Switch, useLocation } from "wouter";
import {
  ListScreen,
  VennDiagramScreen,
  NetworkGraphScreen,
  GroupsScreen,
} from "@/components/screens";
import { NavigationListItem, NavLayout } from "@/components/layouts/nav";
import Header from "@/components/sections/Header";

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
  <>
    <Header nav={<Nav />} />
    <main>
      <Switch>
        {navItems.map((item) => {
          return (
            <Route
              key={item.href}
              path={item.href}
              component={item.component}
            />
          );
        })}
        <Route>404: No such page!</Route>
      </Switch>
    </main>
  </>
);

export default App;
