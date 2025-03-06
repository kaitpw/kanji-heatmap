import "./JFonts.css";
import {
  Redirect,
  Route,
  RouteComponentProps,
  Switch,
  useLocation,
} from "wouter";
import { ListScreen, AboutScreen, CumUseScreen } from "@/components/screens";
import { NavigationListItem, NavLayout } from "@/components/common/nav";
import Header from "@/components/common/Header";
import { ThemeProvider } from "@/providers/theme-provider";
import React from "react";
const navItems: {
  href: string;
  title: string;
  description: string;
  component: React.ComponentType<
    RouteComponentProps<{
      [param: number]: string | undefined;
    }>
  >;
}[] = [
  {
    href: "/",
    title: "Basic List",
    component: ListScreen,
    description: "Quickly sort, filter and search Kanjis",
  },
  {
    href: "/about",
    title: "About",
    component: AboutScreen,
    description: "Frequency Asked Questions and More",
  },
  {
    href: "/cumulative-use-graph",
    title: "Frequency Cumulative Use Graph",
    description: "Inspect cumulative use data based on various datasets",
    component: CumUseScreen,
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
              {item.description}
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
