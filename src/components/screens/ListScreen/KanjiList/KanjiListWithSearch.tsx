import { useDeferredItemSettings } from "@/providers/item-settings-hooks";
import { useKanjiSearchResult } from "@/kanji-worker/kanji-worker-hooks";
import { DefaultErrorFallback } from "@/components/error";
import { VirtualKanjiList } from "./VirtualKanjiList";
import LoadingKanjis from "./LoadingKanjis";
import { NoSearchResults } from "@/components/error/NoSearchResults";

const KanjiListWithSearch = () => {
  const result = useKanjiSearchResult();
  const itemSettings = useDeferredItemSettings();

  if (result.error != null) {
    return <DefaultErrorFallback message="Failed to load data." />;
  }

  if (result.data == null) {
    return <LoadingKanjis />;
  }

  if (result.data.length === 0) {
    return <NoSearchResults />;
  }
  return (
    <VirtualKanjiList kanjiKeys={result.data} size={itemSettings.cardType} />
  );
};

export default KanjiListWithSearch;
