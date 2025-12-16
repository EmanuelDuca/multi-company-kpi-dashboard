import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Sparkles, Gauge, Activity, Wifi } from "lucide-react";

export default function RealtimeMetricsPanel() {
  return (
    <Card className="relative overflow-hidden backdrop-blur-xl bg-gradient-to-br from-background/95 to-background/80 border-white/10">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 animate-gradient-x" />

      <CardHeader className="relative">
        <CardTitle className="text-xl font-semibold flex items-center gap-2">
          <Activity className="w-5 h-5 text-green-500 animate-pulse" />
          Real-Time Analytics
        </CardTitle>
        <CardDescription>
          Live performance monitoring • Updated every 5s
        </CardDescription>
      </CardHeader>
      <CardContent className="relative space-y-4">
        {/* Live Status Indicators */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2 p-4 rounded-xl bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/20">
            <div className="flex items-center gap-2">
              <Wifi className="w-4 h-4 text-green-500" />
              <span className="text-xs font-semibold text-green-500 uppercase tracking-wider">
                Active Now
              </span>
            </div>
            <div className="text-3xl font-bold font-mono">1,247</div>
            <div className="text-xs text-muted-foreground">Visitors online</div>
          </div>

          <div className="space-y-2 p-4 rounded-xl bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/20">
            <div className="flex items-center gap-2">
              <Gauge className="w-4 h-4 text-blue-500" />
              <span className="text-xs font-semibold text-blue-500 uppercase tracking-wider">
                Performance
              </span>
            </div>
            <div className="text-3xl font-bold font-mono">
              98.2<span className="text-lg">%</span>
            </div>
            <div className="text-xs text-muted-foreground">System uptime</div>
          </div>
        </div>

        {/* Live Activity Feed */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm font-semibold">
            <Sparkles className="w-4 h-4 text-amber-500" />
            Recent Events
          </div>
          <div className="space-y-2">
            {[
              {
                time: "2s ago",
                event: "New conversion",
                channel: "Google Ads",
                amount: "$245",
              },
              {
                time: "5s ago",
                event: "Campaign optimized",
                channel: "Facebook",
                amount: "+12% CTR",
              },
              {
                time: "12s ago",
                event: "High-value lead",
                channel: "LinkedIn",
                amount: "$1.2K",
              },
              {
                time: "18s ago",
                event: "Budget alert",
                channel: "Display",
                amount: "85% spent",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-all duration-200 border border-white/5 animate-fade-in"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className="space-y-0.5">
                  <div className="text-sm font-medium">{item.event}</div>
                  <div className="text-xs text-muted-foreground">
                    {item.channel} • {item.time}
                  </div>
                </div>
                <div className="text-sm font-semibold text-green-500">
                  {item.amount}
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
