import { useState, useEffect } from 'react';

export interface Transaction {
  id: string;
  type: 'sent' | 'received' | 'loan' | 'payment';
  amount: number;
  currency: string;
  from?: string;
  to?: string;
  status: 'pending' | 'completed' | 'failed';
  timestamp: Date;
  hash?: string;
  memo?: string;
}

const generateRandomTransaction = (): Transaction => {
  const types = ['sent', 'received', 'loan', 'payment'] as const;
  const currencies = ['USD', 'HBAR', 'BTC', 'ETH', 'EUR'];
  const addresses = [
    '0.0.123456',
    '0.0.789012', 
    '0.0.345678',
    '0.0.901234',
    '0.0.567890'
  ];
  
  const type = types[Math.floor(Math.random() * types.length)];
  const currency = currencies[Math.floor(Math.random() * currencies.length)];
  const amount = Math.random() * 10000 + 100;
  
  return {
    id: `tx_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    type,
    amount: parseFloat(amount.toFixed(2)),
    currency,
    from: type === 'received' ? addresses[Math.floor(Math.random() * addresses.length)] : '0.0.456789',
    to: type === 'sent' ? addresses[Math.floor(Math.random() * addresses.length)] : '0.0.456789',
    status: Math.random() > 0.1 ? 'completed' : 'pending',
    timestamp: new Date(),
    hash: `0x${Math.random().toString(16).substr(2, 64)}`,
    memo: type === 'loan' ? 'Monthly loan payment' : type === 'payment' ? 'Business payment' : 'Transfer',
  };
};

export const useRealtimeTransactions = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([
    // Initial mock transactions
    {
      id: 'tx_1',
      type: 'received',
      amount: 2500.00,
      currency: 'USD',
      from: '0.0.123456',
      status: 'completed',
      timestamp: new Date(Date.now() - 1000 * 60 * 30),
      hash: '0xabc123...',
      memo: 'Salary payment'
    },
    {
      id: 'tx_2',
      type: 'sent',
      amount: 150.25,
      currency: 'HBAR',
      to: '0.0.789012',
      status: 'completed',
      timestamp: new Date(Date.now() - 1000 * 60 * 45),
      hash: '0xdef456...',
      memo: 'Utility payment'
    }
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.7) { // 30% chance every interval
        const newTransaction = generateRandomTransaction();
        setTransactions(prev => [newTransaction, ...prev.slice(0, 19)]); // Keep latest 20
      }
    }, 15000); // Check every 15 seconds

    return () => clearInterval(interval);
  }, []);

  const addTransaction = (transaction: Omit<Transaction, 'id' | 'timestamp' | 'hash'>) => {
    const newTransaction: Transaction = {
      ...transaction,
      id: `tx_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      timestamp: new Date(),
      hash: `0x${Math.random().toString(16).substr(2, 64)}`,
    };
    
    setTransactions(prev => [newTransaction, ...prev]);
    return newTransaction;
  };

  return { transactions, addTransaction };
};