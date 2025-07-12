import { DocsScreen, ListScreen, RouletteScreen } from "@/components/screens";

const kanjiPage = {
  href: "/",
  title: "Explore Kanji",
  Component: ListScreen,
  description: "Advanced search, sort, filter, and usage visualization tool",
};

const roulettePage = {
  href: "/roulette",
  title: "Study Roulette",
  Component: RouletteScreen,
  description: "Quick study and test knowledge with random kanji and sentences",
};

const docsPage = {
  href: "/docs",
  title: "Docs",
  Component: DocsScreen,
};

const pageItems = {
  kanjiPage,
  roulettePage,
  docsPage,
};

export default pageItems;
