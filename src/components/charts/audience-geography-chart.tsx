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
import { PieChart, Pie, Cell, Legend, ResponsiveContainer } from "recharts";
import { marketingData } from "@/lib/data/marketing";
import { MapPin } from "lucide-react";

const COLORS = [
  "hsl(var(--chart-1))",
  "hsl(var(--chart-2))",
  "hsl(var(--chart-3))",
  "hsl(var(--chart-4))",
  "hsl(var(--chart-5))",
];

const chartConfig = {
  conversions: {
    label: "Conversions",
  },
} satisfies ChartConfig;

export default function AudienceGeographyChart() {
  const chartData = marketingData.audienceInsights.topLocations.map(
    (location) => ({
      name: location.location,
      value: location.conversions,
      percentage: location.percentage,
    })
  );

  return (
    <Card className="backdrop-blur-xl bg-gradient-to-br from-background/95 to-background/80 border-white/10">
      <CardHeader>
        <CardTitle className="text-xl font-semibold flex items-center gap-2">
          <MapPin className="w-5 h-5" />
          Geographic Distribution
        </CardTitle>
        <CardDescription>Conversions by location</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 gap-6">
          {/* Pie Chart */}
          <ChartContainer config={chartConfig} className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <ChartTooltip content={<ChartTooltipContent />} />
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ percentage }) => `${percentage.toFixed(1)}%`}
                >
                  {chartData.map((_entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </ChartContainer>

          {/* Location List */}
          <div className="space-y-3">
            {marketingData.audienceInsights.topLocations.map(
              (location, index) => (
                <div
                  key={location.location}
                  className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: COLORS[index % COLORS.length] }}
                    />
                    <div>
                      <div className="font-medium text-sm">
                        {location.location}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {location.conversions.toLocaleString()} conversions
                      </div>
                    </div>
                  </div>
                  <div className="text-sm font-semibold">
                    {location.percentage.toFixed(1)}%
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
