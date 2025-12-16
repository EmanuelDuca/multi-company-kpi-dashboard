import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Legend } from "recharts";
import { marketingData } from "@/lib/data/marketing";

const chartConfig = {
  conversions: {
    label: "Conversions",
    color: "hsl(var(--chart-1))",
  },
  spend: {
    label: "Spend ($)",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export default function ChannelPerformanceChart() {
  const chartData = marketingData.channelPerformance.map((item) => ({
    channel: item.channel,
    conversions: item.conversions,
    spend: item.spend / 100, // Scale down for visualization
  }));

  return (
    <Card className="backdrop-blur-xl bg-gradient-to-br from-background/95 to-background/80 border-white/10">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">
          Channel Performance
        </CardTitle>
        <CardDescription>
          Compare conversions and spend across channels
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px] w-full">
          <BarChart
            data={chartData}
            margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="hsl(var(--border))"
              opacity={0.3}
            />
            <XAxis
              dataKey="channel"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              className="text-xs"
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              className="text-xs"
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Legend />
            <Bar
              dataKey="conversions"
              fill="hsl(var(--chart-1))"
              radius={[8, 8, 0, 0]}
            />
            <Bar
              dataKey="spend"
              fill="hsl(var(--chart-2))"
              radius={[8, 8, 0, 0]}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
