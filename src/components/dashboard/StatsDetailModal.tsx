import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, TrendingDown, Wallet, CreditCard, Activity, DollarSign, Calendar, Users } from "lucide-react";
import { useCryptoPrices, formatCurrency } from "@/hooks/useCryptoPrices";
import { useRealtimeTransactions } from "@/hooks/useRealtimeTransactions";

interface StatsDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  statType: string;
  statTitle: string;
  statValue: string;
}

export const StatsDetailModal = ({ isOpen, onClose, statType, statTitle, statValue }: StatsDetailModalProps) => {
  const { data: prices } = useCryptoPrices();
  const { transactions } = useRealtimeTransactions();

  const getDetailedContent = () => {
    switch (statType) {
      case "balance":
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <Card className="border-border/50">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Wallet className="w-4 h-4 text-primary" />
                    <span className="text-sm font-medium">Checking Account</span>
                  </div>
                  <p className="text-2xl font-bold text-foreground">$89,245.32</p>
                  <p className="text-xs text-success">+5.2% this month</p>
                </CardContent>
              </Card>
              <Card className="border-border/50">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <TrendingUp className="w-4 h-4 text-success" />
                    <span className="text-sm font-medium">Savings Account</span>
                  </div>
                  <p className="text-2xl font-bold text-foreground">$36,185.18</p>
                  <p className="text-xs text-success">+2.8% APY</p>
                </CardContent>
              </Card>
            </div>
            
            <div className="space-y-3">
              <h4 className="font-semibold text-foreground">Account Breakdown</h4>
              {[
                { name: "USD Cash", amount: 89245.32, percentage: 71 },
                { name: "HBAR Holdings", amount: 25430.50, percentage: 20 },
                { name: "BTC Holdings", amount: 8754.68, percentage: 7 },
                { name: "ETH Holdings", amount: 2000.00, percentage: 2 }
              ].map((item) => (
                <div key={item.name} className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">{item.name}</span>
                    <span className="text-sm font-medium">${item.amount.toLocaleString()}</span>
                  </div>
                  <Progress value={item.percentage} className="h-1" />
                </div>
              ))}
            </div>
          </div>
        );

      case "loans":
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <Card className="border-border/50">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <CreditCard className="w-4 h-4 text-primary" />
                    <span className="text-sm font-medium">Active Loans</span>
                  </div>
                  <p className="text-2xl font-bold text-foreground">3</p>
                  <p className="text-xs text-muted-foreground">Total active</p>
                </CardContent>
              </Card>
              <Card className="border-border/50">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Calendar className="w-4 h-4 text-warning" />
                    <span className="text-sm font-medium">Next Payment</span>
                  </div>
                  <p className="text-lg font-bold text-foreground">$2,500</p>
                  <p className="text-xs text-warning">Due Feb 15, 2024</p>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold text-foreground">Loan Details</h4>
              {[
                { type: "Business Loan", remaining: 32500, rate: 5.25, payment: 2500 },
                { type: "Equipment Financing", remaining: 8750, rate: 4.75, payment: 1250 },
                { type: "Personal Line of Credit", remaining: 4950, rate: 6.50, payment: 450 }
              ].map((loan, index) => (
                <Card key={index} className="border-border/50">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <span className="font-medium text-foreground">{loan.type}</span>
                      <Badge variant="secondary">{loan.rate}% APR</Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <span className="text-muted-foreground">Remaining: </span>
                        <span className="font-medium">${loan.remaining.toLocaleString()}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Monthly: </span>
                        <span className="font-medium">${loan.payment.toLocaleString()}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );

      case "income":
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-3 gap-4">
              <Card className="border-border/50">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <DollarSign className="w-4 h-4 text-success" />
                    <span className="text-sm font-medium">This Month</span>
                  </div>
                  <p className="text-xl font-bold text-foreground">$8,750</p>
                </CardContent>
              </Card>
              <Card className="border-border/50">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <TrendingUp className="w-4 h-4 text-primary" />
                    <span className="text-sm font-medium">Last Month</span>
                  </div>
                  <p className="text-xl font-bold text-foreground">$8,085</p>
                </CardContent>
              </Card>
              <Card className="border-border/50">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Users className="w-4 h-4 text-warning" />
                    <span className="text-sm font-medium">Avg 6 Months</span>
                  </div>
                  <p className="text-xl font-bold text-foreground">$7,925</p>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-3">
              <h4 className="font-semibold text-foreground">Income Sources</h4>
              {[
                { source: "Salary/Wages", amount: 6500, percentage: 74 },
                { source: "Freelance Work", amount: 1250, percentage: 14 },
                { source: "Investment Returns", amount: 750, percentage: 9 },
                { source: "Other Income", amount: 250, percentage: 3 }
              ].map((item) => (
                <div key={item.source} className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">{item.source}</span>
                    <span className="text-sm font-medium">${item.amount.toLocaleString()}</span>
                  </div>
                  <Progress value={item.percentage} className="h-1" />
                </div>
              ))}
            </div>
          </div>
        );

      case "transactions":
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-4 gap-4">
              <Card className="border-border/50">
                <CardContent className="p-3">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-foreground">{transactions.length}</p>
                    <p className="text-xs text-muted-foreground">Total</p>
                  </div>
                </CardContent>
              </Card>
              <Card className="border-border/50">
                <CardContent className="p-3">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-success">
                      {transactions.filter(t => t.type === 'received').length}
                    </p>
                    <p className="text-xs text-muted-foreground">Received</p>
                  </div>
                </CardContent>
              </Card>
              <Card className="border-border/50">
                <CardContent className="p-3">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-warning">
                      {transactions.filter(t => t.type === 'sent').length}
                    </p>
                    <p className="text-xs text-muted-foreground">Sent</p>
                  </div>
                </CardContent>
              </Card>
              <Card className="border-border/50">
                <CardContent className="p-3">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-primary">
                      {transactions.filter(t => t.status === 'pending').length}
                    </p>
                    <p className="text-xs text-muted-foreground">Pending</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-3">
              <h4 className="font-semibold text-foreground">Recent Activity</h4>
              <div className="max-h-64 overflow-y-auto space-y-2">
                {transactions.slice(0, 8).map((transaction) => (
                  <Card key={transaction.id} className="border-border/50">
                    <CardContent className="p-3">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <Activity className="w-4 h-4 text-primary" />
                            <span className="font-medium text-foreground capitalize">
                              {transaction.type}
                            </span>
                            <Badge 
                              variant={transaction.status === 'completed' ? 'default' : 'secondary'}
                              className="text-xs"
                            >
                              {transaction.status}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">
                            {transaction.memo}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className={`font-medium ${
                            transaction.type === 'received' ? 'text-success' : 'text-warning'
                          }`}>
                            {transaction.type === 'received' ? '+' : '-'}
                            {prices ? formatCurrency(transaction.amount, transaction.currency, prices) : 
                            `$${transaction.amount.toLocaleString()}`}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {transaction.timestamp.toLocaleTimeString()}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        );

      default:
        return <div>No detailed information available</div>;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <span>Detailed View: {statTitle}</span>
            <Badge variant="outline">{statValue}</Badge>
          </DialogTitle>
        </DialogHeader>
        {getDetailedContent()}
      </DialogContent>
    </Dialog>
  );
};