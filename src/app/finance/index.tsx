import { useState, useMemo } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
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
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Area,
  AreaChart,
  XAxis,
  YAxis,
} from "recharts";
import ChartAreaBreakdown, {
  type AreaConfig,
} from "@/components/charts/chart-area-breakdown";
import ProfitLossTable from "@/components/tables/profit-loss-table";
import BalanceSheetTable from "@/components/tables/balance-sheet-table";
import FinancialPerformanceTable from "@/components/tables/financial-performance-table";
import MetricsCard from "@/components/cards/metrics-card";
import StatisticHeader from "@/components/cards/statistic-header";
import {
  monthlyFinancialData2025,
  quarterlyFinancialData,
  yearlyFinancialData,
  quarterlyMetrics,
  cashFlowData,
} from "@/lib/data/finance";
import {
  monthlyProfitLoss,
  quarterlyProfitLoss,
  yearlyProfitLoss,
  monthlyBalanceSheets,
  quarterlyBalanceSheets,
  yearlyBalanceSheets,
  prudentialRatios2025,
  assetQualityMetrics2025,
  profitabilityRatios2025,
} from "@/lib/data/banking-finance";
import {
  TrendingUp,
  DollarSign,
  Wallet,
  PieChartIcon,
  Activity,
  Building2,
  Shield,
  AlertCircle,
  BarChart3,
} from "lucide-react";
import { TimelineSelector } from "@/components/filters/TimelineSelector";
import type { TimelineView } from "@/components/filters/TimelineSelector";

export default function FinanceIndex() {
  const [timelineView, setTimelineView] = useState<TimelineView>("monthly");

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(value);
  };

  // Get data based on timeline view
  const { displayData, periodLabel, metrics } = useMemo(() => {
    let data: {
      revenue: number;
      cogs: number;
      netIncome: number;
      operatingExpenses: number;
      [key: string]: unknown;
    }[];
    let label: string;
    let totalRevenue = 0;
    let totalExpenses = 0;
    let totalProfit = 0;

    if (timelineView === "monthly") {
      data = monthlyFinancialData2025;
      label = "month";
      totalRevenue = data.reduce((sum, d) => sum + d.revenue, 0);
      totalExpenses = data.reduce(
        (sum, d) => sum + d.cogs + d.operatingExpenses,
        0
      );
      totalProfit = data.reduce((sum, d) => sum + d.netIncome, 0);
    } else if (timelineView === "quarterly") {
      data = quarterlyFinancialData;
      label = "quarter";
      totalRevenue = data.reduce((sum, d) => sum + d.revenue, 0);
      totalExpenses = data.reduce(
        (sum, d) => sum + d.cogs + d.operatingExpenses,
        0
      );
      totalProfit = data.reduce((sum, d) => sum + d.netIncome, 0);
    } else {
      data = yearlyFinancialData;
      label = "year";
      totalRevenue = data.reduce((sum, d) => sum + d.revenue, 0);
      totalExpenses = data.reduce(
        (sum, d) => sum + d.cogs + d.operatingExpenses,
        0
      );
      totalProfit = data.reduce((sum, d) => sum + d.netIncome, 0);
    }

    const profitMargin =
      totalRevenue > 0
        ? ((totalProfit / totalRevenue) * 100).toFixed(1)
        : "0.0";

    return {
      displayData: data,
      periodLabel: label,
      metrics: {
        totalRevenue,
        totalExpenses,
        totalProfit,
        profitMargin,
      },
    };
  }, [timelineView]);

  // Get banking data based on timeline view
  const { bankingProfitLoss, bankingBalanceSheets } = useMemo(() => {
    if (timelineView === "monthly") {
      return {
        bankingProfitLoss: monthlyProfitLoss,
        bankingBalanceSheets: monthlyBalanceSheets,
      };
    } else if (timelineView === "quarterly") {
      return {
        bankingProfitLoss: quarterlyProfitLoss,
        bankingBalanceSheets: quarterlyBalanceSheets,
      };
    } else {
      return {
        bankingProfitLoss: yearlyProfitLoss,
        bankingBalanceSheets: yearlyBalanceSheets,
      };
    }
  }, [timelineView]);

  // Helper: build 100% stacked percentage series from numeric fields
  const computePercentData = <T extends Record<string, number | string>>(
    data: T[],
    keys: string[],
    labelKey = "period"
  ) => {
    return data.map((item) => {
      const vals = keys.map((k) => {
        const v = item[k];
        return typeof v === "number" ? Math.abs(v) : 0;
      });
      const total = vals.reduce((s, v) => s + v, 0) || 1;
      const out: Record<string, number | string> = {
        [labelKey]: item[labelKey],
      };
      keys.forEach((k, i) => {
        out[k] = Number(((vals[i] / total) * 100).toFixed(1));
      });
      return out;
    });
  };

  // Precompute percent series for charts (keys match banking data fields)
  const incomePercentData = computePercentData(bankingProfitLoss, [
    "netInterestIncome",
    "netFeeIncome",
    "derivativesGains",
    "otherIncome",
  ]);

  const expensePercentData = computePercentData(bankingProfitLoss, [
    "otherOperatingExpenses",
    "personnelExpenses",
    "depreciation",
  ]);

  const assetPercentData = computePercentData(bankingBalanceSheets, [
    "cashAndCentralBanks",
    "loansAndOverdrafts",
    "debtSecurities",
    "otherAssets",
  ]);

  const liabilityPercentData = computePercentData(bankingBalanceSheets, [
    "dueToCustomers",
    "otherLiabilities",
    "dueToFinancialInstitutions",
    "provisions",
    "derivativesLiability",
  ]);

  // Area configurations for reusable charts
  const incomeAreas: AreaConfig[] = [
    {
      dataKey: "netInterestIncome",
      label: "Net Interest Income",
      color: "#3b82f6",
    },
    {
      dataKey: "netFeeIncome",
      label: "Net Fee & Commission",
      color: "#10b981",
    },
    {
      dataKey: "derivativesGains",
      label: "Derivatives Gains",
      color: "#f59e0b",
    },
    { dataKey: "otherIncome", label: "Other Income", color: "#8b5cf6" },
  ];

  const expenseAreas: AreaConfig[] = [
    {
      dataKey: "otherOperatingExpenses",
      label: "Other Operating Expenses",
      color: "#ef4444",
    },
    {
      dataKey: "personnelExpenses",
      label: "Personnel Expenses",
      color: "#f97316",
    },
    {
      dataKey: "depreciation",
      label: "Depreciation & Amortisation",
      color: "#a855f7",
    },
  ];

  const assetAreas: AreaConfig[] = [
    {
      dataKey: "cashAndCentralBanks",
      label: "Cash & Central Banks",
      color: "#3b82f6",
    },
    {
      dataKey: "loansAndOverdrafts",
      label: "Loans & Overdrafts",
      color: "#10b981",
    },
    { dataKey: "debtSecurities", label: "Debt Securities", color: "#f59e0b" },
    { dataKey: "otherAssets", label: "Other Assets", color: "#8b5cf6" },
  ];

  const liabilityAreas: AreaConfig[] = [
    { dataKey: "dueToCustomers", label: "Customer Deposits", color: "#3b82f6" },
    {
      dataKey: "otherLiabilities",
      label: "Other Liabilities",
      color: "#ef4444",
    },
    {
      dataKey: "dueToFinancialInstitutions",
      label: "Due to Financial Institutions",
      color: "#f59e0b",
    },
    { dataKey: "provisions", label: "Provisions", color: "#8b5cf6" },
    {
      dataKey: "derivativesLiability",
      label: "Derivatives (Liability)",
      color: "#a855f7",
    },
  ];

  const getTimeRangeLabel = () => {
    if (timelineView === "monthly") return "2025 (12 Months)";
    if (timelineView === "quarterly") return "Last 4 Quarters";
    return "Last 5 Years";
  };

  return (
    <>
      <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
        <div className="flex items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-4"
          />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbPage>Finance</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>
      <div className="flex flex-1 flex-col gap-6 p-4 pt-0">
        <div>
          <h1 className="text-3xl font-bold">Finance Dashboard</h1>
          <p className="text-muted-foreground">
            {getTimeRangeLabel()} Financial Performance - All Companies
          </p>
        </div>

        {/* Timeline Selector */}
        <TimelineSelector
          selectedView={timelineView}
          onViewChange={setTimelineView}
        />

        {/* Key Metrics Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatisticHeader
            title="Total Revenue"
            value={formatCurrency(metrics.totalRevenue)}
            icon={DollarSign}
            trend={{
              value: `+${quarterlyMetrics.revenueGrowthYoY}%`,
              label: "from last year",
              color: "green",
              icon: TrendingUp,
            }}
          />
          <StatisticHeader
            title="Total Expenses"
            value={formatCurrency(metrics.totalExpenses)}
            icon={Wallet}
            trend={{
              value: `+${quarterlyMetrics.expenseGrowthYoY}%`,
              label: "from last year",
              color: "orange",
              icon: TrendingUp,
            }}
          />
          <StatisticHeader
            title="Net Profit"
            value={formatCurrency(metrics.totalProfit)}
            icon={Activity}
            valueColor="text-green-600"
            description="Across all companies"
          />
          <StatisticHeader
            title="Profit Margin"
            value={`${quarterlyMetrics.profitMargin}%`}
            icon={PieChartIcon}
            description="Average across Q1"
          />
        </div>

        <div className="flex flex-row gap-5">
          <Card>
            <CardHeader>
              <CardTitle>Revenue vs Expenses Trend</CardTitle>
              <CardDescription>
                {getTimeRangeLabel()} comparison
              </CardDescription>
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
                className="h-[300px]"
              >
                <LineChart
                  data={displayData.map(
                    (d: {
                      cogs: number;
                      operatingExpenses: number;
                      [key: string]: unknown;
                    }) => ({
                      ...d,
                      totalExpenses: d.cogs + d.operatingExpenses,
                    })
                  )}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    className="stroke-muted"
                  />
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

          <div className="grid gap-4 md:grid-cols-2">
            {/* Monthly Profit Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Profit Trend</CardTitle>
                <CardDescription>Net income by {periodLabel}</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    netIncome: {
                      label: "Net Income",
                      color: "hsl(var(--chart-3))",
                    },
                  }}
                  className="h-[250px]"
                >
                  <AreaChart data={displayData}>
                    <defs>
                      <linearGradient
                        id="fillProfit"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor="hsl(var(--chart-3))"
                          stopOpacity={0.8}
                        />
                        <stop
                          offset="95%"
                          stopColor="hsl(var(--chart-3))"
                          stopOpacity={0.1}
                        />
                      </linearGradient>
                    </defs>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      className="stroke-muted"
                    />
                    <XAxis dataKey={periodLabel} className="text-xs" />
                    <YAxis
                      className="text-xs"
                      tickFormatter={(value) =>
                        `$${(value / 1000).toFixed(0)}k`
                      }
                    />
                    <ChartTooltip
                      content={<ChartTooltipContent />}
                      formatter={(value) => formatCurrency(Number(value))}
                    />
                    <Area
                      type="monotone"
                      dataKey="netIncome"
                      stroke="hsl(var(--chart-3))"
                      fill="url(#fillProfit)"
                    />
                  </AreaChart>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>
        </div>
        {/* Revenue vs Expenses Chart */}

        {/* Monthly Financial Performance Table */}
        <Card>
          <CardHeader>
            <CardTitle>Financial Performance</CardTitle>
            <CardDescription>
              Detailed breakdown - {getTimeRangeLabel()}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <FinancialPerformanceTable
              data={displayData}
              periodLabel={periodLabel}
            />
          </CardContent>
        </Card>

        {/* Cash Flow Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Cash Flow Analysis</CardTitle>
            <CardDescription>
              Operating, investing, and financing activities
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                operating: { label: "Operating", color: "hsl(var(--chart-1))" },
                investing: { label: "Investing", color: "hsl(var(--chart-2))" },
                financing: { label: "Financing", color: "hsl(var(--chart-3))" },
              }}
              className="h-[300px]"
            >
              <BarChart data={cashFlowData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Legend />
                <Bar
                  dataKey="operating"
                  fill="hsl(var(--chart-1))"
                  name="Operating"
                />
                <Bar
                  dataKey="investing"
                  fill="hsl(var(--chart-2))"
                  name="Investing"
                />
                <Bar
                  dataKey="financing"
                  fill="hsl(var(--chart-3))"
                  name="Financing"
                />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Banking Financial Statements Section */}
      <div className="px-4">
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">
            Banking Financial Statements
          </h2>
          <p className="text-muted-foreground mb-6">
            Based on Revolut Bank UAB consolidated financial position as at 31
            March 2025 (EUR thousands)
          </p>
        </div>

        {/* Statement of Profit or Loss */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Statement of Profit or Loss and Other Comprehensive Income
            </CardTitle>
            <CardDescription>
              {getTimeRangeLabel()} (EUR thousands)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ProfitLossTable
              data={bankingProfitLoss}
              periodLabel={periodLabel}
            />
          </CardContent>
        </Card>

        {/* Balance Sheet */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="h-5 w-5" />
              Statement of Financial Position (Balance Sheet)
            </CardTitle>
            <CardDescription>
              {getTimeRangeLabel()} (EUR thousands)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <BalanceSheetTable data={bankingBalanceSheets} />
          </CardContent>
        </Card>

        {/* Key Ratios and Metrics */}
        <div className="grid gap-6 md:grid-cols-3 mb-6">
          <MetricsCard
            title="Prudential Ratios"
            description="Banking Activities Compliance"
            icon={Shield}
            iconColor="text-green-500"
            metrics={prudentialRatios2025}
            valueSize="lg"
            valueColor="text-green-600"
            nameSize="sm"
          />
          <MetricsCard
            title="Asset Quality"
            description="Credit Risk Metrics"
            icon={AlertCircle}
            iconColor="text-blue-500"
            metrics={assetQualityMetrics2025}
            valueSize="sm"
            nameSize="xs"
          />
          <MetricsCard
            title="Profitability Ratios"
            description="2025 Performance"
            icon={TrendingUp}
            iconColor="text-purple-500"
            metrics={profitabilityRatios2025}
            valueSize="lg"
            valueColor="text-purple-600"
            nameSize="sm"
          />
        </div>

        {/* Income and Expense Breakdown Charts */}
        <div className="grid gap-6 md:grid-cols-2 mb-6">
          {/* Income Breakdown */}
          <ChartAreaBreakdown
            title="Income Breakdown"
            description="Total Operating Income: €455,635k"
            data={incomePercentData}
            originalData={bankingProfitLoss}
            areas={incomeAreas}
          />

          {/* Expense Breakdown */}
          <ChartAreaBreakdown
            title="Operating Expenses Breakdown"
            description="Total Operating Expenses: €393,243k"
            data={expensePercentData}
            originalData={bankingProfitLoss}
            areas={expenseAreas}
          />
        </div>

        {/* Asset and Liability Composition */}
        <div className="grid gap-6 md:grid-cols-2 mb-6">
          {/* Asset Composition */}
          <ChartAreaBreakdown
            title="Asset Composition"
            description="Total Assets: €23,837,107k"
            data={assetPercentData}
            originalData={bankingBalanceSheets}
            areas={assetAreas}
          />

          {/* Liability Composition */}
          <ChartAreaBreakdown
            title="Liability & Equity Composition"
            description="Total: €23,837,107k"
            data={liabilityPercentData}
            originalData={bankingBalanceSheets}
            areas={liabilityAreas}
          />
        </div>
      </div>
    </>
  );
}
