import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { AreaChart, Area, CartesianGrid, XAxis, YAxis } from "recharts";

interface ProfitData {
  netIncome: number;
  [key: string]: unknown;
}

interface ProfitChartProps {
  data: ProfitData[];
  periodLabel: string;
  title?: string;
  description?: string;
}

export default function ProfitChart({
  data,
  periodLabel,
  title = "Profit Trend",
  description,
}: ProfitChartProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(value);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            netIncome: {
              label: "Net Income",
              color: "hsl(var(--chart-3))",
            },
          }}
          className="h-[250px] sm:h-[300px] w-full"
        >
          <AreaChart data={data}>
            <defs>
              <linearGradient id="fillProfit" x1="0" y1="0" x2="0" y2="1">
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
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis dataKey={periodLabel} className="text-xs" />
            <YAxis
              className="text-xs"
              tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
            />
            <ChartTooltip
              content={<ChartTooltipContent />}
              formatter={(value) => formatCurrency(Number(value))}
            />
            <Area
              type="monotone"
              dataKey="netIncome"
              stroke="hsl(var(--chart-3))"
              fill="url(#fillProfit)"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
