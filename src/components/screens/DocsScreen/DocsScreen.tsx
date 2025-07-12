import useHtmlDocumentTitle from "@/hooks/use-html-document-title";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { docPages } from "@/components/items/nav-items";
import { AboutSection } from "./AboutSection";

const getCurrentPage = (hash: string) => {
  return (
    Object.values(docPages).find((current) => current.hash === hash) ??
      docPages.about
  );
};
const DocsScreen = () => {
  useHtmlDocumentTitle("Docs");
  const [state, setState] = useState(() => {
    return getCurrentPage(window.location.hash).hash;
  });

  useHtmlDocumentTitle(getCurrentPage(state)?.title);

  return (
    <div className="w-full flex justify-center text-left">
      <Tabs
        value={state}
        onValueChange={(newState) => {
          window.location.hash = newState;
          setState(newState);
        }}
        className="w-fit md:max-w-4xl"
      >
        <TabsList className="grid grid-cols-1 w-full space-y-1 md:grid-cols-3 lg:space-y-0 lg:space-x-1 my-2 h-fit">
          <TabsTrigger value={docPages.about.hash}>
            {docPages.about.title}
          </TabsTrigger>
        </TabsList>
        <div className="mt-10">
          <TabsContent value={docPages.about.hash}>
            <AboutSection title={docPages.about.title} />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default DocsScreen;
