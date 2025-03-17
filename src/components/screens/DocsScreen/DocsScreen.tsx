import { useLayoutEffect } from "react";
import { PrivacyPolicySection } from "./PrivacySection";
import { TermsOfUseSection } from "./TermsOfUseSection";

const useScrollToHashOnLoad = () => {
  useLayoutEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const element = document.getElementById(hash.substring(1));
      element?.scrollIntoView({
        block: "start",
        behavior: "smooth",
      });
    }
  }, []);
};

const DocsScreen = () => {
  useScrollToHashOnLoad();

  return (
    <div className="my-20 flex flex-col items-center justify-center w-full">
      <div className="max-w-2xl">
        <section id="privacy" className="py-20">
          <PrivacyPolicySection />
        </section>
        <section id="terms" className="py-20">
          <TermsOfUseSection />
        </section>
      </div>
    </div>
  );
};

export default DocsScreen;
