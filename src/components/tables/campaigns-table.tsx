import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { marketingData } from "@/lib/data/marketing";

export default function CampaignsTable() {
  return (
    <Card className="backdrop-blur-xl bg-gradient-to-br from-background/95 to-background/80 border-white/10">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">
          Active Campaigns
        </CardTitle>
        <CardDescription>
          Detailed performance metrics for all marketing campaigns
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="rounded-lg border border-white/10 overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-muted/50">
                <TableHead className="font-semibold">Campaign</TableHead>
                <TableHead className="font-semibold">Status</TableHead>
                <TableHead className="font-semibold text-right">
                  Impressions
                </TableHead>
                <TableHead className="font-semibold text-right">
                  Clicks
                </TableHead>
                <TableHead className="font-semibold text-right">CTR</TableHead>
                <TableHead className="font-semibold text-right">
                  Conversions
                </TableHead>
                <TableHead className="font-semibold text-right">
                  Conv. Rate
                </TableHead>
                <TableHead className="font-semibold text-right">
                  Spend
                </TableHead>
                <TableHead className="font-semibold text-right">ROAS</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {marketingData.campaigns.map((campaign) => (
                <TableRow
                  key={campaign.id}
                  className="hover:bg-muted/50 transition-colors"
                >
                  <TableCell>
                    <div className="space-y-1">
                      <div className="font-medium">{campaign.name}</div>
                      <div className="text-xs text-muted-foreground">
                        {campaign.platform}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        campaign.status === "active" ? "default" : "secondary"
                      }
                      className={
                        campaign.status === "active"
                          ? "bg-green-500/10 text-green-500 border-green-500/20"
                          : "bg-gray-500/10 text-gray-500 border-gray-500/20"
                      }
                    >
                      {campaign.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right font-mono text-sm">
                    {campaign.impressions.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-right font-mono text-sm">
                    {campaign.clicks.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-right font-mono text-sm">
                    {campaign.ctr.toFixed(2)}%
                  </TableCell>
                  <TableCell className="text-right font-mono text-sm font-semibold text-green-500">
                    {campaign.conversions.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-right font-mono text-sm">
                    {campaign.conversionRate.toFixed(2)}%
                  </TableCell>
                  <TableCell className="text-right font-mono text-sm">
                    ${campaign.spend.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-right">
                    <Badge
                      variant="outline"
                      className={
                        campaign.roas >= 4
                          ? "border-green-500/50 bg-green-500/10 text-green-500"
                          : campaign.roas >= 3
                          ? "border-yellow-500/50 bg-yellow-500/10 text-yellow-500"
                          : "border-red-500/50 bg-red-500/10 text-red-500"
                      }
                    >
                      {campaign.roas.toFixed(2)}x
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
