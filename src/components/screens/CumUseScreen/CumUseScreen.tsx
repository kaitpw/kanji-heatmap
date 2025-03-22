import { useJsonFetch } from "@/hooks/use-json";

import { DefaultErrorFallback } from "@/components/error";

import { ChartData } from "@/components/sections/KanjiCumUseChart/helpers";
import { KanjiCumUseChart } from "@/components/sections/KanjiCumUseChart";
import KaomojiAnimation from "@/components/common/KaomojiLoading";
import jsonPaths from "@/lib/kanji/kanji-worker-json-paths";
import useHtmlDocumentTitle from "@/hooks/use-html-document-title";
import pageItems from "@/components/items/page-items";

const CumUseScreen = () => {
  const { data, status } = useJsonFetch(jsonPaths.CUM_USE);
  useHtmlDocumentTitle(`${pageItems.cumUseGraphPage.title} - Kanji Heatmap`);

  if (status == "pending") {
    return <KaomojiAnimation />;
  }

  if (status === "error" || data == null) {
    return (
      <div className="my-20">
        <DefaultErrorFallback message="Cannot load graph at this time" />
      </div>
    );
  }

  return <KanjiCumUseChart data={data as ChartData} />;
};

export default CumUseScreen;
