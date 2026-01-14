import { ChartDataPoint, Transaction, AnalyticsData } from './types';

// Helper to create dates relative to today
const today = new Date();
const yesterday = new Date(today);
yesterday.setDate(yesterday.getDate() - 1);
const twoDaysAgo = new Date(today);
twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);
const threeDaysAgo = new Date(today);
threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);

export const MOCK_TRANSACTIONS: Transaction[] = [
  { id: '1', title: 'Whole Foods Market', amount: -124.50, date: today, category: 'food', type: 'expense' },
  { id: '2', title: 'Uber Premium', amount: -45.20, date: yesterday, category: 'transport', type: 'expense' },
  { id: '3', title: 'Spotify Family', amount: -16.99, date: twoDaysAgo, category: 'utilities', type: 'expense' },
  { id: '4', title: 'Dividend Payout', amount: 850.00, date: threeDaysAgo, category: 'invest', type: 'income' },
  { id: '5', title: 'Local Roastery', amount: -24.00, date: threeDaysAgo, category: 'food', type: 'expense' },
];

export const MOCK_CHART_DATA: ChartDataPoint[] = [
  { day: '1', actual: 4200, predicted: 4200 },
  { day: '5', actual: 3800, predicted: 3900 },
  { day: '10', actual: 3500, predicted: 3600 },
  { day: '15', actual: 2900, predicted: 3100 },
  { day: '20', actual: 2100, predicted: 2400 },
  { day: '25', predicted: 1800 }, // Future
  { day: '30', predicted: 1200 }, // Future
];

export const APP_NAME = "Aether";

export const CATEGORIES = [
  { id: 'food', label: 'Food & Dining', icon: 'coffee', color: '#4A5D4E' },
  { id: 'transport', label: 'Transport', icon: 'car', color: '#A3B1C6' },
  { id: 'shopping', label: 'Shopping', icon: 'shopping-bag', color: '#D4C3A3' },
  { id: 'utilities', label: 'Utilities', icon: 'zap', color: '#E5E2DD' },
  { id: 'invest', label: 'Invest', icon: 'trending-up', color: '#2C362F' },
];

export const getCategoryInfo = (id: string) => {
  return CATEGORIES.find(c => c.id === id) || CATEGORIES[0];
};