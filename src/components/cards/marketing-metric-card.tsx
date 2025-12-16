import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, TrendingDown, type LucideIcon } from "lucide-react";

interface MarketingMetricCardProps {
  title: string;
  value: string | number;
  change: number;
  icon: LucideIcon;
  iconColor: string;
  iconBgColor: string;
  subtitle?: string;
  format?: "number" | "currency" | "percentage";
}

export default function MarketingMetricCard({
  title,
  value,
  change,
  icon: Icon,
  iconColor,
  iconBgColor,
  subtitle,
  format = "number",
}: MarketingMetricCardProps) {
  const isPositive = change >= 0;

  const formatValue = (val: string | number) => {
    if (typeof val === "string") return val;

    switch (format) {
      case "currency":
        return `$${val.toLocaleString()}`;
      case "percentage":
        return `${val}%`;
      default:
        return val.toLocaleString();
    }
  };

  return (
    <Card className="group relative overflow-hidden backdrop-blur-xl bg-gradient-to-br from-background/95 to-background/80 border-white/10 hover:border-white/20 transition-all duration-300 hover:shadow-xl hover:shadow-primary/5">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <CardContent className="relative p-6">
        <div className="flex items-start justify-between">
          <div className="space-y-3 flex-1">
            <p className="text-sm font-medium text-muted-foreground tracking-wide uppercase">
              {title}
            </p>
            <div className="space-y-1">
              <h3 className="text-3xl font-bold tracking-tight bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-transparent">
                {formatValue(value)}
              </h3>
              {subtitle && (
                <p className="text-xs text-muted-foreground">{subtitle}</p>
              )}
            </div>
            <div className="flex items-center gap-1.5">
              {isPositive ? (
                <TrendingUp className="w-4 h-4 text-green-500" />
              ) : (
                <TrendingDown className="w-4 h-4 text-red-500" />
              )}
              <span
                className={`text-sm font-semibold ${
                  isPositive ? "text-green-500" : "text-red-500"
                }`}
              >
                {isPositive ? "+" : ""}
                {change}%
              </span>
              <span className="text-xs text-muted-foreground">
                vs last period
              </span>
            </div>
          </div>

          <div
            className={`${iconBgColor} rounded-xl p-3 shadow-lg transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3`}
          >
            <Icon className={`w-6 h-6 ${iconColor}`} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
