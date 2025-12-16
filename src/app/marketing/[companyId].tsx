import { useParams } from "react-router-dom";
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
import MarketingMetricCard from "@/components/cards/marketing-metric-card";
import MarketingFunnelChart from "@/components/charts/marketing-funnel-chart";
import CampaignPerformanceChart from "@/components/charts/campaign-performance-chart";
import ChannelPerformanceChart from "@/components/charts/channel-performance-chart";
import AudienceGeographyChart from "@/components/charts/audience-geography-chart";
import CampaignsTable from "@/components/tables/campaigns-table";
import { marketingData } from "@/lib/data/marketing";
import {
  Eye,
  MousePointerClick,
  Target,
  DollarSign,
  TrendingUp,
  Users,
  Zap,
  Award,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function MarketingCompanyPage() {
  const { companyId } = useParams<{ companyId: string }>();
  const { overview, audienceInsights } = marketingData;

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
                <BreadcrumbLink href="/marketing">Marketing</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{companyId}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>

      <div className="flex-1 space-y-6 p-6 bg-gradient-to-br from-background via-background to-muted/20">
        {/* Hero Section */}
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-sm">
              <Zap className="w-6 h-6 text-purple-500" />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-br from-foreground via-foreground to-foreground/70 bg-clip-text text-transparent">
                Marketing Analytics
              </h1>
              <p className="text-sm text-muted-foreground">
                Company {companyId} • Real-time performance insights
              </p>
            </div>
          </div>
        </div>

        {/* Key Metrics Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <MarketingMetricCard
            title="Total Impressions"
            value={overview.totalImpressions}
            change={12.5}
            icon={Eye}
            iconColor="text-blue-500"
            iconBgColor="bg-blue-500/10"
            format="number"
          />
          <MarketingMetricCard
            title="Total Clicks"
            value={overview.totalClicks}
            change={8.3}
            icon={MousePointerClick}
            iconColor="text-purple-500"
            iconBgColor="bg-purple-500/10"
            format="number"
          />
          <MarketingMetricCard
            title="Conversions"
            value={overview.totalConversions}
            change={15.8}
            icon={Target}
            iconColor="text-green-500"
            iconBgColor="bg-green-500/10"
            format="number"
          />
          <MarketingMetricCard
            title="Total Spend"
            value={overview.totalSpend}
            change={-2.3}
            icon={DollarSign}
            iconColor="text-orange-500"
            iconBgColor="bg-orange-500/10"
            format="currency"
          />
        </div>

        {/* Secondary Metrics */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <MarketingMetricCard
            title="Click-Through Rate"
            value={overview.ctr}
            change={5.2}
            icon={TrendingUp}
            iconColor="text-cyan-500"
            iconBgColor="bg-cyan-500/10"
            format="percentage"
            subtitle="Industry avg: 2.4%"
          />
          <MarketingMetricCard
            title="Conversion Rate"
            value={overview.conversionRate}
            change={7.8}
            icon={Award}
            iconColor="text-emerald-500"
            iconBgColor="bg-emerald-500/10"
            format="percentage"
            subtitle="Industry avg: 3.2%"
          />
          <MarketingMetricCard
            title="Cost Per Click"
            value={overview.cpc}
            change={-4.1}
            icon={DollarSign}
            iconColor="text-amber-500"
            iconBgColor="bg-amber-500/10"
            format="currency"
            subtitle="Optimized"
          />
          <MarketingMetricCard
            title="Return on Ad Spend"
            value={overview.roas}
            change={18.5}
            icon={TrendingUp}
            iconColor="text-pink-500"
            iconBgColor="bg-pink-500/10"
            subtitle={`${overview.roas}x return`}
          />
        </div>

        {/* Charts Section */}
        <div className="grid gap-6 lg:grid-cols-2">
          <CampaignPerformanceChart />
          <ChannelPerformanceChart />
        </div>

        {/* Funnel and Audience */}
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <MarketingFunnelChart />
          </div>
          <Card className="backdrop-blur-xl bg-gradient-to-br from-background/95 to-background/80 border-white/10">
            <CardHeader>
              <CardTitle className="text-xl font-semibold">
                Audience Insights
              </CardTitle>
              <CardDescription>Demographics & device breakdown</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Demographics */}
              <div className="space-y-3">
                <h4 className="text-sm font-semibold flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  Age Groups
                </h4>
                {audienceInsights.demographics.map((demo) => (
                  <div key={demo.segment} className="space-y-1.5">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium">{demo.segment}</span>
                      <span className="text-muted-foreground">
                        {demo.percentage}%
                      </span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
                        style={{ width: `${demo.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Devices */}
              <div className="space-y-3">
                <h4 className="text-sm font-semibold">Device Distribution</h4>
                {audienceInsights.devices.map((device) => (
                  <div
                    key={device.device}
                    className="flex items-center justify-between text-sm"
                  >
                    <span className="font-medium">{device.device}</span>
                    <span className="text-muted-foreground font-mono">
                      {device.percentage}%
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Geography */}
        <AudienceGeographyChart />

        {/* Campaigns Table */}
        <CampaignsTable />
      </div>
    </>
  );
}
