import "./JFonts.css";
import { Route, Switch, useLocation } from "wouter";

import { ListScreen, CumUseScreen, DocsScreen } from "@/components/screens";
import { NavigationListItem, NavLayout } from "@/components/common/nav";
import Header from "@/components/common/Header";
import { ThemeProvider } from "@/providers/theme-provider";
import React from "react";
import { KanjiFunctionalityProvider } from "./providers/kanji-functionality-provider";
import ErrorBoundary from "./components/common/ErrorBoundary";
import { DefaultErrorFallback } from "./components/common/DefaultErrorFallback";
import { ExternalTextLink } from "./components/common/ExternalTextLink";

const LazyBottomBanner = React.lazy(
  () => import("./components/common/BottomBanner")
);

const kanjiPage = {
  href: "/",
  title: "Kanji Grid",
  component: ListScreen,
  description: "Quickly sort, filter and search Kanjis",
};

const cumUseGraphPage = {
  href: "/cum-use-graph",
  title: "Cumulative Use Graph",
  description: "Inspect Frequency Ranks vs Use based on various datasets",
  component: CumUseScreen,
};

const docsPage = {
  href: "/docs",
  title: "Docs",
  component: DocsScreen,
};

export const Nav = () => {
  const [location] = useLocation();

  const triggerTitle =
    [kanjiPage, cumUseGraphPage].find((item) => item.href === location)
      ?.title ?? "Menu";

  return (
    <NavLayout triggerTitle={triggerTitle}>
      <NavigationListItem href={kanjiPage.href} title={kanjiPage.title}>
        {kanjiPage.description}
      </NavigationListItem>
      <NavigationListItem
        href={cumUseGraphPage.href}
        title={cumUseGraphPage.title}
      >
        {cumUseGraphPage.description}
      </NavigationListItem>
      <div className="flex justify-center text-xs w-full py-1 border-t border-dotted">
        <ExternalTextLink href={`${docsPage.href}#about`} text="About" />
        <ExternalTextLink
          href={`${docsPage.href}#privacy`}
          text="Privacy Policy"
        />
        <ExternalTextLink href={`${docsPage.href}#terms`} text="Terms of Use" />
      </div>
    </NavLayout>
  );
};

const App = () => {
  return (
    <ErrorBoundary
      details="App"
      fallback={
        <div className="w-full pr-4">
          <DefaultErrorFallback />
        </div>
      }
    >
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Header nav={<Nav />} />
        <main>
          <ErrorBoundary
            details="App"
            fallback={
              <div className="w-full pr-4 mt-14">
                <DefaultErrorFallback />
              </div>
            }
          >
            <KanjiFunctionalityProvider>
              <Switch>
                <Route
                  path={cumUseGraphPage.href}
                  component={cumUseGraphPage.component}
                />
                <Route path={kanjiPage.href} component={kanjiPage.component} />
                <Route path={docsPage.href}>
                  <DocsScreen />
                </Route>
                <Route path="*">
                  <div className="w-full pr-4 mt-14">
                    <DefaultErrorFallback
                      message="404 - Page Not Found"
                      showDefaultCta={false}
                    />
                  </div>
                </Route>
              </Switch>
            </KanjiFunctionalityProvider>
          </ErrorBoundary>
        </main>
      </ThemeProvider>
      <LazyBottomBanner />
    </ErrorBoundary>
  );
};

export default App;
