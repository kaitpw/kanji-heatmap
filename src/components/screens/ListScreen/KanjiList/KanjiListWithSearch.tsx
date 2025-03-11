import { useKanjiSearchResult } from "@/kanji-worker/kanji-worker-provider";
import LoadingKanjis from "./LoadingKanjis";
import { useItemSettings } from "@/providers/item-settings-provider";
import { VirtualKanjiList } from "./VirtualKanjiList";
import { DefaultErrorFallback } from "@/components/common/DefaultErrorFallback";

const KanjiListWithSearch = () => {
  const result = useKanjiSearchResult();
  const itemSettings = useItemSettings();

  if (result.error != null) {
    return <DefaultErrorFallback message="Failed to load data." />;
  }

  if (result.data == null) {
    return <LoadingKanjis />;
  }

  if (result.data.length === 0) {
    return <div className="p-20">No kanji match your search</div>;
  }
  return (
    <VirtualKanjiList kanjiKeys={result.data} size={itemSettings.cardType} />
  );
};

export default KanjiListWithSearch;
