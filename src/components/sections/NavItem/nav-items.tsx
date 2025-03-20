import {
  ListScreen,
  CumUseScreen,
  DocsScreen,
  AboutScreen,
} from "@/components/screens";

const kanjiPage = {
  href: "/",
  title: "Kanji Grid",
  component: ListScreen,
  description: "Quickly sort, filter and search Kanjis",
};

const cumUseGraphPage = {
  href: "/cum-use-graph",
  title: "Cumulative Use Graph",
  description: "Inspect Frequency Ranks vs Use trend across various datasets",
  component: CumUseScreen,
};

const docsPage = {
  href: "/docs",
  title: "Docs",
  component: DocsScreen,
};

const aboutPage = {
  href: "/about",
  title: "About",
  component: AboutScreen,
};

const page = {
  kanjiPage,
  cumUseGraphPage,
  docsPage,
  aboutPage,
};

export { page };
