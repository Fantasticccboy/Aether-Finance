export interface Transaction {
  id: string;
  title: string;
  amount: number; // Negative for expense, Positive for income
  date: Date;
  category: string;
  type: 'expense' | 'income';
}

export interface FinancialStatus {
  safeToSpend: number;
  message: string;
  mood: 'calm' | 'alert' | 'optimistic';
}

export interface ChartDataPoint {
  day: string;
  actual?: number;
  predicted?: number;
}

export interface AnalyticsData {
  category: string;
  amount: number;
  color: string;
}

export type ViewState = 'dashboard' | 'calendar' | 'analytics' | 'add';