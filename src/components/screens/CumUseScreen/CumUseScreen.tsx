import { useJsonFetch } from "@/hooks/use-json";

import { DefaultErrorFallback } from "@/components/error";

import { ChartData } from "@/components/sections/KanjiCumUseChart/helpers";
import { KanjiCumUseChart } from "@/components/sections/KanjiCumUseChart";
import KaomojiAnimation from "@/components/common/KaomojiLoading";

const CumUseScreen = () => {
  const { data, status } = useJsonFetch("json/cum_use.json");

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
