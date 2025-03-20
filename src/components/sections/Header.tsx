import { Link } from "wouter";
import { ReactNode } from "react";
import ErrorBoundary from "../error/ErrorBoundary";

import ChangeFontButton from "../common/ChangeFontButton";
import LinkOutSection from "../common/LinkOutSection";
import { LinksOutItems } from "../common/LinksOutItems";

const HeaderLayout = ({
  title,
  side,
  main,
}: {
  title: ReactNode;
  side: ReactNode;
  main: ReactNode;
}) => {
  return (
    <>
      <header className="flex w-full items-center justify-between border-dashed border-b-4 px-1 fixed top-0 right-0 left-0 z-50 bg-white dark:bg-black backdrop-blur-sm">
        <section className="flex items-center space-x-1">
          {title}
          <div className="flex space-x-1">{main}</div>
        </section>
        <section className="flex space-x-1 my-1">{side}</section>
      </header>
    </>
  );
};

const Header = ({ nav }: { nav: ReactNode }) => {
  return (
    <HeaderLayout
      title={
        <h1 className="hidden sm:flex font-bold text-xl px-1">
          <Link to="/">Kanji Heatmap</Link>
        </h1>
      }
      side={<LinkOutSection />}
      main={
        <>
          <ErrorBoundary
            fallback={
              <div className="flex space-x-1 my-1 mx-1">
                <LinksOutItems />
              </div>
            }
          >
            {nav}
            <ChangeFontButton />
          </ErrorBoundary>
        </>
      }
    />
  );
};

export default Header;
