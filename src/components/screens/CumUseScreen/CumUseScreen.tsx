import { useJsonFetch } from "@/hooks/use-json";

import { DefaultErrorFallback } from "@/components/error";

import { BasicLoading } from "@/components/common/BasicLoading";
import CumUseChartWrapper from "@/components/sections/KanjiCumUseChart/CumUseChartWrapper";
import { KeyLegend } from "@/components/sections/KanjiCumUseChart/KeyLegend";
import { CumUseGraph } from "@/components/sections/KanjiCumUseChart/CumUseGraph";
import { ChartData } from "@/components/sections/KanjiCumUseChart/helpers";

const CumUseScreen = () => {
  const { data, status } = useJsonFetch("json/cum_use.json");

  if (status == "pending") {
    return <BasicLoading />;
  }

  if (status === "error" || data == null) {
    return (
      <div className="my-20">
        <DefaultErrorFallback message="Cannot load graph at this time" />
      </div>
    );
  }

  return (
    <CumUseChartWrapper
      legends={
        <>
          {Object.keys(data).map((key) => {
            return <KeyLegend key={key} freqKey={key} />;
          })}
        </>
      }
    >
      <CumUseGraph data={data as ChartData} />
    </CumUseChartWrapper>
  );
};

export default CumUseScreen;
