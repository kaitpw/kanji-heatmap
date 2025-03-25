import { ListScreen, CumUseScreen, DocsScreen } from "@/components/screens";

const kanjiPage = {
  href: "/",
  title: "Explore Kanji",
  Component: ListScreen,
  description: "Advanced search, sort, filter, and usage visualization tool",
};

const cumUseGraphPage = {
  href: "/cumulative-use-graph",
  title: "Cumulative Use Graph",
  description: "Inspect kanji usage vs rank trends across various data sets",
  Component: CumUseScreen,
};

const docsPage = {
  href: "/docs",
  title: "Docs",
  Component: DocsScreen,
};

const pageItems = {
  kanjiPage,
  cumUseGraphPage,
  docsPage,
};

export default pageItems;
