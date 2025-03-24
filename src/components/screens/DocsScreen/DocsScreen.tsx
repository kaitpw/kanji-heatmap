import useHtmlDocumentTitle from "@/hooks/use-html-document-title";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PrivacyPolicySection } from "./PrivacySection";
import { TermsOfUseSection } from "./TermsOfUseSection";
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
  useHtmlDocumentTitle(`Docs - Kanji Heatmap`);
  const [state, setState] = useState(() => {
    return getCurrentPage(window.location.hash).hash;
  });

  useHtmlDocumentTitle(`${getCurrentPage(state)?.title} - Kanji Heatmap`);

  return (
    <div className="w-full flex justify-center my-20 text-left px-2">
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
          <TabsTrigger value={docPages.terms.hash}>
            {docPages.terms.title}
          </TabsTrigger>
          <TabsTrigger value={docPages.privacy.hash}>
            {docPages.privacy.title}
          </TabsTrigger>
        </TabsList>
        <div className="mt-10">
          <TabsContent value={docPages.about.hash}>
            <AboutSection title={docPages.about.title} />
          </TabsContent>
          <TabsContent value={docPages.terms.hash}>
            <TermsOfUseSection title={docPages.terms.title} />
          </TabsContent>
          <TabsContent value={docPages.privacy.hash}>
            <PrivacyPolicySection title={docPages.privacy.title} />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default DocsScreen;
