import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { HeroButton } from "@/components/ui/hero-button";
import { TrendingUp, TrendingDown, BarChart3, DollarSign, Activity, Clock, Globe } from "lucide-react";
import { useCryptoPrices } from "@/hooks/useCryptoPrices";

interface CryptoDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  crypto: {
    symbol: string;
    name: string;
    price: number;
    change: string;
    changeType: 'positive' | 'negative';
  };
}

export const CryptoDetailModal = ({ isOpen, onClose, crypto }: CryptoDetailModalProps) => {
  const { data: prices } = useCryptoPrices();

  const getMarketData = () => {
    switch (crypto.symbol) {
      case 'HBAR':
        return {
          marketCap: '$2.1B',
          volume24h: '$45.2M',
          supply: '50B HBAR',
          rank: '#37',
          ath: '$0.5701',
          atl: '$0.000862',
          website: 'hedera.com',
          description: 'Hedera is a decentralized public network for you to make your digital world exactly as it should be – yours.'
        };
      case 'BTC':
        return {
          marketCap: '$850.5B',
          volume24h: '$12.8B',
          supply: '19.7M BTC',
          rank: '#1',
          ath: '$69,045',
          atl: '$67.81',
          website: 'bitcoin.org',
          description: 'Bitcoin is a decentralized cryptocurrency originally described in a 2008 whitepaper by Satoshi Nakamoto.'
        };
      case 'ETH':
        return {
          marketCap: '$335.2B',
          volume24h: '$8.9B',
          supply: '120.4M ETH',
          rank: '#2',
          ath: '$4,878.26',
          atl: '$0.432979',
          website: 'ethereum.org',
          description: 'Ethereum is a decentralized platform that runs smart contracts and enables developers to build decentralized applications.'
        };
      default:
        return null;
    }
  };

  const marketData = getMarketData();
  const priceHistory = [
    { time: '1h', change: '+0.5%', type: 'positive' },
    { time: '24h', change: crypto.change, type: crypto.changeType },
    { time: '7d', change: '+8.2%', type: 'positive' },
    { time: '30d', change: '-2.1%', type: 'negative' },
    { time: '1y', change: '+145.7%', type: 'positive' }
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center">
              <span className="text-lg font-bold text-primary-foreground">
                {crypto.symbol === 'HBAR' ? 'ℏ' : crypto.symbol === 'BTC' ? '₿' : 'Ξ'}
              </span>
            </div>
            <div>
              <span className="text-xl">{crypto.name} ({crypto.symbol})</span>
              <div className="flex items-center space-x-2 mt-1">
                <span className="text-2xl font-bold text-foreground">
                  ${crypto.price.toFixed(crypto.symbol === 'HBAR' ? 4 : 0)}
                </span>
                <Badge 
                  variant={crypto.changeType === 'positive' ? 'default' : 'destructive'}
                  className="flex items-center space-x-1"
                >
                  {crypto.changeType === 'positive' ? (
                    <TrendingUp className="w-3 h-3" />
                  ) : (
                    <TrendingDown className="w-3 h-3" />
                  )}
                  <span>{crypto.change}</span>
                </Badge>
              </div>
            </div>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Price Performance */}
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-4">Price Performance</h3>
            <div className="grid grid-cols-5 gap-3">
              {priceHistory.map((period) => (
                <Card key={period.time} className="border-border/50">
                  <CardContent className="p-3 text-center">
                    <p className="text-sm text-muted-foreground mb-1">{period.time}</p>
                    <p className={`font-semibold ${
                      period.type === 'positive' ? 'text-success' : 'text-destructive'
                    }`}>
                      {period.change}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Market Data */}
          {marketData && (
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4">Market Data</h3>
              <div className="grid grid-cols-2 gap-4">
                <Card className="border-border/50">
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <BarChart3 className="w-4 h-4 text-primary" />
                      <span className="text-sm font-medium">Market Cap</span>
                    </div>
                    <p className="text-xl font-bold text-foreground">{marketData.marketCap}</p>
                    <p className="text-xs text-muted-foreground">Rank #{marketData.rank}</p>
                  </CardContent>
                </Card>
                
                <Card className="border-border/50">
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <Activity className="w-4 h-4 text-success" />
                      <span className="text-sm font-medium">24h Volume</span>
                    </div>
                    <p className="text-xl font-bold text-foreground">{marketData.volume24h}</p>
                    <p className="text-xs text-muted-foreground">Trading volume</p>
                  </CardContent>
                </Card>

                <Card className="border-border/50">
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <DollarSign className="w-4 h-4 text-warning" />
                      <span className="text-sm font-medium">All-Time High</span>
                    </div>
                    <p className="text-xl font-bold text-foreground">{marketData.ath}</p>
                    <p className="text-xs text-muted-foreground">Historical peak</p>
                  </CardContent>
                </Card>

                <Card className="border-border/50">
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <Clock className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm font-medium">Circulating Supply</span>
                    </div>
                    <p className="text-xl font-bold text-foreground">{marketData.supply}</p>
                    <p className="text-xs text-muted-foreground">Available tokens</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {/* About */}
          {marketData && (
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4">About {crypto.name}</h3>
              <Card className="border-border/50">
                <CardContent className="p-4">
                  <p className="text-muted-foreground mb-4">{marketData.description}</p>
                  <div className="flex items-center space-x-2">
                    <Globe className="w-4 h-4 text-primary" />
                    <a 
                      href={`https://${marketData.website}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      {marketData.website}
                    </a>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Quick Actions */}
          <div className="flex space-x-3">
            <HeroButton variant="hero" className="flex-1">
              <DollarSign className="w-4 h-4 mr-2" />
              Buy {crypto.symbol}
            </HeroButton>
            <HeroButton variant="outline" className="flex-1">
              <TrendingUp className="w-4 h-4 mr-2" />
              Add to Portfolio
            </HeroButton>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};