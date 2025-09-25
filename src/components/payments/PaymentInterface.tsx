import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { HeroButton } from "@/components/ui/hero-button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { CurrencySelector } from "@/components/ui/currency-selector";
import { Send, QrCode, History, Zap, RefreshCw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useCryptoPrices, formatCurrency } from "@/hooks/useCryptoPrices";
import { useRealtimeTransactions } from "@/hooks/useRealtimeTransactions";

const PaymentInterface = () => {
  const [amount, setAmount] = useState("");
  const [recipient, setRecipient] = useState("");
  const [memo, setMemo] = useState("");
  const [paymentType, setPaymentType] = useState("");
  const [currency, setCurrency] = useState("USD");
  const { toast } = useToast();
  const { data: prices, isLoading: pricesLoading } = useCryptoPrices();
  const { addTransaction } = useRealtimeTransactions();

  const handleSendPayment = async () => {
    if (!amount || !recipient) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    // Add real-time transaction
    const transaction = addTransaction({
      type: 'sent',
      amount: parseFloat(amount),
      currency: currency,
      to: recipient,
      status: 'pending',
      memo: memo || 'Payment transfer'
    });

    // Simulate payment processing
    toast({
      title: "Payment Initiated",
      description: `Sending ${prices ? formatCurrency(parseFloat(amount), currency, prices) : `${amount} ${currency}`} to ${recipient} via Hedera Network`,
    });

    // Simulate completion after 3 seconds
    setTimeout(() => {
      toast({
        title: "Payment Completed",
        description: `Transaction hash: ${transaction.hash?.substring(0, 16)}...`,
      });
    }, 3000);

    // Reset form
    setAmount("");
    setRecipient("");
    setMemo("");
    setPaymentType("");
  };

  const quickAmounts = [100, 500, 1000, 2500];
  const recentRecipients = [
    { name: "Business Partner", address: "0.0.123456" },
    { name: "Supplier Payment", address: "0.0.789012" },
    { name: "Loan Payment", address: "0.0.345678" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-foreground">Send Payment</h2>
        <div className="flex space-x-2">
          <CurrencySelector value={currency} onValueChange={setCurrency} />
          {pricesLoading && <RefreshCw className="w-4 h-4 animate-spin text-primary" />}
          <HeroButton variant="outline" size="sm">
            <QrCode className="w-4 h-4 mr-2" />
            Scan QR
          </HeroButton>
          <HeroButton variant="outline" size="sm">
            <History className="w-4 h-4 mr-2" />
            History
          </HeroButton>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Payment Form */}
        <div className="lg:col-span-2">
          <Card className="shadow-card border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Send className="w-5 h-5 mr-2 text-primary" />
                Transfer Funds
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Amount Input */}
              <div className="space-y-2">
                <Label htmlFor="amount">Amount ({currency})</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                    {currency === 'USD' ? '$' : currency === 'EUR' ? '€' : currency === 'BTC' ? '₿' : currency === 'ETH' ? 'Ξ' : 'ℏ'}
                  </span>
                  <Input
                    id="amount"
                    type="number"
                    placeholder="0.00"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="pl-8 text-lg h-12"
                  />
                </div>
                {prices && amount && (
                  <p className="text-sm text-muted-foreground">
                    ≈ {formatCurrency(parseFloat(amount) || 0, currency, prices)}
                  </p>
                )}
                {/* Quick Amount Buttons */}
                <div className="flex space-x-2">
                  {quickAmounts.map((quickAmount) => (
                    <button
                      key={quickAmount}
                      onClick={() => setAmount(quickAmount.toString())}
                      className="px-3 py-1 text-sm bg-muted hover:bg-muted/80 rounded-md transition-colors"
                    >
                      {currency === 'USD' ? '$' : currency === 'EUR' ? '€' : ''}{quickAmount}
                    </button>
                  ))}
                </div>
              </div>

              {/* Recipient */}
              <div className="space-y-2">
                <Label htmlFor="recipient">Recipient Hedera ID</Label>
                <Input
                  id="recipient"
                  placeholder="0.0.123456789"
                  value={recipient}
                  onChange={(e) => setRecipient(e.target.value)}
                  className="h-12"
                />
              </div>

              {/* Payment Type */}
              <div className="space-y-2">
                <Label>Payment Type</Label>
                <Select value={paymentType} onValueChange={setPaymentType}>
                  <SelectTrigger className="h-12">
                    <SelectValue placeholder="Select payment type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="personal">Personal Transfer</SelectItem>
                    <SelectItem value="business">Business Payment</SelectItem>
                    <SelectItem value="loan">Loan Payment</SelectItem>
                    <SelectItem value="invoice">Invoice Payment</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Memo */}
              <div className="space-y-2">
                <Label htmlFor="memo">Memo (Optional)</Label>
                <Textarea
                  id="memo"
                  placeholder="Add a note for this transaction..."
                  value={memo}
                  onChange={(e) => setMemo(e.target.value)}
                  rows={3}
                />
              </div>

              {/* Transaction Fee */}
              <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg border border-border/30">
                <div className="flex items-center space-x-2">
                  <Zap className="w-4 h-4 text-warning" />
                  <span className="text-sm font-medium">Network Fee</span>
                </div>
                <span className="text-sm font-semibold text-success">$0.0001 HBAR</span>
              </div>

              {/* Send Button */}
              <HeroButton 
                onClick={handleSendPayment} 
                className="w-full" 
                size="lg"
              >
                <Send className="w-5 h-5 mr-2" />
                Send Payment
              </HeroButton>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Recent Recipients */}
          <Card className="shadow-card border-border/50">
            <CardHeader>
              <CardTitle className="text-lg">Recent Recipients</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {recentRecipients.map((recipient, index) => (
                <button
                  key={index}
                  onClick={() => setRecipient(recipient.address)}
                  className="w-full flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors text-left"
                >
                  <div>
                    <p className="font-medium text-foreground">{recipient.name}</p>
                    <p className="text-sm text-muted-foreground">{recipient.address}</p>
                  </div>
                </button>
              ))}
            </CardContent>
          </Card>

          {/* Balance Card */}
          <Card className="shadow-card border-border/50 bg-gradient-primary text-primary-foreground">
            <CardContent className="p-6 text-center">
              <h3 className="text-lg font-semibold mb-2">Available Balance</h3>
              <p className="text-3xl font-bold mb-1">
                {prices ? formatCurrency(125430.50, currency, prices) : '$125,430.50'}
              </p>
              <p className="text-primary-foreground/80 text-sm">
                ≈ {prices ? `${(125430.50 * prices.hbar).toFixed(2)} HBAR` : '2,847.23 HBAR'}
              </p>
              {pricesLoading && (
                <div className="mt-2 flex items-center justify-center">
                  <RefreshCw className="w-3 h-3 animate-spin mr-1" />
                  <span className="text-xs">Updating prices...</span>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PaymentInterface;