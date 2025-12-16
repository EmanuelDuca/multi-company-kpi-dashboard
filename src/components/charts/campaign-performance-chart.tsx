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
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { marketingData } from "@/lib/data/marketing";

const chartConfig = {
  impressions: {
    label: "Impressions",
    color: "hsl(var(--chart-1))",
  },
  clicks: {
    label: "Clicks",
    color: "hsl(var(--chart-2))",
  },
  conversions: {
    label: "Conversions",
    color: "hsl(var(--chart-3))",
  },
} satisfies ChartConfig;

export default function CampaignPerformanceChart() {
  const chartData = marketingData.timelineData.map((item) => ({
    date: new Date(item.date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    }),
    impressions: Math.round(item.impressions / 1000), // Scale down for better visualization
    clicks: Math.round(item.clicks / 100),
    conversions: item.conversions,
  }));

  return (
    <Card className="backdrop-blur-xl bg-gradient-to-br from-background/95 to-background/80 border-white/10">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">
          Campaign Performance Trends
        </CardTitle>
        <CardDescription>
          Multi-dimensional performance tracking over time
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px] w-full">
          <AreaChart
            data={chartData}
            margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="fillImpressions" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="hsl(var(--chart-1))"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="hsl(var(--chart-1))"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillClicks" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="hsl(var(--chart-2))"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="hsl(var(--chart-2))"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillConversions" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="hsl(var(--chart-3))"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="hsl(var(--chart-3))"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="hsl(var(--border))"
              opacity={0.3}
            />
            <XAxis
              dataKey="date"
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
            <Area
              type="monotone"
              dataKey="impressions"
              stroke="hsl(var(--chart-1))"
              fillOpacity={1}
              fill="url(#fillImpressions)"
              strokeWidth={2}
            />
            <Area
              type="monotone"
              dataKey="clicks"
              stroke="hsl(var(--chart-2))"
              fillOpacity={1}
              fill="url(#fillClicks)"
              strokeWidth={2}
            />
            <Area
              type="monotone"
              dataKey="conversions"
              stroke="hsl(var(--chart-3))"
              fillOpacity={1}
              fill="url(#fillConversions)"
              strokeWidth={2}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
