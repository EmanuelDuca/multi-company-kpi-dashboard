import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { ChartContainer, ChartTooltip } from "../ui/chart";
import {
  AreaChart as RechartsAreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
} from "recharts";

export interface AreaConfig {
  dataKey: string;
  label: string;
  color: string;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    dataKey: string;
    value: number;
    color: string;
    payload: Record<string, number | string>;
  }>;
  label?: string;
  areas: AreaConfig[];
  originalData?: Record<string, number | string>[];
  xAxisKey: string;
}

const CustomTooltip = ({
  active,
  payload,
  label,
  areas,
  originalData,
  xAxisKey,
}: CustomTooltipProps) => {
  if (!active || !payload || !payload.length) return null;

  // Find the original data point for this period
  const originalPoint = originalData?.find((item) => item[xAxisKey] === label);

  return (
    <div className="rounded-lg border bg-background p-3 shadow-lg">
      <p className="mb-2 font-semibold text-sm">{label}</p>
      <div className="space-y-1.5">
        {payload.map((entry) => {
          const areaConfig = areas.find((a) => a.dataKey === entry.dataKey);
          const percentage = entry.value;
          const nominalValue = originalPoint?.[entry.dataKey] as number;

          return (
            <div
              key={entry.dataKey}
              className="flex items-center gap-2 text-xs"
            >
              <div
                className="w-2.5 h-2.5 rounded-sm shrink-0"
                style={{ backgroundColor: entry.color }}
              />
              <div className="flex flex-col gap-0.5 min-w-0">
                <span className="font-medium truncate">
                  {areaConfig?.label || entry.dataKey}
                </span>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <span className="font-semibold text-foreground">
                    {percentage.toFixed(1)}%
                  </span>
                  {nominalValue !== undefined && (
                    <>
                      <span>•</span>
                      <span>
                        €
                        {nominalValue.toLocaleString("en-US", {
                          maximumFractionDigits: 0,
                        })}
                        k
                      </span>
                    </>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

type ChartAreaBreakdownProps = {
  title: string;
  description: string;
  data: Record<string, number | string>[];
  originalData?: Record<string, number | string>[];
  areas: AreaConfig[];
  xAxisKey?: string;
  className?: string;
};

export default function ChartAreaBreakdown({
  title,
  description,
  data,
  originalData,
  areas,
  xAxisKey = "period",
  className,
}: ChartAreaBreakdownProps) {
  // Generate chart config from areas
  const chartConfig = areas.reduce((acc, area) => {
    acc[area.dataKey] = {
      label: area.label,
      color: area.color,
    };
    return acc;
  }, {} as Record<string, { label: string; color: string }>);

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <ChartContainer
          config={chartConfig}
          className="h-[250px] sm:h-[300px] w-full"
        >
          <RechartsAreaChart data={data}>
            <defs>
              {areas.map((area) => (
                <linearGradient
                  key={`gradient-${area.dataKey}`}
                  id={`fill-${area.dataKey}`}
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="5%" stopColor={area.color} stopOpacity={0.8} />
                  <stop offset="95%" stopColor={area.color} stopOpacity={0.1} />
                </linearGradient>
              ))}
            </defs>
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis dataKey={xAxisKey} className="text-xs" />
            <YAxis
              className="text-xs"
              domain={[0, 100]}
              tickFormatter={(v) => `${v}%`}
            />
            <ChartTooltip
              content={
                <CustomTooltip
                  areas={areas}
                  originalData={originalData}
                  xAxisKey={xAxisKey}
                />
              }
            />
            {areas.map((area) => (
              <Area
                key={area.dataKey}
                type="monotone"
                dataKey={area.dataKey}
                stackId="1"
                stroke={area.color}
                fill={`url(#fill-${area.dataKey})`}
              />
            ))}
          </RechartsAreaChart>
        </ChartContainer>

        {/* Legend */}
        <div className="flex flex-wrap gap-4 justify-center pt-2">
          {areas.map((area) => (
            <div key={area.dataKey} className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-sm"
                style={{ backgroundColor: area.color }}
              />
              <span className="text-xs text-muted-foreground">
                {area.label}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
