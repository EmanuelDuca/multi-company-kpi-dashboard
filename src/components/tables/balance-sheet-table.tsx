import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { BalanceSheet } from "@/lib/data/banking-finance";

interface BalanceSheetTableProps {
  data: BalanceSheet[];
}

export default function BalanceSheetTable({ data }: BalanceSheetTableProps) {
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
          {/* ASSETS SECTION */}
          <TableRow className="bg-muted/50">
            <TableCell
              colSpan={data.length + 1}
              className="font-bold text-center"
            >
              ASSETS
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="sticky left-0 bg-background z-10">
              Cash and balances with central banks
            </TableCell>
            {data.map((item) => (
              <TableCell key={item.period} className="text-right">
                {formatCurrency(item.cashAndCentralBanks)}
              </TableCell>
            ))}
          </TableRow>
          <TableRow>
            <TableCell className="sticky left-0 bg-background z-10">
              Due from banks and other financial institutions
            </TableCell>
            {data.map((item) => (
              <TableCell key={item.period} className="text-right">
                {formatCurrency(item.dueFromBanks)}
              </TableCell>
            ))}
          </TableRow>
          <TableRow>
            <TableCell className="sticky left-0 bg-background z-10">
              Derivatives
            </TableCell>
            {data.map((item) => (
              <TableCell key={item.period} className="text-right">
                {formatCurrency(item.derivatives)}
              </TableCell>
            ))}
          </TableRow>
          <TableRow>
            <TableCell className="sticky left-0 bg-background z-10">
              Loans and unauthorised overdrafts
            </TableCell>
            {data.map((item) => (
              <TableCell key={item.period} className="text-right">
                {formatCurrency(item.loansAndOverdrafts)}
              </TableCell>
            ))}
          </TableRow>
          <TableRow>
            <TableCell className="sticky left-0 bg-background z-10">
              Debt securities
            </TableCell>
            {data.map((item) => (
              <TableCell key={item.period} className="text-right">
                {formatCurrency(item.debtSecurities)}
              </TableCell>
            ))}
          </TableRow>
          <TableRow>
            <TableCell className="sticky left-0 bg-background z-10">
              Other assets
            </TableCell>
            {data.map((item) => (
              <TableCell key={item.period} className="text-right">
                {formatCurrency(item.otherAssets)}
              </TableCell>
            ))}
          </TableRow>
          <TableRow className="font-bold border-t-2 bg-muted/50">
            <TableCell className="sticky left-0 bg-muted/50 z-10 font-bold">
              Total assets
            </TableCell>
            {data.map((item) => (
              <TableCell key={item.period} className="text-right font-bold">
                {formatCurrency(item.totalAssets)}
              </TableCell>
            ))}
          </TableRow>

          {/* LIABILITIES SECTION */}
          <TableRow className="bg-muted/50">
            <TableCell
              colSpan={data.length + 1}
              className="font-bold text-center"
            >
              LIABILITIES
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="sticky left-0 bg-background z-10">
              Derivatives
            </TableCell>
            {data.map((item) => (
              <TableCell key={item.period} className="text-right">
                {formatCurrency(item.derivativesLiability)}
              </TableCell>
            ))}
          </TableRow>
          <TableRow>
            <TableCell className="sticky left-0 bg-background z-10">
              Due to customers
            </TableCell>
            {data.map((item) => (
              <TableCell key={item.period} className="text-right">
                {formatCurrency(item.dueToCustomers)}
              </TableCell>
            ))}
          </TableRow>
          <TableRow>
            <TableCell className="sticky left-0 bg-background z-10">
              Due to other financial institutions
            </TableCell>
            {data.map((item) => (
              <TableCell key={item.period} className="text-right">
                {formatCurrency(item.dueToFinancialInstitutions)}
              </TableCell>
            ))}
          </TableRow>
          <TableRow>
            <TableCell className="sticky left-0 bg-background z-10">
              Other liabilities
            </TableCell>
            {data.map((item) => (
              <TableCell key={item.period} className="text-right">
                {formatCurrency(item.otherLiabilities)}
              </TableCell>
            ))}
          </TableRow>
          <TableRow>
            <TableCell className="sticky left-0 bg-background z-10">
              Provisions
            </TableCell>
            {data.map((item) => (
              <TableCell key={item.period} className="text-right">
                {formatCurrency(item.provisions)}
              </TableCell>
            ))}
          </TableRow>
          <TableRow className="font-bold border-t-2">
            <TableCell className="sticky left-0 bg-background z-10 font-bold">
              Total liabilities
            </TableCell>
            {data.map((item) => (
              <TableCell key={item.period} className="text-right font-bold">
                {formatCurrency(item.totalLiabilities)}
              </TableCell>
            ))}
          </TableRow>

          {/* EQUITY SECTION */}
          <TableRow className="bg-muted/50">
            <TableCell
              colSpan={data.length + 1}
              className="font-bold text-center"
            >
              EQUITY
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="sticky left-0 bg-background z-10">
              Share capital
            </TableCell>
            {data.map((item) => (
              <TableCell key={item.period} className="text-right">
                {formatCurrency(item.shareCapital)}
              </TableCell>
            ))}
          </TableRow>
          <TableRow>
            <TableCell className="sticky left-0 bg-background z-10">
              Reserve capital
            </TableCell>
            {data.map((item) => (
              <TableCell key={item.period} className="text-right">
                {formatCurrency(item.reserveCapital)}
              </TableCell>
            ))}
          </TableRow>
          <TableRow>
            <TableCell className="sticky left-0 bg-background z-10">
              Retained earnings
            </TableCell>
            {data.map((item) => (
              <TableCell key={item.period} className="text-right">
                {formatCurrency(item.retainedEarnings)}
              </TableCell>
            ))}
          </TableRow>
          <TableRow>
            <TableCell className="sticky left-0 bg-background z-10">
              Reserves
            </TableCell>
            {data.map((item) => (
              <TableCell key={item.period} className="text-right">
                {formatCurrency(item.reserves)}
              </TableCell>
            ))}
          </TableRow>
          <TableRow className="font-bold border-t-2 border-primary bg-primary/10">
            <TableCell className="sticky left-0 bg-primary/10 z-10 font-bold">
              Total equity
            </TableCell>
            {data.map((item) => (
              <TableCell key={item.period} className="text-right font-bold">
                {formatCurrency(item.totalEquity)}
              </TableCell>
            ))}
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}
