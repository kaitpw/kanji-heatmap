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
      <header className="flex w-full items-center justify-between border-dotted border-b-2 px-1 sm:py-1">
        <section className="flex items-center space-x-1">
          <h1 className="hidden sm:flex  font-bold text-xl md:text-2xl px-1">
            {title}
          </h1>
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
