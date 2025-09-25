import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface CurrencySelectorProps {
  value: string;
  onValueChange: (value: string) => void;
}

export const CurrencySelector = ({ value, onValueChange }: CurrencySelectorProps) => {
  const currencies = [
    { code: 'USD', symbol: '$', name: 'US Dollar' },
    { code: 'EUR', symbol: '€', name: 'Euro' },
    { code: 'HBAR', symbol: 'ℏ', name: 'Hedera' },
    { code: 'BTC', symbol: '₿', name: 'Bitcoin' },
    { code: 'ETH', symbol: 'Ξ', name: 'Ethereum' },
  ];

  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger className="w-32">
        <SelectValue placeholder="Currency" />
      </SelectTrigger>
      <SelectContent>
        {currencies.map((currency) => (
          <SelectItem key={currency.code} value={currency.code}>
            <span className="flex items-center">
              <span className="mr-2">{currency.symbol}</span>
              {currency.code}
            </span>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};