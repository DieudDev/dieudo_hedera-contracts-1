import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, RefreshCw } from "lucide-react";
import { useCryptoPrices } from "@/hooks/useCryptoPrices";
import { useState } from "react";
import { CryptoDetailModal } from "./CryptoDetailModal";

const CryptoPriceTicker = () => {
  const { data: prices, isLoading, error } = useCryptoPrices();
  const [selectedCrypto, setSelectedCrypto] = useState<any>(null);

  if (error) {
    return (
      <Card className="shadow-card border-border/50">
        <CardContent className="p-4">
          <div className="flex items-center justify-center text-muted-foreground">
            <span className="text-sm">Unable to load prices</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  const cryptoData = [
    {
      symbol: 'HBAR',
      name: 'Hedera',
      price: prices?.hbar || 0.052,
      change: '+2.4%',
      changeType: 'positive' as const,
    },
    {
      symbol: 'BTC',
      name: 'Bitcoin',
      price: prices?.bitcoin || 43250,
      change: '-0.8%',
      changeType: 'negative' as const,
    },
    {
      symbol: 'ETH',
      name: 'Ethereum',
      price: prices?.ethereum || 2785,
      change: '+1.2%',
      changeType: 'positive' as const,
    },
  ];

  return (
    <Card className="shadow-card border-border/50">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-foreground">Live Market Prices</h3>
          {isLoading ? (
            <RefreshCw className="w-4 h-4 animate-spin text-primary" />
          ) : (
            <Badge variant="secondary" className="animate-pulse">
              Live
            </Badge>
          )}
        </div>
        
        <div className="space-y-3">
          {cryptoData.map((crypto) => (
            <div 
              key={crypto.symbol} 
              className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/30 transition-colors cursor-pointer"
              onClick={() => {
                console.log('Crypto clicked:', crypto.symbol);
                setSelectedCrypto(crypto);
              }}
            >
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-gradient-primary flex items-center justify-center">
                  <span className="text-xs font-bold text-primary-foreground">
                    {crypto.symbol === 'HBAR' ? 'ℏ' : crypto.symbol === 'BTC' ? '₿' : 'Ξ'}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">{crypto.symbol}</p>
                  <p className="text-xs text-muted-foreground">{crypto.name}</p>
                </div>
              </div>
              
              <div className="text-right">
                <p className="text-sm font-semibold text-foreground">
                  ${crypto.price.toFixed(crypto.symbol === 'HBAR' ? 4 : 0)}
                </p>
                <div className="flex items-center">
                  {crypto.changeType === 'positive' ? (
                    <TrendingUp className="w-3 h-3 text-success mr-1" />
                  ) : (
                    <TrendingDown className="w-3 h-3 text-destructive mr-1" />
                  )}
                  <span className={`text-xs ${
                    crypto.changeType === 'positive' ? 'text-success' : 'text-destructive'
                  }`}>
                    {crypto.change}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {selectedCrypto && (
          <CryptoDetailModal
            isOpen={!!selectedCrypto}
            onClose={() => setSelectedCrypto(null)}
            crypto={selectedCrypto}
          />
        )}
      </CardContent>
    </Card>
  );
};

export default CryptoPriceTicker;