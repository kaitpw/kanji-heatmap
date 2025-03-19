import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

import { frequencyRankLabels } from "@/lib/label-maps";
import { buildChartData, ChartData, colorMap, freqKeyMap } from "./helpers";

export const CumUseGraph = ({ data }: { data: ChartData }) => {
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
