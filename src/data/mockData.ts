import { Transaction, Goal, OverviewMetrics, BalanceData, NavItem, UserProfile } from '../types';

export const mockTransactions: Transaction[] = [
  {
    id: '1',
    type: 'expense',
    name: 'Zara',
    company: 'Zara International',
    date: 'Oct 14, 2024',
    amount: 120.50,
    currency: 'USD',
    paymentMethod: 'credit_card',
    cardLast4: '4012',
    icon: '🏢'
  },
  {
    id: '2',
    type: 'income',
    name: 'John Cooper',
    date: 'Oct 12, 2024',
    amount: 850.00,
    currency: 'EUR',
    paymentMethod: 'bank_transfer',
    icon: '👤'
  },
  {
    id: '3',
    type: 'expense',
    name: 'Birthday Gift',
    date: 'Oct 10, 2024',
    amount: 45.99,
    currency: 'USD',
    paymentMethod: 'credit_card',
    cardLast4: '4012',
    icon: '🎁'
  },
  {
    id: '4',
    type: 'expense',
    name: 'Netflix Subscription',
    company: 'Netflix Inc',
    date: 'Oct 08, 2024',
    amount: 15.99,
    currency: 'USD',
    paymentMethod: 'credit_card',
    cardLast4: '4012',
    icon: '🏢'
  },
  {
    id: '5',
    type: 'transfer',
    name: 'Transfer to Savings',
    date: 'Oct 05, 2024',
    amount: 500.00,
    currency: 'USD',
    paymentMethod: 'bank_transfer',
    icon: '💰'
  }
];

export const mockGoals: Goal[] = [
  {
    id: '1',
    name: 'Renta',
    icon: '🏡',
    targetAmount: 234000.00,
    currentAmount: 97500.00,
    amountPerMonth: 19500.00,
    wasAppliedThisMonth: true,
    gradient: 'linear-gradient(135deg, #FF8C00 0%, #FFD700 100%)'
  },
  {
    id: '2',
    name: 'Aguacates',
    icon: '🥑',
    targetAmount: 540000.00,
    currentAmount: 135000.00,
    amountPerMonth: 45000.00,
    wasAppliedThisMonth: false,
    gradient: 'linear-gradient(135deg, #33771eff 0%, #b6ffc2ff 100%)'
  },
  {
    id: '3',
    name: 'Carro',
    icon: '🚗',
    targetAmount: 200000.00,
    currentAmount: 20000.00,
    amountPerMonth: 10000.00,
    wasAppliedThisMonth: false,
    gradient: 'linear-gradient(135deg, #ff1414ff 0%, #ffb6b6ff 100%)'
  }
];

export const mockOverview: OverviewMetrics = {
  totalTransactions: 40,
  incomeCount: 24,
  outcomeCount: 16,
  currentMonth: 'June 2024',
  currentDay: 10
};

export const mockBalance: BalanceData = {
  balance: 20088.38,
  changePercent: 24.17,
  comparisonPeriod: 'vs mes anterior',
  financeHealthScore: 85
};

export const mockNavigation: NavItem[] = [
  { id: '1', label: 'Dashboard', icon: '📊', path: '/', active: true },
  { id: '2', label: 'Transactions', icon: '💳', path: '/transactions', active: false },
  { id: '3', label: 'My Goals', icon: '🎯', path: '/goals', active: false },
  { id: '4', label: 'Investment', icon: '📈', path: '/investment', active: false },
  { id: '5', label: 'Bills and Payment', icon: '🧾', path: '/bills', active: false },
  { id: '6', label: 'Analytics and Reports', icon: '📉', path: '/analytics', active: false }
];

export const mockSupportNav: NavItem[] = [
  { id: 's1', label: 'Helps', icon: '❓', path: '/help', active: false },
  { id: 's2', label: 'Integration', icon: '🔗', path: '/integration', active: false },
  { id: 's3', label: 'Settings', icon: '⚙️', path: '/settings', active: false }
];

export const mockUserProfile: UserProfile = {
  name: 'Syarah Adela',
  avatar: 'https://i.pravatar.cc/150?img=47',
  greeting: 'Hello, Welcome back!'
};
