import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { HeroButton } from "@/components/ui/hero-button";
import { 
  ArrowUpRight, ArrowDownLeft, Copy, ExternalLink, 
  Calendar, Hash, DollarSign, MapPin, Clock, Share
} from "lucide-react";
import { Transaction } from "@/hooks/useRealtimeTransactions";
import { useCryptoPrices, formatCurrency } from "@/hooks/useCryptoPrices";
import { useToast } from "@/hooks/use-toast";

interface TransactionDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  transaction: Transaction;
}

export const TransactionDetailModal = ({ isOpen, onClose, transaction }: TransactionDetailModalProps) => {
  const { data: prices } = useCryptoPrices();
  const { toast } = useToast();

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied",
      description: `${label} copied to clipboard`,
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-success text-success-foreground';
      case 'pending': return 'bg-warning text-warning-foreground';
      case 'failed': return 'bg-destructive text-destructive-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getTypeDetails = () => {
    switch (transaction.type) {
      case 'sent':
        return {
          icon: ArrowUpRight,
          color: 'text-warning',
          label: 'Sent Payment',
          direction: 'To:'
        };
      case 'received':
        return {
          icon: ArrowDownLeft,
          color: 'text-success',
          label: 'Received Payment',
          direction: 'From:'
        };
      case 'loan':
        return {
          icon: DollarSign,
          color: 'text-primary',
          label: 'Loan Payment',
          direction: 'To:'
        };
      case 'payment':
        return {
          icon: DollarSign,
          color: 'text-primary',
          label: 'Business Payment',
          direction: 'To:'
        };
      default:
        return {
          icon: DollarSign,
          color: 'text-foreground',
          label: 'Transaction',
          direction: ''
        };
    }
  };

  const typeDetails = getTypeDetails();
  const TypeIcon = typeDetails.icon;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className={`w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center`}>
                <TypeIcon className={`w-5 h-5 text-primary-foreground`} />
              </div>
              <div>
                <span className="text-xl">{typeDetails.label}</span>
                <p className="text-sm text-muted-foreground font-normal">
                  Transaction ID: {transaction.id}
                </p>
              </div>
            </div>
            <Badge className={getStatusColor(transaction.status)}>
              {transaction.status}
            </Badge>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Amount Card */}
          <Card className="border-border/50 bg-gradient-subtle">
            <CardContent className="p-6 text-center">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Transaction Amount</p>
                <p className={`text-4xl font-bold ${typeDetails.color}`}>
                  {transaction.type === 'received' ? '+' : '-'}
                  {prices ? formatCurrency(transaction.amount, transaction.currency, prices) : 
                   `$${transaction.amount.toLocaleString()}`}
                </p>
                <p className="text-sm text-muted-foreground">
                  {transaction.currency} • Network Fee: $0.0001 HBAR
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Transaction Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="border-border/50">
              <CardContent className="p-4">
                <div className="flex items-center space-x-2 mb-3">
                  <Calendar className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium">Date & Time</span>
                </div>
                <p className="text-foreground font-medium">
                  {transaction.timestamp.toLocaleDateString()}
                </p>
                <p className="text-sm text-muted-foreground">
                  {transaction.timestamp.toLocaleTimeString()}
                </p>
              </CardContent>
            </Card>

            <Card className="border-border/50">
              <CardContent className="p-4">
                <div className="flex items-center space-x-2 mb-3">
                  <DollarSign className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium">Currency</span>
                </div>
                <p className="text-foreground font-medium">{transaction.currency}</p>
                <p className="text-sm text-muted-foreground">
                  {transaction.currency === 'USD' ? 'US Dollar' : 
                   transaction.currency === 'EUR' ? 'Euro' :
                   transaction.currency === 'HBAR' ? 'Hedera Hashgraph' :
                   transaction.currency === 'BTC' ? 'Bitcoin' :
                   transaction.currency === 'ETH' ? 'Ethereum' : transaction.currency}
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Transaction Hash */}
          {transaction.hash && (
            <Card className="border-border/50">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <Hash className="w-4 h-4 text-primary" />
                    <span className="text-sm font-medium">Transaction Hash</span>
                  </div>
                  <div className="flex space-x-2">
                    <HeroButton 
                      variant="outline" 
                      size="sm"
                      onClick={() => copyToClipboard(transaction.hash!, 'Transaction hash')}
                    >
                      <Copy className="w-3 h-3 mr-1" />
                      Copy
                    </HeroButton>
                    <HeroButton variant="outline" size="sm">
                      <ExternalLink className="w-3 h-3 mr-1" />
                      Explorer
                    </HeroButton>
                  </div>
                </div>
                <p className="text-foreground font-mono text-sm break-all">
                  {transaction.hash}
                </p>
              </CardContent>
            </Card>
          )}

          {/* Addresses */}
          <div className="space-y-4">
            {transaction.from && (
              <Card className="border-border/50">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-4 h-4 text-primary" />
                      <span className="text-sm font-medium">From Address</span>
                    </div>
                    <HeroButton 
                      variant="outline" 
                      size="sm"
                      onClick={() => copyToClipboard(transaction.from!, 'From address')}
                    >
                      <Copy className="w-3 h-3 mr-1" />
                      Copy
                    </HeroButton>
                  </div>
                  <p className="text-foreground font-mono text-sm">{transaction.from}</p>
                </CardContent>
              </Card>
            )}

            {transaction.to && (
              <Card className="border-border/50">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-4 h-4 text-primary" />
                      <span className="text-sm font-medium">To Address</span>
                    </div>
                    <HeroButton 
                      variant="outline" 
                      size="sm"
                      onClick={() => copyToClipboard(transaction.to!, 'To address')}
                    >
                      <Copy className="w-3 h-3 mr-1" />
                      Copy
                    </HeroButton>
                  </div>
                  <p className="text-foreground font-mono text-sm">{transaction.to}</p>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Memo */}
          {transaction.memo && (
            <Card className="border-border/50">
              <CardContent className="p-4">
                <div className="flex items-center space-x-2 mb-3">
                  <Hash className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium">Memo</span>
                </div>
                <p className="text-foreground">{transaction.memo}</p>
              </CardContent>
            </Card>
          )}

          {/* Network Information */}
          <Card className="border-border/50 bg-gradient-primary text-primary-foreground">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold mb-1">Hedera Network</h3>
                  <p className="text-primary-foreground/80 text-sm">
                    Processed on Hedera Hashgraph mainnet
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm">Network Fee</p>
                  <p className="font-semibold">$0.0001 HBAR</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex space-x-3">
            <HeroButton variant="hero" className="flex-1">
              <Share className="w-4 h-4 mr-2" />
              Share Transaction
            </HeroButton>
            <HeroButton variant="outline" className="flex-1">
              <Copy className="w-4 h-4 mr-2" />
              Export Receipt
            </HeroButton>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};