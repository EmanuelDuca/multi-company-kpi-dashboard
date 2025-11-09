import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { LucideIcon } from "lucide-react";

interface StatisticHeaderProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  description?: string;
  trend?: {
    value: string;
    label: string;
    color: "green" | "orange" | "red";
    icon: LucideIcon;
  };
  valueColor?: string;
}

export default function StatisticHeader({
  title,
  value,
  icon: Icon,
  description,
  trend,
  valueColor,
}: StatisticHeaderProps) {
  const trendColorClass =
    trend?.color === "green"
      ? "text-green-500"
      : trend?.color === "orange"
      ? "text-orange-500"
      : "text-red-500";

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className={`text-2xl font-bold ${valueColor || ""}`}>{value}</div>
        {description && (
          <p className="text-xs text-muted-foreground mt-1">{description}</p>
        )}
        {trend && (
          <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
            <trend.icon className={`h-3 w-3 ${trendColorClass}`} />
            <span className={trendColorClass}>{trend.value}</span> {trend.label}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
