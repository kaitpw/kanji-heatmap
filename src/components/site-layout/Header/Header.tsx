import ChangeFontButton from "@/components/dependent/site-wide/ChangeFontButton";
import { ErrorBoundary } from "@/components/error";
import { GlobalHomeHeaderLink } from "@/components/dependent/routing";
import type { ReactNode } from "react";
import HeaderIcons from "./HeaderIcons";

const HeaderLayout = ({
  title,
  side,
  main,
}: {
  title: ReactNode;
  side?: ReactNode;
  main?: ReactNode;
}) => {
  return (
    <header className="fixed top-0 left-0 fix-scroll-layout-shift-right flex w-full items-center justify-between px-1 z-50 bg-background backdrop-blur-sm">
      <div className="container mx-auto max-w-4xl w-full flex items-center justify-between">
        <section className="flex items-center space-x-1">
          {title}
          {main && <div className="flex space-x-1">{main}</div>}
        </section>
        {side && <section className="flex space-x-1 my-1 pr-1">{side}</section>}
      </div>
    </header>
  );
};

const Header = ({ nav }: { nav: ReactNode }) => {
  return (
    <ErrorBoundary
      fallback={
        <HeaderLayout
          title={
            <h1 className="text-left font-bold text-xl px-1 m-0 p-0">
              Kai Kanji
            </h1>
          }
        />
      }
    >
      <HeaderLayout
        title={
          <h1 className="hidden sm:flex font-bold text-xl px-1">
            <GlobalHomeHeaderLink />
          </h1>
        }
        side={<HeaderIcons />}
        main={
          <ErrorBoundary
            fallback={<div className="flex space-x-1 my-1 mx-1" />}
          >
            {nav}
            <ChangeFontButton />
          </ErrorBoundary>
        }
      />
    </ErrorBoundary>
  );
};

export default Header;
