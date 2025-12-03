import React from 'react';
import './Dashboard.css';
import { OverviewCard } from './OverviewCard';
import { BalanceCard } from './BalanceCard';
import { GoalsCard } from './GoalsCard';
import { TransactionsCard } from './TransactionsCard';
import {
  mockOverview,
  mockBalance,
  mockGoals,
} from '../../data/mockData';
import { Transaction as ApiTransaction } from '../../api-client';
import { Transaction } from '../../types';
import { useDashboardQuery } from '../../hooks/useDashboardQuery';

const mapApiTransactionToTransaction = (apiTransaction: ApiTransaction): Transaction => {
  return {
    id: apiTransaction.id || '',
    type: 'expense', // Mocking as API does not provide this
    name: apiTransaction.categoryName || 'Unknown',
    date: apiTransaction.date ? new Date(apiTransaction.date).toLocaleDateString() : 'Unknown date',
    amount: apiTransaction.amount || 0,
    currency: 'USD', // Mocking as API does not provide this
    paymentMethod: 'credit_card', // Mocking as API does not provide this
    cardLast4: '1234', // Mocking as API does not provide this
    icon: apiTransaction.categoryImage || '💸',
  };
};

export const Dashboard: React.FC = () => {
  const { data: dashboardData, isLoading, isError } = useDashboardQuery();

  const transactions = dashboardData?.recentTransactions?.map(mapApiTransactionToTransaction) || [];

  return (
    <div className="dashboard">
      <div className="dashboard__grid">

        <div className="dashboard__item dashboard__item--goals">
          <GoalsCard goals={mockGoals} />
        </div>
        <div className="dashboard__item dashboard__item--balance">
          <BalanceCard balance={{
            balance: dashboardData?.balance?.total || 0
          }} />
        </div>
        <div className="dashboard__item dashboard__item--transactions">
          {isLoading && <p>Loading transactions...</p>}
          {isError && <p>Failed to fetch dashboard data.</p>}
          {!isLoading && !isError && <TransactionsCard transactions={transactions} />}
        </div>

        <div className="dashboard__item dashboard__item--overview">
          <OverviewCard metrics={mockOverview} />
        </div>

      </div>
    </div>
  );
};
