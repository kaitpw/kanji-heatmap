import { useJsonFetch } from "@/hooks/use-json";
import { BasicLoading } from "@/components/common/BasicLoading/BasicLoading";
import { DefaultErrorFallback } from "@/components/common/DefaultErrorFallback";
import CumUseChartWrapper from "./CumUseChart/CumUseChartWrapper";
import { KeyLegend } from "./CumUseChart/KeyLegend";
import { CumUseGraph } from "./CumUseChart/CumUseGraph2";
import { ChartData } from "./CumUseChart/helpers";

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
