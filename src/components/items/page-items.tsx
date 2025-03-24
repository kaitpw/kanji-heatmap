import { ListScreen, CumUseScreen, DocsScreen } from "@/components/screens";

const kanjiPage = {
  href: "/",
  title: "Kanji Search",
  Component: ListScreen,
  description: "Quickly sort, filter and search Kanjis",
};

const cumUseGraphPage = {
  href: "/cum-use-graph",
  title: "Cumulative Use Graph",
  description: "Inspect Frequency Ranks vs Use trend across various datasets",
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
