import { useKanjiSearchResult } from "@/kanji-worker/kanji-worker-provider";
import LoadingKanjis from "./LoadingKanjis";
import { useItemSettings } from "@/providers/item-settings-provider";
import { VirtualKanjiList } from "./VirtualKanjiList";

const KanjiListWithSearch = () => {
  const result = useKanjiSearchResult();
  const itemSettings = useItemSettings();

  if (result.error != null) {
    return (
      <div className="p-20">
        Something went wrong. Try refreshing the page or comeback later.
      </div>
    );
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
