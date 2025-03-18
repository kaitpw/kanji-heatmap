import { useJsonFetch } from "@/hooks/use-json";
import { BasicLoading } from "@/components/common/BasicLoading/BasicLoading";
import { DefaultErrorFallback } from "@/components/common/DefaultErrorFallback";
import CumUseChart from "./CumUseChart/CumUseChart";

type ChartData = Record<string, [number, number][]>;

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

  return <CumUseChart data={data as ChartData} />;
};

export default CumUseScreen;
