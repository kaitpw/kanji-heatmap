import { DocsScreen, ListScreen } from "@/components/screens";

const kanjiPage = {
  href: "/",
  title: "Find Kanjis",
  component: ListScreen,
  description: "Quickly sort, filter and search Kanjis",
};

const docsPage = {
  href: "/docs",
  title: "Docs",
  component: DocsScreen,
};

const page = {
  kanjiPage,
  docsPage,
};

const docPages = {
  about: { hash: "#about", title: "About" },
};

export { docPages, page };
