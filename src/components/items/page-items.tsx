import { DocsScreen, ListScreen } from "@/components/screens";

const kanjiPage = {
  href: "/",
  title: "Explore Kanji",
  Component: ListScreen,
  description: "Advanced search, sort, filter, and usage visualization tool",
};

const docsPage = {
  href: "/docs",
  title: "Docs",
  Component: DocsScreen,
};

const pageItems = {
  kanjiPage,
  docsPage,
};

export default pageItems;
