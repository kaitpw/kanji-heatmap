import {
  ListScreen,
  CumUseScreen,
  DocsScreen,
  AboutScreen,
} from "@/components/screens";

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

const aboutPage = {
  href: "/about",
  title: "About",
  Component: AboutScreen,
};

const pageItems = {
  kanjiPage,
  cumUseGraphPage,
  docsPage,
  aboutPage,
};

export default pageItems;
