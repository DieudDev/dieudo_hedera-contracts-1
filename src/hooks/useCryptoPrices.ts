import { useQuery } from '@tanstack/react-query';

interface CryptoPrices {
  hbar: number;
  bitcoin: number;
  ethereum: number;
  usd: number;
  eur: number;
}

interface CryptoResponse {
  [key: string]: {
    usd: number;
    eur: number;
  };
}

const fetchCryptoPrices = async (): Promise<CryptoPrices> => {
  try {
    const response = await fetch(
      'https://api.coingecko.com/api/v3/simple/price?ids=hedera-hashgraph,bitcoin,ethereum&vs_currencies=usd,eur'
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch prices');
    }

    const data: CryptoResponse = await response.json();
    
    return {
      hbar: data['hedera-hashgraph']?.usd || 0.05,
      bitcoin: data['bitcoin']?.usd || 45000,
      ethereum: data['ethereum']?.usd || 2800,
      usd: 1,
      eur: data['bitcoin']?.eur ? data['bitcoin'].eur / data['bitcoin'].usd : 0.85,
    };
  } catch (error) {
    // Fallback mock data for development/demo
    return {
      hbar: 0.0521 + (Math.random() - 0.5) * 0.001,
      bitcoin: 43250 + (Math.random() - 0.5) * 500,
      ethereum: 2785 + (Math.random() - 0.5) * 50,
      usd: 1,
      eur: 0.85,
    };
  }
};

export const useCryptoPrices = () => {
  return useQuery({
    queryKey: ['cryptoPrices'],
    queryFn: fetchCryptoPrices,
    refetchInterval: 30000, // Refetch every 30 seconds
    retry: 3,
    retryDelay: 1000,
  });
};

export const formatCurrency = (amount: number, currency: string, prices: CryptoPrices) => {
  const convertedAmount = amount * prices[currency.toLowerCase() as keyof CryptoPrices];
  
  switch (currency.toLowerCase()) {
    case 'hbar':
      return `${convertedAmount.toFixed(4)} HBAR`;
    case 'bitcoin':
    case 'btc':
      return `₿${convertedAmount.toFixed(8)}`;
    case 'ethereum':
    case 'eth':
      return `Ξ${convertedAmount.toFixed(6)}`;
    case 'eur':
      return `€${convertedAmount.toFixed(2)}`;
    case 'usd':
    default:
      return `$${convertedAmount.toFixed(2)}`;
  }
};