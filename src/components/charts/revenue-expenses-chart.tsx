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
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Legend } from "recharts";

interface FinancialData {
  cogs: number;
  operatingExpenses: number;
  [key: string]: unknown;
}

interface RevenueExpensesChartProps {
  data: FinancialData[];
  periodLabel: string;
  title?: string;
  description?: string;
}

export default function RevenueExpensesChart({
  data,
  periodLabel,
  title = "Revenue vs Expenses Trend",
  description,
}: RevenueExpensesChartProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(value);
  };

  // Transform data to include totalExpenses
  const chartData = data.map((d) => ({
    ...d,
    totalExpenses: d.cogs + d.operatingExpenses,
  }));

  return (
    <Card className="lg:col-span-2">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            revenue: {
              label: "Revenue",
              color: "#3b82f6",
            },
            totalExpenses: {
              label: "Total Expenses",
              color: "#ef4444",
            },
          }}
          className="h-[250px] sm:h-[300px] w-full"
        >
          <LineChart data={chartData}>
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
            <Legend />
            <Line
              type="monotone"
              dataKey="revenue"
              stroke="#3b82f6"
              strokeWidth={2}
              name="Revenue"
            />
            <Line
              type="monotone"
              dataKey="totalExpenses"
              stroke="#ef4444"
              strokeWidth={2}
              name="Total Expenses"
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
