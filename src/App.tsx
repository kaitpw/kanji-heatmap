import "./JFonts.css";
import { Route, Switch, useLocation } from "wouter";
import React from "react";

import { ThemeProvider } from "@/providers/theme-provider";
import { KanjiFunctionalityProvider } from "./providers/kanji-functionality-provider";

import ErrorBoundary from "./components/error/ErrorBoundary";
import { DefaultErrorFallback } from "./components/error/DefaultErrorFallback";
import { PageNotFound } from "./components/error/PageNotFound";

import Header from "@/components/sections/Header";
import pageItems from "@/components/items/page-items";
import { ExternalTextLink } from "@/components/common/ExternalTextLink";
import { Nav } from "./components/sections/NavItem";

const LazyBottomBanner = React.lazy(
  () => import("./components/sections/BottomBanner")
);

const { kanjiPage, cumUseGraphPage, aboutPage, docsPage } = pageItems;

export const NavBar = () => {
  const [location] = useLocation();

  const triggerTitle =
    [kanjiPage, cumUseGraphPage].find((item) => item.href === location)
      ?.title ?? "Menu";

  return (
    <Nav
      triggerTitle={triggerTitle}
      navItems={[kanjiPage, cumUseGraphPage]}
      footer={
        <>
          <ExternalTextLink href={`${aboutPage.href}`} text="About" />
          <ExternalTextLink
            href={`${docsPage.href}#privacy`}
            text="Privacy Policy"
          />
          <ExternalTextLink
            href={`${docsPage.href}#terms`}
            text="Terms of Use"
          />
        </>
      }
    />
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
        <Header nav={<NavBar />} />
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
                  component={cumUseGraphPage.Component}
                />
                <Route path={kanjiPage.href} component={kanjiPage.Component} />
                <Route path={aboutPage.href} component={aboutPage.Component} />
                <Route path={docsPage.href}>
                  <pageItems.docsPage.Component />
                </Route>
                <Route path="*">
                  <div className="w-full pr-4 mt-14">
                    <PageNotFound />
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
