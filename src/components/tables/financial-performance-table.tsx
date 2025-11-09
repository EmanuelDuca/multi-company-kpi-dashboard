import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface FinancialData {
  revenue: number;
  cogs: number;
  netIncome: number;
  operatingExpenses: number;
  [key: string]: unknown;
}

interface FinancialPerformanceTableProps {
  data: FinancialData[];
  periodLabel: string;
}

export default function FinancialPerformanceTable({
  data,
  periodLabel,
}: FinancialPerformanceTableProps) {
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

  // Calculate totals
  const totalRevenue = data.reduce((sum, d) => sum + d.revenue, 0);
  const totalCogs = data.reduce((sum, d) => sum + d.cogs, 0);
  const totalGrossProfit = data.reduce(
    (sum, d) => sum + calculateGrossProfit(d.revenue, d.cogs),
    0
  );
  const totalOperatingExpenses = data.reduce(
    (sum, d) => sum + d.operatingExpenses,
    0
  );
  const totalNetIncome = data.reduce((sum, d) => sum + d.netIncome, 0);
  const totalProfitMargin =
    totalRevenue > 0
      ? ((totalNetIncome / totalRevenue) * 100).toFixed(1)
      : "0.0";

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>
            {periodLabel.charAt(0).toUpperCase() + periodLabel.slice(1)}
          </TableHead>
          <TableHead className="text-right">Revenue</TableHead>
          <TableHead className="text-right">COGS</TableHead>
          <TableHead className="text-right">Gross Profit</TableHead>
          <TableHead className="text-right">Operating Expenses</TableHead>
          <TableHead className="text-right">Net Income</TableHead>
          <TableHead className="text-right">Profit Margin</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((item) => {
          const grossProfit = calculateGrossProfit(item.revenue, item.cogs);
          const profitMargin = calculateProfitMargin(
            item.netIncome,
            item.revenue
          );
          const periodKey = item[periodLabel] as string;

          return (
            <TableRow key={periodKey}>
              <TableCell className="font-medium">{periodKey}</TableCell>
              <TableCell className="text-right">
                {formatCurrency(item.revenue)}
              </TableCell>
              <TableCell className="text-right">
                {formatCurrency(item.cogs)}
              </TableCell>
              <TableCell className="text-right font-medium">
                {formatCurrency(grossProfit)}
              </TableCell>
              <TableCell className="text-right">
                {formatCurrency(item.operatingExpenses)}
              </TableCell>
              <TableCell className="text-right font-bold text-green-600">
                {formatCurrency(item.netIncome)}
              </TableCell>
              <TableCell className="text-right">{profitMargin}%</TableCell>
            </TableRow>
          );
        })}
        <TableRow className="bg-muted/50 font-bold">
          <TableCell>Total</TableCell>
          <TableCell className="text-right">
            {formatCurrency(totalRevenue)}
          </TableCell>
          <TableCell className="text-right">
            {formatCurrency(totalCogs)}
          </TableCell>
          <TableCell className="text-right">
            {formatCurrency(totalGrossProfit)}
          </TableCell>
          <TableCell className="text-right">
            {formatCurrency(totalOperatingExpenses)}
          </TableCell>
          <TableCell className="text-right text-green-600">
            {formatCurrency(totalNetIncome)}
          </TableCell>
          <TableCell className="text-right">{totalProfitMargin}%</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
