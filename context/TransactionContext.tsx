import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Transaction } from '../types';
import { MOCK_TRANSACTIONS } from '../constants';

interface TransactionContextType {
  transactions: Transaction[];
  addTransaction: (transaction: Omit<Transaction, 'id'>) => void;
  balance: number;
  recentSpending: number;
}

const TransactionContext = createContext<TransactionContextType | undefined>(undefined);

interface TransactionProviderProps {
  children: ReactNode;
}

export const TransactionProvider: React.FC<TransactionProviderProps> = ({ children }) => {
  const [transactions, setTransactions] = useState<Transaction[]>(MOCK_TRANSACTIONS);
  const [balance, setBalance] = useState(12450); // Initial mock balance

  useEffect(() => {
    // Recalculate balance whenever transactions change
    const totalImpact = transactions.reduce((acc, t) => acc + t.amount, 0);
    // Base balance + impact (Assuming 12450 was the state including mocks, we adjust logic slightly)
    // For this demo, let's treat 12450 as the starting capital before these transactions
    setBalance(12450 + totalImpact); 
  }, [transactions]);

  const addTransaction = (t: Omit<Transaction, 'id'>) => {
    const newTransaction = { 
      ...t, 
      id: Math.random().toString(36).substr(2, 9) 
    };
    setTransactions(prev => [newTransaction, ...prev]);
  };

  const recentSpending = transactions
    .filter(t => {
      const isExpense = t.type === 'expense';
      const isRecent = new Date().getTime() - new Date(t.date).getTime() < 7 * 24 * 60 * 60 * 1000;
      return isExpense && isRecent;
    })
    .reduce((acc, t) => acc + Math.abs(t.amount), 0);

  return (
    <TransactionContext.Provider value={{ transactions, addTransaction, balance, recentSpending }}>
      {children}
    </TransactionContext.Provider>
  );
};

export const useTransactions = () => {
  const context = useContext(TransactionContext);
  if (!context) throw new Error('useTransactions must be used within a TransactionProvider');
  return context;
};