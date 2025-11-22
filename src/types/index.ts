// Transaction types
export type TransactionType = 'expense' | 'income' | 'transfer';
export type PaymentMethod = 'credit_card' | 'bank_transfer' | 'cash' | 'debit_card';

export interface Transaction {
  id: string;
  type: TransactionType;
  name: string;
  company?: string;
  date: string;
  amount: number;
  currency: string;
  paymentMethod: PaymentMethod;
  cardLast4?: string;
  icon?: string;
}

// Goal types
export interface Goal {
  id: string;
  name: string;
  icon: string;
  targetAmount: number;
  currentAmount: number;
  amountPerMonth: number;
  wasAppliedThisMonth: boolean;
  gradient: string;
}

// Overview metrics
export interface OverviewMetrics {
  totalTransactions: number;
  incomeCount: number;
  outcomeCount: number;
  currentMonth: string;
  currentDay: number;
}

// Balance data
export interface BalanceData {
  balance: number;
  changePercent: number;
  comparisonPeriod: string;
  financeHealthScore?: number;
}

// Navigation item
export interface NavItem {
  id: string;
  label: string;
  icon: string;
  path: string;
  active?: boolean;
}

// User profile
export interface UserProfile {
  name: string;
  avatar: string;
  greeting: string;
}

// Card variant types
export type CardVariant = 'default' | 'interactive' | 'elevated';

// Button variant types
export type ButtonVariant = 'primary' | 'secondary' | 'icon';

// Status badge variant
export type StatusBadgeVariant = 'waiting' | 'success' | 'due_date' | 'disabled';
