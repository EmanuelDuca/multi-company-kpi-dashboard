import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import MarketingMetricCard from "@/components/cards/marketing-metric-card";
import RealtimeMetricsPanel from "@/components/cards/realtime-metrics-panel";
import CampaignPerformanceChart from "@/components/charts/campaign-performance-chart";
import {
  TrendingUp,
  Target,
  DollarSign,
  Rocket,
  Building2,
  ArrowRight,
} from "lucide-react";
import { marketingData } from "@/lib/data/marketing";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const companies = [
  {
    id: "company-1",
    name: "TechCorp Inc.",
    performance: 92,
    spend: 45000,
    conversions: 8456,
  },
  {
    id: "company-2",
    name: "Global Solutions",
    performance: 88,
    spend: 38000,
    conversions: 7234,
  },
  {
    id: "company-3",
    name: "Innovation Labs",
    performance: 85,
    spend: 32000,
    conversions: 6123,
  },
  {
    id: "company-4",
    name: "Digital Ventures",
    performance: 79,
    spend: 28000,
    conversions: 5234,
  },
];

export default function MarketingIndex() {
  const { overview } = marketingData;

  return (
    <>
      <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 border-b border-white/5">
        <div className="flex items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-4"
          />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Marketing KPIs</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>

      <div className="flex-1 space-y-6 p-6 bg-gradient-to-br from-background via-background to-muted/20">
        {/* Hero Section */}
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 backdrop-blur-sm">
              <Rocket className="w-6 h-6 text-blue-500" />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-br from-foreground via-foreground to-foreground/70 bg-clip-text text-transparent">
                Marketing Command Center
              </h1>
              <p className="text-sm text-muted-foreground">
                Cross-company performance • All campaigns unified
              </p>
            </div>
          </div>
        </div>

        {/* Key Metrics Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <MarketingMetricCard
            title="Total Conversions"
            value={overview.totalConversions}
            change={15.8}
            icon={Target}
            iconColor="text-green-500"
            iconBgColor="bg-green-500/10"
            format="number"
          />
          <MarketingMetricCard
            title="Marketing Spend"
            value={overview.totalSpend}
            change={-2.3}
            icon={DollarSign}
            iconColor="text-orange-500"
            iconBgColor="bg-orange-500/10"
            format="currency"
          />
          <MarketingMetricCard
            title="Avg. Conversion Rate"
            value={overview.conversionRate}
            change={7.8}
            icon={TrendingUp}
            iconColor="text-purple-500"
            iconBgColor="bg-purple-500/10"
            format="percentage"
            subtitle="Across all channels"
          />
          <MarketingMetricCard
            title="Total ROAS"
            value={overview.roas}
            change={18.5}
            icon={TrendingUp}
            iconColor="text-pink-500"
            iconBgColor="bg-pink-500/10"
            subtitle={`${overview.roas}x return`}
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            <CampaignPerformanceChart />

            {/* Company Performance Cards */}
            <Card className="backdrop-blur-xl bg-gradient-to-br from-background/95 to-background/80 border-white/10">
              <CardHeader>
                <CardTitle className="text-xl font-semibold flex items-center gap-2">
                  <Building2 className="w-5 h-5" />
                  Company Performance
                </CardTitle>
                <CardDescription>
                  Marketing analytics by company
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  {companies.map((company) => (
                    <Link
                      key={company.id}
                      to={`/marketing/${company.id}`}
                      className="group"
                    >
                      <div className="p-4 rounded-xl bg-gradient-to-br from-muted/30 to-muted/10 border border-white/5 hover:border-white/20 transition-all duration-300 hover:shadow-lg hover:scale-[1.02]">
                        <div className="flex items-center justify-between">
                          <div className="space-y-2 flex-1">
                            <div className="flex items-center gap-3">
                              <h3 className="font-semibold text-lg">
                                {company.name}
                              </h3>
                              <div
                                className={`text-xs font-semibold px-2 py-1 rounded-full ${
                                  company.performance >= 90
                                    ? "bg-green-500/10 text-green-500"
                                    : company.performance >= 80
                                    ? "bg-blue-500/10 text-blue-500"
                                    : "bg-orange-500/10 text-orange-500"
                                }`}
                              >
                                {company.performance}% Score
                              </div>
                            </div>
                            <div className="flex items-center gap-6 text-sm text-muted-foreground">
                              <div className="flex items-center gap-2">
                                <DollarSign className="w-4 h-4" />
                                <span className="font-mono">
                                  ${company.spend.toLocaleString()}
                                </span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Target className="w-4 h-4" />
                                <span className="font-mono">
                                  {company.conversions.toLocaleString()}
                                </span>
                              </div>
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="group-hover:translate-x-1 transition-transform"
                          >
                            <ArrowRight className="w-5 h-5" />
                          </Button>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <RealtimeMetricsPanel />

            {/* Quick Stats */}
            <Card className="backdrop-blur-xl bg-gradient-to-br from-background/95 to-background/80 border-white/10">
              <CardHeader>
                <CardTitle className="text-xl font-semibold">
                  Quick Stats
                </CardTitle>
                <CardDescription>Key performance indicators</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">
                      Total Campaigns
                    </span>
                    <span className="font-semibold">
                      {marketingData.campaigns.length}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">
                      Active Campaigns
                    </span>
                    <span className="font-semibold text-green-500">
                      {
                        marketingData.campaigns.filter(
                          (c) => c.status === "active"
                        ).length
                      }
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Avg. CTR</span>
                    <span className="font-semibold">
                      {overview.ctr.toFixed(2)}%
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">
                      Cost Per Conversion
                    </span>
                    <span className="font-semibold">
                      ${overview.cpa.toFixed(2)}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}
