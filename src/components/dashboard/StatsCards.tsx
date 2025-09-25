import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CurrencySelector } from "@/components/ui/currency-selector";
import { TrendingUp, TrendingDown, DollarSign, CreditCard, Wallet, Activity } from "lucide-react";
import { useCryptoPrices, formatCurrency } from "@/hooks/useCryptoPrices";
import { useState, useEffect } from "react";
import { StatsDetailModal } from "./StatsDetailModal";

const StatsCards = () => {
  const [currency, setCurrency] = useState('USD');
  const { data: prices, isLoading } = useCryptoPrices();
  const [selectedStat, setSelectedStat] = useState<{type: string, title: string, value: string} | null>(null);
  const [animatedValues, setAnimatedValues] = useState({
    balance: 125430.50,
    loans: 45200.00,
    income: 8750.00,
    transactions: 147
  });

  // Simulate real-time value changes
  useEffect(() => {
    const interval = setInterval(() => {
      setAnimatedValues(prev => ({
        balance: prev.balance + (Math.random() - 0.5) * 100,
        loans: prev.loans + (Math.random() - 0.5) * 50,
        income: prev.income + (Math.random() - 0.5) * 25,
        transactions: prev.transactions + Math.floor(Math.random() * 2)
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const stats = [
    {
      title: "Total Balance",
      value: prices ? formatCurrency(animatedValues.balance, currency, prices) : "$125,430.50",
      change: "+12.5%",
      changeType: "positive" as const,
      icon: Wallet,
      type: "balance"
    },
    {
      title: "Active Loans", 
      value: prices ? formatCurrency(animatedValues.loans, currency, prices) : "$45,200.00",
      change: "-2.3%",
      changeType: "negative" as const,
      icon: CreditCard,
      type: "loans"
    },
    {
      title: "Monthly Income",
      value: prices ? formatCurrency(animatedValues.income, currency, prices) : "$8,750.00",
      change: "+8.2%",
      changeType: "positive" as const,
      icon: TrendingUp,
      type: "income"
    },
    {
      title: "Transactions",
      value: animatedValues.transactions.toString(),
      change: "+15.3%",
      changeType: "positive" as const,
      icon: Activity,
      type: "transactions"
    },
  ];

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Portfolio Overview</h3>
        <CurrencySelector value={currency} onValueChange={setCurrency} />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <Card 
          key={index} 
          className="shadow-card border-border/50 hover:shadow-glow hover:scale-105 transition-all duration-300 relative overflow-hidden cursor-pointer"
          onClick={() => {
            console.log('Stats card clicked:', stat.type);
            setSelectedStat({type: stat.type, title: stat.title, value: stat.value});
          }}
        >
          {isLoading && (
            <div className="absolute top-0 right-0 w-1 h-full bg-gradient-primary animate-pulse" />
          )}
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {stat.title}
            </CardTitle>
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <stat.icon className="w-4 h-4 text-primary-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground mb-1 transition-all duration-500">
              {stat.value}
            </div>
            <div className="flex items-center text-sm">
              {stat.changeType === "positive" ? (
                <TrendingUp className="w-4 h-4 text-success mr-1" />
              ) : (
                <TrendingDown className="w-4 h-4 text-destructive mr-1" />
              )}
              <span className={stat.changeType === "positive" ? "text-success" : "text-destructive"}>
                {stat.change}
              </span>
              <span className="text-muted-foreground ml-1">from last month</span>
            </div>
          </CardContent>
        </Card>
      ))}
      </div>

      {selectedStat && (
        <StatsDetailModal
          isOpen={!!selectedStat}
          onClose={() => setSelectedStat(null)}
          statType={selectedStat.type}
          statTitle={selectedStat.title}
          statValue={selectedStat.value}
        />
      )}
    </div>
  );
};

export default StatsCards;