import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

import { frequencyRankLabels } from "@/lib/label-maps";
import { buildChartData, ChartData, colorMap, freqKeyMap } from "./helpers";
import { KeyLegend } from "./KeyLegend";

const CumUseChartContent = ({ data }: { data: ChartData }) => {
  const { chartData, chartConfig } = buildChartData(data);

  return (
    <ChartContainer config={chartConfig}>
      <LineChart
        accessibilityLayer
        data={chartData}
        margin={{
          left: 5,
          right: 5,
          top: 12,
          bottom: 12,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="x" tickLine={false} axisLine={false} tickMargin={8} />
        <YAxis axisLine={false} tickMargin={8} />

        <ChartTooltip
          content={
            <ChartTooltipContent
              labelFormatter={(label) => {
                return (
                  <div className="pt-2 font-bold border-b pb-2 border-dotted">
                    Rank {label}
                  </div>
                );
              }}
            />
          }
        />
        {Object.keys(data).map((key) => {
          return (
            <Line
              key={key}
              dataKey={key}
              type="monotone"
              name={frequencyRankLabels[freqKeyMap[key]]}
              stroke={colorMap[key]}
              strokeWidth={2}
              connectNulls={true}
              dot={{
                fill: colorMap[key],
              }}
              activeDot={{
                r: 6,
              }}
            />
          );
        })}
      </LineChart>
    </ChartContainer>
  );
};

const CumUseChart = ({ data }: { data: ChartData }) => {
  return (
    <article className="flex justify-center flex-col items-center">
      <div className="w-full md:w-[1000px]">
        <div className="my-4">
          <h1 className="font-bold text-xl">
            Cumulative Usage vs Frequency Rank
          </h1>
        </div>

        <div className="mr-10  ">
          <CumUseChartContent data={data} />
        </div>
        <div className="flex flex-wrap justify-center">
          {Object.keys(data).map((key) => {
            return <KeyLegend key={key} freqKey={key} />;
          })}
        </div>
        <div>
          <p className="my-2 ">
            The x-axis lists items by their frequency rank (Rank 1224**), and
            the y-axis shows the cumulative percentage of total usage up to that
            rank. The graph highlights how quickly the most frequent items build
            up to account for the bulk of the overall usage.
          </p>
          <p className="my-2 text-xs">
            **Ranks are Standard competition (or Rank 1224) means items that
            rank equally receive the same ranking number, and then a gap is left
            after the equally ranked items in the ranking number.
          </p>
        </div>
      </div>
    </article>
  );
};

export default CumUseChart;
