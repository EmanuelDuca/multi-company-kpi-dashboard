import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "lucide-react";

export type TimelineView = "monthly" | "quarterly" | "yearly";

interface TimelineSelectorProps {
  selectedView: TimelineView;
  onViewChange: (view: TimelineView) => void;
  selectedPeriod?: string;
  onPeriodChange?: (period: string) => void;
  availablePeriods?: string[];
}

export function TimelineSelector({
  selectedView,
  onViewChange,
  selectedPeriod,
  onPeriodChange,
  availablePeriods = [],
}: TimelineSelectorProps) {
  const views: { value: TimelineView; label: string }[] = [
    { value: "monthly", label: "Monthly" },
    { value: "quarterly", label: "Quarterly" },
    { value: "yearly", label: "Yearly" },
  ];

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-2">
        <Calendar className="h-5 w-5 text-muted-foreground" />
        <span className="text-sm font-medium">Timeline View</span>
      </div>

      <div className="flex flex-wrap gap-2">
        {/* View Selector */}
        <div className="flex rounded-lg border bg-muted p-1">
          {views.map((view) => (
            <Button
              key={view.value}
              variant={selectedView === view.value ? "default" : "ghost"}
              size="sm"
              onClick={() => onViewChange(view.value)}
              className="h-8"
            >
              {view.label}
            </Button>
          ))}
        </div>

        {/* Period Selector (if available) */}
        {availablePeriods.length > 0 && selectedPeriod && onPeriodChange && (
          <Select value={selectedPeriod} onValueChange={onPeriodChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select period" />
            </SelectTrigger>
            <SelectContent>
              {availablePeriods.map((period) => (
                <SelectItem key={period} value={period}>
                  {period}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      </div>
    </div>
  );
}
