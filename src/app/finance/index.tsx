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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
  Pie,
  PieChart,
  Cell,
  XAxis,
  YAxis,
} from "recharts";
import {
  monthlyFinancialData2025,
  quarterlyFinancialData,
  yearlyFinancialData,
  quarterlyMetrics,
  expenseBreakdown,
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
  incomeBreakdown,
  expenseBreakdownBanking,
  assetComposition,
  liabilityComposition,
} from "@/lib/data/banking-finance";
import type {
  ProfitLossStatement,
  BalanceSheet,
} from "@/lib/data/banking-finance";
import {
  TrendingUp,
  DollarSign,
  Wallet,
  PieChartIcon,
  Activity,
  Building2,
  TrendingDown,
  Shield,
  AlertCircle,
  BarChart3,
} from "lucide-react";
import { TimelineSelector } from "@/components/filters/TimelineSelector";
import type { TimelineView } from "@/components/filters/TimelineSelector";

const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6"];

export default function FinanceIndex() {
  const [timelineView, setTimelineView] = useState<TimelineView>("monthly");

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(value);
  };

  const calculateGrossProfit = (revenue: number, cogs: number) =>
    revenue - cogs;
  const calculateProfitMargin = (netIncome: number, revenue: number) =>
    ((netIncome / revenue) * 100).toFixed(1);

  // Get data based on timeline view
  const { displayData, periodLabel, metrics } = useMemo(() => {
    let data: any[];
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
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Revenue
              </CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {formatCurrency(metrics.totalRevenue)}
              </div>
              <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                <TrendingUp className="h-3 w-3 text-green-500" />
                <span className="text-green-500">
                  +{quarterlyMetrics.revenueGrowthYoY}%
                </span>{" "}
                from last year
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Expenses
              </CardTitle>
              <Wallet className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {formatCurrency(metrics.totalExpenses)}
              </div>
              <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                <TrendingUp className="h-3 w-3 text-orange-500" />
                <span className="text-orange-500">
                  +{quarterlyMetrics.expenseGrowthYoY}%
                </span>{" "}
                from last year
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Net Profit</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {formatCurrency(metrics.totalProfit)}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Across all companies
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Profit Margin
              </CardTitle>
              <PieChartIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {quarterlyMetrics.profitMargin}%
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Average across Q1
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Revenue vs Expenses Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Revenue vs Expenses Trend</CardTitle>
            <CardDescription>{getTimeRangeLabel()} comparison</CardDescription>
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
                data={displayData.map((d: any) => ({
                  ...d,
                  totalExpenses: d.cogs + d.operatingExpenses,
                }))}
              >
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
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
                <BarChart data={displayData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey={periodLabel} />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar
                    dataKey="netIncome"
                    fill="hsl(var(--chart-3))"
                    name="Net Income"
                  />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* Expense Breakdown Pie Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Expense Breakdown</CardTitle>
              <CardDescription>
                Q1 2025 operating expenses by category
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={{}} className="h-[250px]">
                <PieChart>
                  <Pie
                    data={expenseBreakdown}
                    dataKey="amount"
                    nameKey="category"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    label={(entry) => `${entry.percentage}%`}
                  >
                    {expenseBreakdown.map((_, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <ChartTooltip content={<ChartTooltipContent />} />
                </PieChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>

        {/* Monthly Financial Performance Table */}
        <Card>
          <CardHeader>
            <CardTitle>Financial Performance</CardTitle>
            <CardDescription>
              Detailed breakdown - {getTimeRangeLabel()}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>
                    {periodLabel.charAt(0).toUpperCase() + periodLabel.slice(1)}
                  </TableHead>
                  <TableHead className="text-right">Revenue</TableHead>
                  <TableHead className="text-right">COGS</TableHead>
                  <TableHead className="text-right">Gross Profit</TableHead>
                  <TableHead className="text-right">
                    Operating Expenses
                  </TableHead>
                  <TableHead className="text-right">Net Income</TableHead>
                  <TableHead className="text-right">Profit Margin</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {displayData.map((data: any) => {
                  const grossProfit = calculateGrossProfit(
                    data.revenue,
                    data.cogs
                  );
                  const profitMargin = calculateProfitMargin(
                    data.netIncome,
                    data.revenue
                  );

                  const periodKey = data[periodLabel];

                  return (
                    <TableRow key={periodKey}>
                      <TableCell className="font-medium">{periodKey}</TableCell>
                      <TableCell className="text-right">
                        {formatCurrency(data.revenue)}
                      </TableCell>
                      <TableCell className="text-right">
                        {formatCurrency(data.cogs)}
                      </TableCell>
                      <TableCell className="text-right font-medium">
                        {formatCurrency(grossProfit)}
                      </TableCell>
                      <TableCell className="text-right">
                        {formatCurrency(data.operatingExpenses)}
                      </TableCell>
                      <TableCell className="text-right font-bold text-green-600">
                        {formatCurrency(data.netIncome)}
                      </TableCell>
                      <TableCell className="text-right">
                        {profitMargin}%
                      </TableCell>
                    </TableRow>
                  );
                })}
                <TableRow className="bg-muted/50 font-bold">
                  <TableCell>Total</TableCell>
                  <TableCell className="text-right">
                    {formatCurrency(metrics.totalRevenue)}
                  </TableCell>
                  <TableCell className="text-right">
                    {formatCurrency(
                      displayData.reduce(
                        (sum: number, d: any) => sum + d.cogs,
                        0
                      )
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    {formatCurrency(
                      displayData.reduce(
                        (sum: number, d: any) =>
                          sum + calculateGrossProfit(d.revenue, d.cogs),
                        0
                      )
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    {formatCurrency(
                      displayData.reduce(
                        (sum: number, d: any) => sum + d.operatingExpenses,
                        0
                      )
                    )}
                  </TableCell>
                  <TableCell className="text-right text-green-600">
                    {formatCurrency(metrics.totalProfit)}
                  </TableCell>
                  <TableCell className="text-right">
                    {metrics.profitMargin}%
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
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
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="sticky left-0 bg-background z-10">
                    Category
                  </TableHead>
                  {bankingProfitLoss.map((item) => (
                    <TableHead
                      key={item.period}
                      className="text-right whitespace-nowrap"
                    >
                      {item.period}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="sticky left-0 bg-background z-10">
                    Interest income
                  </TableCell>
                  {bankingProfitLoss.map((item) => (
                    <TableCell key={item.period} className="text-right">
                      {formatCurrency(item.interestIncome).replace("$", "€")}
                    </TableCell>
                  ))}
                </TableRow>
                <TableRow>
                  <TableCell className="sticky left-0 bg-background z-10">
                    Interest expense
                  </TableCell>
                  {bankingProfitLoss.map((item) => (
                    <TableCell
                      key={item.period}
                      className="text-right text-red-500"
                    >
                      (
                      {formatCurrency(Math.abs(item.interestExpense)).replace(
                        "$",
                        "€"
                      )}
                      )
                    </TableCell>
                  ))}
                </TableRow>
                <TableRow className="font-bold border-t-2">
                  <TableCell className="sticky left-0 bg-background z-10 font-bold">
                    Net interest income
                  </TableCell>
                  {bankingProfitLoss.map((item) => (
                    <TableCell
                      key={item.period}
                      className="text-right font-bold"
                    >
                      {formatCurrency(item.netInterestIncome).replace("$", "€")}
                    </TableCell>
                  ))}
                </TableRow>
                <TableRow>
                  <TableCell className="sticky left-0 bg-background z-10">
                    Fee and commission income
                  </TableCell>
                  {bankingProfitLoss.map((item) => (
                    <TableCell key={item.period} className="text-right">
                      {formatCurrency(item.feeIncome).replace("$", "€")}
                    </TableCell>
                  ))}
                </TableRow>
                <TableRow>
                  <TableCell className="sticky left-0 bg-background z-10">
                    Fee and commission expense
                  </TableCell>
                  {bankingProfitLoss.map((item) => (
                    <TableCell
                      key={item.period}
                      className="text-right text-red-500"
                    >
                      (
                      {formatCurrency(Math.abs(item.feeExpense)).replace(
                        "$",
                        "€"
                      )}
                      )
                    </TableCell>
                  ))}
                </TableRow>
                <TableRow className="font-bold border-t-2">
                  <TableCell className="sticky left-0 bg-background z-10 font-bold">
                    Net fee and commission income
                  </TableCell>
                  {bankingProfitLoss.map((item) => (
                    <TableCell
                      key={item.period}
                      className="text-right font-bold"
                    >
                      {formatCurrency(item.netFeeIncome).replace("$", "€")}
                    </TableCell>
                  ))}
                </TableRow>
                <TableRow>
                  <TableCell className="sticky left-0 bg-background z-10">
                    Net gains and losses on derivatives
                  </TableCell>
                  {bankingProfitLoss.map((item) => (
                    <TableCell key={item.period} className="text-right">
                      {formatCurrency(item.derivativesGains).replace("$", "€")}
                    </TableCell>
                  ))}
                </TableRow>
                <TableRow>
                  <TableCell className="sticky left-0 bg-background z-10">
                    Credit loss expense on financial assets
                  </TableCell>
                  {bankingProfitLoss.map((item) => (
                    <TableCell
                      key={item.period}
                      className="text-right text-red-500"
                    >
                      (
                      {formatCurrency(Math.abs(item.creditLossExpense)).replace(
                        "$",
                        "€"
                      )}
                      )
                    </TableCell>
                  ))}
                </TableRow>
                <TableRow>
                  <TableCell className="sticky left-0 bg-background z-10">
                    Other operating income
                  </TableCell>
                  {bankingProfitLoss.map((item) => (
                    <TableCell key={item.period} className="text-right">
                      {formatCurrency(item.otherIncome).replace("$", "€")}
                    </TableCell>
                  ))}
                </TableRow>
                <TableRow className="font-bold border-t-2 bg-muted/50">
                  <TableCell className="sticky left-0 bg-muted/50 z-10 font-bold">
                    Net operating income
                  </TableCell>
                  {bankingProfitLoss.map((item) => (
                    <TableCell
                      key={item.period}
                      className="text-right font-bold"
                    >
                      {formatCurrency(item.netOperatingIncome).replace(
                        "$",
                        "€"
                      )}
                    </TableCell>
                  ))}
                </TableRow>
                <TableRow>
                  <TableCell className="sticky left-0 bg-background z-10">
                    Personnel expenses
                  </TableCell>
                  {bankingProfitLoss.map((item) => (
                    <TableCell
                      key={item.period}
                      className="text-right text-red-500"
                    >
                      (
                      {formatCurrency(Math.abs(item.personnelExpenses)).replace(
                        "$",
                        "€"
                      )}
                      )
                    </TableCell>
                  ))}
                </TableRow>
                <TableRow>
                  <TableCell className="sticky left-0 bg-background z-10">
                    Depreciation and amortisation
                  </TableCell>
                  {bankingProfitLoss.map((item) => (
                    <TableCell
                      key={item.period}
                      className="text-right text-red-500"
                    >
                      (
                      {formatCurrency(Math.abs(item.depreciation)).replace(
                        "$",
                        "€"
                      )}
                      )
                    </TableCell>
                  ))}
                </TableRow>
                <TableRow>
                  <TableCell className="sticky left-0 bg-background z-10">
                    Other operating expenses
                  </TableCell>
                  {bankingProfitLoss.map((item) => (
                    <TableCell
                      key={item.period}
                      className="text-right text-red-500"
                    >
                      (
                      {formatCurrency(
                        Math.abs(item.otherOperatingExpenses)
                      ).replace("$", "€")}
                      )
                    </TableCell>
                  ))}
                </TableRow>
                <TableRow className="font-bold border-t-2">
                  <TableCell className="sticky left-0 bg-background z-10 font-bold">
                    Total operating expenses
                  </TableCell>
                  {bankingProfitLoss.map((item) => (
                    <TableCell
                      key={item.period}
                      className="text-right font-bold text-red-500"
                    >
                      (
                      {formatCurrency(
                        Math.abs(item.totalOperatingExpenses)
                      ).replace("$", "€")}
                      )
                    </TableCell>
                  ))}
                </TableRow>
                <TableRow className="font-bold border-t-2 bg-muted/50">
                  <TableCell className="sticky left-0 bg-muted/50 z-10 font-bold">
                    Profit before tax
                  </TableCell>
                  {bankingProfitLoss.map((item) => (
                    <TableCell
                      key={item.period}
                      className="text-right font-bold"
                    >
                      {formatCurrency(item.profitBeforeTax).replace("$", "€")}
                    </TableCell>
                  ))}
                </TableRow>
                <TableRow>
                  <TableCell className="sticky left-0 bg-background z-10">
                    Tax expense
                  </TableCell>
                  {bankingProfitLoss.map((item) => (
                    <TableCell
                      key={item.period}
                      className="text-right text-red-500"
                    >
                      (
                      {formatCurrency(Math.abs(item.taxExpense)).replace(
                        "$",
                        "€"
                      )}
                      )
                    </TableCell>
                  ))}
                </TableRow>
                <TableRow className="font-bold border-t-2 border-primary bg-primary/10">
                  <TableCell className="sticky left-0 bg-primary/10 z-10 font-bold">
                    Profit for the {periodLabel}
                  </TableCell>
                  {bankingProfitLoss.map((item) => (
                    <TableCell
                      key={item.period}
                      className="text-right font-bold"
                    >
                      {formatCurrency(item.profitForPeriod).replace("$", "€")}
                    </TableCell>
                  ))}
                </TableRow>
                <TableRow>
                  <TableCell className="sticky left-0 bg-background z-10">
                    Other comprehensive income
                  </TableCell>
                  {bankingProfitLoss.map((item) => (
                    <TableCell key={item.period} className="text-right">
                      {formatCurrency(item.otherComprehensiveIncome).replace(
                        "$",
                        "€"
                      )}
                    </TableCell>
                  ))}
                </TableRow>
                <TableRow className="font-bold border-t-2 border-primary">
                  <TableCell className="sticky left-0 bg-background z-10 font-bold">
                    Total comprehensive income
                  </TableCell>
                  {bankingProfitLoss.map((item) => (
                    <TableCell
                      key={item.period}
                      className="text-right font-bold"
                    >
                      {formatCurrency(item.totalComprehensiveIncome).replace(
                        "$",
                        "€"
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              </TableBody>
            </Table>
          </div>
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
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="sticky left-0 bg-background z-10">
                    Category
                  </TableHead>
                  {bankingBalanceSheets.map((item) => (
                    <TableHead
                      key={item.period}
                      className="text-right whitespace-nowrap"
                    >
                      {item.period}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow className="bg-muted/50">
                  <TableCell
                    colSpan={bankingBalanceSheets.length + 1}
                    className="font-bold text-center"
                  >
                    ASSETS
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="sticky left-0 bg-background z-10">
                    Cash and balances with central banks
                  </TableCell>
                  {bankingBalanceSheets.map((item) => (
                    <TableCell key={item.period} className="text-right">
                      {formatCurrency(item.cashAndCentralBanks).replace(
                        "$",
                        "€"
                      )}
                    </TableCell>
                  ))}
                </TableRow>
                <TableRow>
                  <TableCell className="sticky left-0 bg-background z-10">
                    Due from banks and other financial institutions
                  </TableCell>
                  {bankingBalanceSheets.map((item) => (
                    <TableCell key={item.period} className="text-right">
                      {formatCurrency(item.dueFromBanks).replace("$", "€")}
                    </TableCell>
                  ))}
                </TableRow>
                <TableRow>
                  <TableCell className="sticky left-0 bg-background z-10">
                    Derivatives
                  </TableCell>
                  {bankingBalanceSheets.map((item) => (
                    <TableCell key={item.period} className="text-right">
                      {formatCurrency(item.derivatives).replace("$", "€")}
                    </TableCell>
                  ))}
                </TableRow>
                <TableRow>
                  <TableCell className="sticky left-0 bg-background z-10">
                    Loans and unauthorised overdrafts
                  </TableCell>
                  {bankingBalanceSheets.map((item) => (
                    <TableCell key={item.period} className="text-right">
                      {formatCurrency(item.loansAndOverdrafts).replace(
                        "$",
                        "€"
                      )}
                    </TableCell>
                  ))}
                </TableRow>
                <TableRow>
                  <TableCell className="sticky left-0 bg-background z-10">
                    Debt securities
                  </TableCell>
                  {bankingBalanceSheets.map((item) => (
                    <TableCell key={item.period} className="text-right">
                      {formatCurrency(item.debtSecurities).replace("$", "€")}
                    </TableCell>
                  ))}
                </TableRow>
                <TableRow>
                  <TableCell className="sticky left-0 bg-background z-10">
                    Other assets
                  </TableCell>
                  {bankingBalanceSheets.map((item) => (
                    <TableCell key={item.period} className="text-right">
                      {formatCurrency(item.otherAssets).replace("$", "€")}
                    </TableCell>
                  ))}
                </TableRow>
                <TableRow className="font-bold border-t-2 bg-muted/50">
                  <TableCell className="sticky left-0 bg-muted/50 z-10 font-bold">
                    Total assets
                  </TableCell>
                  {bankingBalanceSheets.map((item) => (
                    <TableCell
                      key={item.period}
                      className="text-right font-bold"
                    >
                      {formatCurrency(item.totalAssets).replace("$", "€")}
                    </TableCell>
                  ))}
                </TableRow>
                <TableRow className="bg-muted/50">
                  <TableCell
                    colSpan={bankingBalanceSheets.length + 1}
                    className="font-bold text-center"
                  >
                    LIABILITIES
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="sticky left-0 bg-background z-10">
                    Derivatives
                  </TableCell>
                  {bankingBalanceSheets.map((item) => (
                    <TableCell key={item.period} className="text-right">
                      {formatCurrency(item.derivativesLiability).replace(
                        "$",
                        "€"
                      )}
                    </TableCell>
                  ))}
                </TableRow>
                <TableRow>
                  <TableCell className="sticky left-0 bg-background z-10">
                    Due to customers
                  </TableCell>
                  {bankingBalanceSheets.map((item) => (
                    <TableCell key={item.period} className="text-right">
                      {formatCurrency(item.dueToCustomers).replace("$", "€")}
                    </TableCell>
                  ))}
                </TableRow>
                <TableRow>
                  <TableCell className="sticky left-0 bg-background z-10">
                    Due to other financial institutions
                  </TableCell>
                  {bankingBalanceSheets.map((item) => (
                    <TableCell key={item.period} className="text-right">
                      {formatCurrency(item.dueToFinancialInstitutions).replace(
                        "$",
                        "€"
                      )}
                    </TableCell>
                  ))}
                </TableRow>
                <TableRow>
                  <TableCell className="sticky left-0 bg-background z-10">
                    Other liabilities
                  </TableCell>
                  {bankingBalanceSheets.map((item) => (
                    <TableCell key={item.period} className="text-right">
                      {formatCurrency(item.otherLiabilities).replace("$", "€")}
                    </TableCell>
                  ))}
                </TableRow>
                <TableRow>
                  <TableCell className="sticky left-0 bg-background z-10">
                    Provisions
                  </TableCell>
                  {bankingBalanceSheets.map((item) => (
                    <TableCell key={item.period} className="text-right">
                      {formatCurrency(item.provisions).replace("$", "€")}
                    </TableCell>
                  ))}
                </TableRow>
                <TableRow className="font-bold border-t-2">
                  <TableCell className="sticky left-0 bg-background z-10 font-bold">
                    Total liabilities
                  </TableCell>
                  {bankingBalanceSheets.map((item) => (
                    <TableCell
                      key={item.period}
                      className="text-right font-bold"
                    >
                      {formatCurrency(item.totalLiabilities).replace("$", "€")}
                    </TableCell>
                  ))}
                </TableRow>
                <TableRow className="bg-muted/50">
                  <TableCell
                    colSpan={bankingBalanceSheets.length + 1}
                    className="font-bold text-center"
                  >
                    EQUITY
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="sticky left-0 bg-background z-10">
                    Share capital
                  </TableCell>
                  {bankingBalanceSheets.map((item) => (
                    <TableCell key={item.period} className="text-right">
                      {formatCurrency(item.shareCapital).replace("$", "€")}
                    </TableCell>
                  ))}
                </TableRow>
                <TableRow>
                  <TableCell className="sticky left-0 bg-background z-10">
                    Reserve capital
                  </TableCell>
                  {bankingBalanceSheets.map((item) => (
                    <TableCell key={item.period} className="text-right">
                      {formatCurrency(item.reserveCapital).replace("$", "€")}
                    </TableCell>
                  ))}
                </TableRow>
                <TableRow>
                  <TableCell className="sticky left-0 bg-background z-10">
                    Retained earnings
                  </TableCell>
                  {bankingBalanceSheets.map((item) => (
                    <TableCell key={item.period} className="text-right">
                      {formatCurrency(item.retainedEarnings).replace("$", "€")}
                    </TableCell>
                  ))}
                </TableRow>
                <TableRow>
                  <TableCell className="sticky left-0 bg-background z-10">
                    Reserves
                  </TableCell>
                  {bankingBalanceSheets.map((item) => (
                    <TableCell key={item.period} className="text-right">
                      {formatCurrency(item.reserves).replace("$", "€")}
                    </TableCell>
                  ))}
                </TableRow>
                <TableRow className="font-bold border-t-2 border-primary bg-primary/10">
                  <TableCell className="sticky left-0 bg-primary/10 z-10 font-bold">
                    Total equity
                  </TableCell>
                  {bankingBalanceSheets.map((item) => (
                    <TableCell
                      key={item.period}
                      className="text-right font-bold"
                    >
                      {formatCurrency(item.totalEquity).replace("$", "€")}
                    </TableCell>
                  ))}
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Key Ratios and Metrics */}
      <div className="grid gap-6 md:grid-cols-3 mb-6">
        {/* Prudential Ratios */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-green-500" />
              Prudential Ratios
            </CardTitle>
            <CardDescription>Banking Activities Compliance</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {prudentialRatios2025.map((ratio, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{ratio.name}</span>
                  <span className="text-2xl font-bold text-green-600">
                    {ratio.value}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">
                  {ratio.description}
                </p>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Asset Quality */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-blue-500" />
              Asset Quality
            </CardTitle>
            <CardDescription>Credit Risk Metrics</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {assetQualityMetrics2025.map((metric, index) => (
              <div key={index} className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-muted-foreground">
                    {metric.name}
                  </span>
                  <span className="text-sm font-bold">{metric.value}</span>
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

        {/* Profitability Ratios */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-purple-500" />
              Profitability Ratios
            </CardTitle>
            <CardDescription>2025 Performance</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {profitabilityRatios2025.map((ratio, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{ratio.name}</span>
                  <span className="text-2xl font-bold text-purple-600">
                    {ratio.value}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">
                  {ratio.description}
                </p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Income and Expense Breakdown Charts */}
      <div className="grid gap-6 md:grid-cols-2 mb-6">
        {/* Income Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle>Income Breakdown</CardTitle>
            <CardDescription>Total Operating Income: €455,635k</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                netInterest: { label: "Net Interest Income", color: "#3b82f6" },
                netFee: { label: "Net Fee & Commission", color: "#10b981" },
                derivatives: { label: "Derivatives Gains", color: "#f59e0b" },
                other: { label: "Other Income", color: "#8b5cf6" },
              }}
              className="h-[300px]"
            >
              <PieChart>
                <Pie
                  data={incomeBreakdown}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={(entry) =>
                    `${entry.name}: €${(entry.value / 1000).toFixed(0)}k`
                  }
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {incomeBreakdown.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <ChartTooltip
                  content={<ChartTooltipContent />}
                  formatter={(value) =>
                    formatCurrency(Number(value)).replace("$", "€")
                  }
                />
              </PieChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Expense Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle>Operating Expenses Breakdown</CardTitle>
            <CardDescription>
              Total Operating Expenses: €393,243k
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                operating: { label: "Other Operating", color: "#ef4444" },
                personnel: { label: "Personnel", color: "#f97316" },
                depreciation: { label: "Depreciation", color: "#a855f7" },
              }}
              className="h-[300px]"
            >
              <PieChart>
                <Pie
                  data={expenseBreakdownBanking}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={(entry) =>
                    `${entry.name}: €${(entry.value / 1000).toFixed(0)}k`
                  }
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {expenseBreakdownBanking.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <ChartTooltip
                  content={<ChartTooltipContent />}
                  formatter={(value) =>
                    formatCurrency(Number(value)).replace("$", "€")
                  }
                />
              </PieChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Asset and Liability Composition */}
      <div className="grid gap-6 md:grid-cols-2 mb-6">
        {/* Asset Composition */}
        <Card>
          <CardHeader>
            <CardTitle>Asset Composition</CardTitle>
            <CardDescription>Total Assets: €23,837,107k</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                cash: { label: "Cash & Central Banks", color: "#3b82f6" },
                loans: { label: "Loans & Overdrafts", color: "#10b981" },
                securities: { label: "Debt Securities", color: "#f59e0b" },
                other: { label: "Other Assets", color: "#8b5cf6" },
              }}
              className="h-[300px]"
            >
              <PieChart>
                <Pie
                  data={assetComposition}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={(entry) => `${entry.name}: ${entry.percentage}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {assetComposition.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <ChartTooltip
                  content={<ChartTooltipContent />}
                  formatter={(value) =>
                    formatCurrency(Number(value)).replace("$", "€")
                  }
                />
              </PieChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Liability Composition */}
        <Card>
          <CardHeader>
            <CardTitle>Liability & Equity Composition</CardTitle>
            <CardDescription>Total: €23,837,107k</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                deposits: { label: "Customer Deposits", color: "#3b82f6" },
                otherLiab: { label: "Other Liabilities", color: "#ef4444" },
                financial: {
                  label: "Due to Financial Inst.",
                  color: "#f59e0b",
                },
                provisions: { label: "Provisions", color: "#8b5cf6" },
                derivatives: { label: "Derivatives", color: "#a855f7" },
              }}
              className="h-[300px]"
            >
              <PieChart>
                <Pie
                  data={liabilityComposition}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={(entry) =>
                    entry.percentage > 1
                      ? `${entry.name}: ${entry.percentage}%`
                      : ""
                  }
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {liabilityComposition.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <ChartTooltip
                  content={<ChartTooltipContent />}
                  formatter={(value) =>
                    formatCurrency(Number(value)).replace("$", "€")
                  }
                />
              </PieChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
