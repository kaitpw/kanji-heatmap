import { ListScreen, CumUseScreen, DocsScreen } from "@/components/screens";

const kanjiPage = {
  href: "/",
  title: "Find Kanjis",
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

const page = {
  kanjiPage,
  cumUseGraphPage,
  docsPage,
};

const docPages = {
  privacy: { hash: "#privacy", title: "Privacy Policy" },
  terms: { hash: "#terms", title: "Terms of Use" },
  about: { hash: "#about", title: "About" },
};

export { page, docPages };
