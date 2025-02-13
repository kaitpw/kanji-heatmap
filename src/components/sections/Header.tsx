import { ReactNode } from "react";
import LinkOutSection from "./LinkOutSection";
import ChangeFontButton from "../common/ChangeFontButton";

const HeaderLayout = ({
  title,
  side,
  main,
}: {
  title: string;
  side: ReactNode;
  main: ReactNode;
}) => {
  return (
    <>
      <header className="flex w-full items-center justify-between border-dashed border-b-4 px-1 fixed top-0 right-0 left-0 z-50 bg-opacity-80 bg-white dark:bg-black backdrop-blur-sm">
        <section className="flex items-center space-x-1">
          <h1 className="hidden sm:flex font-bold text-xl px-1">{title}</h1>
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
      title="Kanji Companion"
      side={<LinkOutSection />}
      main={
        <>
          {nav}
          <ChangeFontButton />
        </>
      }
    />
  );
};

export default Header;
