import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { LucideIcon } from "lucide-react";

interface MetricItem {
  name: string;
  value: string;
  description?: string;
}

interface MetricsCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  iconColor: string;
  metrics: MetricItem[];
  valueSize?: "sm" | "lg";
  valueColor?: string;
  nameSize?: "sm" | "xs";
}

export default function MetricsCard({
  title,
  description,
  icon: Icon,
  iconColor,
  metrics,
  valueSize = "lg",
  valueColor,
  nameSize = "sm",
}: MetricsCardProps) {
  const valueSizeClass = valueSize === "lg" ? "text-2xl" : "text-sm";
  const nameSizeClass = nameSize === "sm" ? "text-sm" : "text-xs";
  const nameWeightClass =
    nameSize === "sm" ? "font-medium" : "font-medium text-muted-foreground";

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Icon className={`h-5 w-5 ${iconColor}`} />
          {title}
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {metrics.map((metric, index) => (
          <div
            key={index}
            className={metric.description ? "space-y-2" : "space-y-1"}
          >
            <div className="flex items-center justify-between">
              <span className={nameSizeClass + " " + nameWeightClass}>
                {metric.name}
              </span>
              <span
                className={`${valueSizeClass} font-bold ${valueColor || ""}`}
              >
                {metric.value}
              </span>
            </div>
            {metric.description && (
              <p className="text-xs text-muted-foreground">
                {metric.description}
              </p>
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
