import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CurrencySelector } from "@/components/ui/currency-selector";
import { ArrowUpDown, Clock, TrendingUp, ExternalLink, Shield } from "lucide-react";
import { useRealtimeTransactions } from "@/hooks/useRealtimeTransactions";
import { useCryptoPrices, formatCurrency } from "@/hooks/useCryptoPrices";
import { useState } from "react";
import { TransactionDetailModal } from "../transactions/TransactionDetailModal";

const TransactionHistory = () => {
  const { transactions } = useRealtimeTransactions();
  const [currency, setCurrency] = useState('USD');
  const { data: prices } = useCryptoPrices();
  const [selectedTransaction, setSelectedTransaction] = useState<any>(null);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-success text-success-foreground">Completed</Badge>;
      case 'pending':
        return <Badge className="bg-warning text-warning-foreground">Pending</Badge>;
      case 'failed':
        return <Badge variant="destructive">Failed</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'sent':
        return <ArrowUpDown className="w-4 h-4 text-destructive" />;
      case 'received':
        return <ArrowUpDown className="w-4 h-4 text-success" />;
      case 'loan':
        return <Clock className="w-4 h-4 text-warning" />;
      case 'payment':
        return <TrendingUp className="w-4 h-4 text-primary" />;
      default:
        return <ArrowUpDown className="w-4 h-4" />;
    }
  };

  return (
    <Card className="shadow-card border-border/50">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center">
            <Shield className="w-5 h-5 mr-2 text-primary" />
            Live Transaction History
          </CardTitle>
          <div className="flex items-center space-x-2">
            <Badge variant="secondary" className="animate-pulse">
              Live • {transactions.length} transactions
            </Badge>
            <CurrencySelector value={currency} onValueChange={setCurrency} />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 max-h-96 overflow-y-auto">
          {transactions.slice(0, 10).map((transaction) => (
            <Card 
              key={transaction.id} 
              className="shadow-sm border-border/30 hover:shadow-md hover:scale-105 transition-all duration-300 cursor-pointer"
              onClick={() => {
                console.log('Transaction clicked:', transaction.id);
                setSelectedTransaction(transaction);
              }}
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center">
                      {getTransactionIcon(transaction.type)}
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <p className="font-medium text-foreground capitalize">
                          {transaction.type} {transaction.currency}
                        </p>
                        {getStatusBadge(transaction.status)}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {transaction.memo || `${transaction.type === 'sent' ? 'To' : 'From'}: ${transaction.to || transaction.from || 'Unknown'}`}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {transaction.timestamp.toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`font-semibold ${
                      transaction.type === 'received' ? 'text-success' : 
                      transaction.type === 'sent' ? 'text-destructive' : 'text-foreground'
                    }`}>
                      {transaction.type === 'received' ? '+' : '-'}
                      {prices ? formatCurrency(transaction.amount, transaction.currency, prices) : `${transaction.amount} ${transaction.currency}`}
                    </p>
                    <button className="text-xs text-muted-foreground hover:text-foreground flex items-center">
                      <ExternalLink className="w-3 h-3 mr-1" />
                      {transaction.hash?.substring(0, 8)}...
                    </button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {selectedTransaction && (
          <TransactionDetailModal
            isOpen={!!selectedTransaction}
            onClose={() => setSelectedTransaction(null)}
            transaction={selectedTransaction}
          />
        )}
      </CardContent>
    </Card>
  );
};

export default TransactionHistory;