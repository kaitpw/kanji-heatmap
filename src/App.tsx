import "./App.css";
import {
  ListScreen,
  VennDiagramScreen,
  NetworkGraphScreen,
  GroupsScreen,
} from "@/screens";
import { Route, RouteComponentProps, Switch, useLocation } from "wouter";
import { NavigationListItem, NavLayout } from "./sections/nav";

const navItems: {
  href: string;
  title: string;
  component: React.ComponentType<
    RouteComponentProps<{
      [param: number]: string | undefined;
    }>
  >;
}[] = [
  { href: "/list", title: "List", component: ListScreen },
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
];

export const Nav = () => {
  const [location] = useLocation();

  const triggerTitle =
    navItems.find((item) => item.href === location)?.title ?? "Menu";

  return (
    <NavLayout triggerTitle={triggerTitle}>
      <ul className="flex flex-col justify-start items-start text-start">
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
      </ul>
    </NavLayout>
  );
};

const App = () => (
  <>
    <header className="flex pl-2 py-1 items-center">
      <div className="font-bold mr-2">Kanji Companion</div>
      <Nav />
    </header>
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
