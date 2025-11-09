import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { ProfitLossStatement } from "@/lib/data/banking-finance";

interface ProfitLossTableProps {
  data: ProfitLossStatement[];
  periodLabel?: string;
}

export default function ProfitLossTable({
  data,
  periodLabel = "period",
}: ProfitLossTableProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    })
      .format(value)
      .replace("$", "€");
  };

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="sticky left-0 bg-background z-10">
              Category
            </TableHead>
            {data.map((item) => (
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
            {data.map((item) => (
              <TableCell key={item.period} className="text-right">
                {formatCurrency(item.interestIncome)}
              </TableCell>
            ))}
          </TableRow>
          <TableRow>
            <TableCell className="sticky left-0 bg-background z-10">
              Interest expense
            </TableCell>
            {data.map((item) => (
              <TableCell key={item.period} className="text-right text-red-500">
                ({formatCurrency(Math.abs(item.interestExpense))})
              </TableCell>
            ))}
          </TableRow>
          <TableRow className="font-bold border-t-2">
            <TableCell className="sticky left-0 bg-background z-10 font-bold">
              Net interest income
            </TableCell>
            {data.map((item) => (
              <TableCell key={item.period} className="text-right font-bold">
                {formatCurrency(item.netInterestIncome)}
              </TableCell>
            ))}
          </TableRow>
          <TableRow>
            <TableCell className="sticky left-0 bg-background z-10">
              Fee and commission income
            </TableCell>
            {data.map((item) => (
              <TableCell key={item.period} className="text-right">
                {formatCurrency(item.feeIncome)}
              </TableCell>
            ))}
          </TableRow>
          <TableRow>
            <TableCell className="sticky left-0 bg-background z-10">
              Fee and commission expense
            </TableCell>
            {data.map((item) => (
              <TableCell key={item.period} className="text-right text-red-500">
                ({formatCurrency(Math.abs(item.feeExpense))})
              </TableCell>
            ))}
          </TableRow>
          <TableRow className="font-bold border-t-2">
            <TableCell className="sticky left-0 bg-background z-10 font-bold">
              Net fee and commission income
            </TableCell>
            {data.map((item) => (
              <TableCell key={item.period} className="text-right font-bold">
                {formatCurrency(item.netFeeIncome)}
              </TableCell>
            ))}
          </TableRow>
          <TableRow>
            <TableCell className="sticky left-0 bg-background z-10">
              Net gains and losses on derivatives
            </TableCell>
            {data.map((item) => (
              <TableCell key={item.period} className="text-right">
                {formatCurrency(item.derivativesGains)}
              </TableCell>
            ))}
          </TableRow>
          <TableRow>
            <TableCell className="sticky left-0 bg-background z-10">
              Credit loss expense on financial assets
            </TableCell>
            {data.map((item) => (
              <TableCell key={item.period} className="text-right text-red-500">
                ({formatCurrency(Math.abs(item.creditLossExpense))})
              </TableCell>
            ))}
          </TableRow>
          <TableRow>
            <TableCell className="sticky left-0 bg-background z-10">
              Other operating income
            </TableCell>
            {data.map((item) => (
              <TableCell key={item.period} className="text-right">
                {formatCurrency(item.otherIncome)}
              </TableCell>
            ))}
          </TableRow>
          <TableRow className="font-bold border-t-2 bg-muted/50">
            <TableCell className="sticky left-0 bg-muted/50 z-10 font-bold">
              Net operating income
            </TableCell>
            {data.map((item) => (
              <TableCell key={item.period} className="text-right font-bold">
                {formatCurrency(item.netOperatingIncome)}
              </TableCell>
            ))}
          </TableRow>
          <TableRow>
            <TableCell className="sticky left-0 bg-background z-10">
              Personnel expenses
            </TableCell>
            {data.map((item) => (
              <TableCell key={item.period} className="text-right text-red-500">
                ({formatCurrency(Math.abs(item.personnelExpenses))})
              </TableCell>
            ))}
          </TableRow>
          <TableRow>
            <TableCell className="sticky left-0 bg-background z-10">
              Depreciation and amortisation
            </TableCell>
            {data.map((item) => (
              <TableCell key={item.period} className="text-right text-red-500">
                ({formatCurrency(Math.abs(item.depreciation))})
              </TableCell>
            ))}
          </TableRow>
          <TableRow>
            <TableCell className="sticky left-0 bg-background z-10">
              Other operating expenses
            </TableCell>
            {data.map((item) => (
              <TableCell key={item.period} className="text-right text-red-500">
                ({formatCurrency(Math.abs(item.otherOperatingExpenses))})
              </TableCell>
            ))}
          </TableRow>
          <TableRow className="font-bold border-t-2">
            <TableCell className="sticky left-0 bg-background z-10 font-bold">
              Total operating expenses
            </TableCell>
            {data.map((item) => (
              <TableCell
                key={item.period}
                className="text-right font-bold text-red-500"
              >
                ({formatCurrency(Math.abs(item.totalOperatingExpenses))})
              </TableCell>
            ))}
          </TableRow>
          <TableRow className="font-bold border-t-2 bg-muted/50">
            <TableCell className="sticky left-0 bg-muted/50 z-10 font-bold">
              Profit before tax
            </TableCell>
            {data.map((item) => (
              <TableCell key={item.period} className="text-right font-bold">
                {formatCurrency(item.profitBeforeTax)}
              </TableCell>
            ))}
          </TableRow>
          <TableRow>
            <TableCell className="sticky left-0 bg-background z-10">
              Tax expense
            </TableCell>
            {data.map((item) => (
              <TableCell key={item.period} className="text-right text-red-500">
                ({formatCurrency(Math.abs(item.taxExpense))})
              </TableCell>
            ))}
          </TableRow>
          <TableRow className="font-bold border-t-2 border-primary bg-primary/10">
            <TableCell className="sticky left-0 bg-primary/10 z-10 font-bold">
              Profit for the {periodLabel}
            </TableCell>
            {data.map((item) => (
              <TableCell key={item.period} className="text-right font-bold">
                {formatCurrency(item.profitForPeriod)}
              </TableCell>
            ))}
          </TableRow>
          <TableRow>
            <TableCell className="sticky left-0 bg-background z-10">
              Other comprehensive income
            </TableCell>
            {data.map((item) => (
              <TableCell key={item.period} className="text-right">
                {formatCurrency(item.otherComprehensiveIncome)}
              </TableCell>
            ))}
          </TableRow>
          <TableRow className="font-bold border-t-2 border-primary">
            <TableCell className="sticky left-0 bg-background z-10 font-bold">
              Total comprehensive income
            </TableCell>
            {data.map((item) => (
              <TableCell key={item.period} className="text-right font-bold">
                {formatCurrency(item.totalComprehensiveIncome)}
              </TableCell>
            ))}
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}
