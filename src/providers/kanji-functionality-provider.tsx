import { KanjiWorkerProvider } from "@/kanji-worker/kanji-worker-provider";
import { SearchSettingsProvider } from "./search-settings-provider";
import { ItemSettingsProvider } from "./item-settings-provider";
import { ReactNode } from "react";
import { DefaultErrorFallback } from "@/components/common/DefaultErrorFallback";

export const KanjiFunctionalityProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  return (
    <SearchSettingsProvider>
      <KanjiWorkerProvider
        fallback={
          <div className="py-20">
            <DefaultErrorFallback message="Well, this is embarrasing. Something went wrong." />
          </div>
        }
      >
        <ItemSettingsProvider>{children}</ItemSettingsProvider>
      </KanjiWorkerProvider>
    </SearchSettingsProvider>
  );
};
