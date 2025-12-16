import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

interface FunnelStage {
  name: string;
  value: number;
  color: string;
  change: number;
}

const stages: FunnelStage[] = [
  {
    name: "Impressions",
    value: 15234567,
    color: "from-blue-500 to-blue-600",
    change: 12.5,
  },
  {
    name: "Clicks",
    value: 456789,
    color: "from-purple-500 to-purple-600",
    change: 8.3,
  },
  {
    name: "Leads",
    value: 45678,
    color: "from-pink-500 to-pink-600",
    change: 5.7,
  },
  {
    name: "MQLs",
    value: 28945,
    color: "from-orange-500 to-orange-600",
    change: -2.1,
  },
  {
    name: "Conversions",
    value: 23456,
    color: "from-green-500 to-green-600",
    change: 15.8,
  },
];

export default function MarketingFunnelChart() {
  const getTrendIcon = (change: number) => {
    if (change > 0) return <TrendingUp className="w-3 h-3" />;
    if (change < 0) return <TrendingDown className="w-3 h-3" />;
    return <Minus className="w-3 h-3" />;
  };

  const getTrendColor = (change: number) => {
    if (change > 0) return "text-green-500";
    if (change < 0) return "text-red-500";
    return "text-gray-500";
  };

  return (
    <Card className="backdrop-blur-xl bg-gradient-to-br from-background/95 to-background/80 border-white/10">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">
          Conversion Funnel
        </CardTitle>
        <CardDescription>
          Track user journey from impression to conversion
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {stages.map((stage, index) => {
            const percentage =
              index === 0 ? 100 : (stage.value / stages[0].value) * 100;
            const conversionRate =
              index > 0
                ? ((stage.value / stages[index - 1].value) * 100).toFixed(1)
                : null;

            return (
              <div key={stage.name} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{stage.name}</span>
                    {conversionRate && (
                      <span className="text-xs text-muted-foreground">
                        ({conversionRate}% conversion)
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-semibold">
                      {stage.value.toLocaleString()}
                    </span>
                    <div
                      className={`flex items-center gap-1 ${getTrendColor(
                        stage.change
                      )}`}
                    >
                      {getTrendIcon(stage.change)}
                      <span className="text-xs font-medium">
                        {Math.abs(stage.change)}%
                      </span>
                    </div>
                  </div>
                </div>
                <div className="relative h-12 rounded-lg overflow-hidden bg-muted/50">
                  <div
                    className={`absolute inset-y-0 left-0 bg-gradient-to-r ${stage.color} transition-all duration-1000 ease-out flex items-center justify-center`}
                    style={{ width: `${percentage}%` }}
                  >
                    <span className="text-xs font-semibold text-white drop-shadow-lg">
                      {percentage.toFixed(1)}%
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
