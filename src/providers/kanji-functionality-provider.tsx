import { KanjiWorkerProvider } from "@/kanji-worker/kanji-worker-provider";
import { SearchSettingsProvider } from "./search-settings-provider";
import { ItemSettingsProvider } from "./item-settings-provider";
import { ReactNode } from "react";

export const KanjiFunctionalityProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  return (
    <SearchSettingsProvider>
      <KanjiWorkerProvider>
        <ItemSettingsProvider>{children}</ItemSettingsProvider>
      </KanjiWorkerProvider>
    </SearchSettingsProvider>
  );
};
