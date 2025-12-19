import React from 'react';
import './Dashboard.css';
import { OverviewCard } from './OverviewCard';
import { BalanceCard } from './BalanceCard';
import { GoalsCard } from './GoalsCard';
import { TransactionsCard } from './TransactionsCard';
import {
  mockOverview,
  mockGoals,
} from '../../data/mockData';
import { useDashboardQuery } from '../../hooks/useDashboardQuery';

export const Dashboard: React.FC = () => {
  const { data: dashboardData, isLoading, isError } = useDashboardQuery();

  const transactions = dashboardData?.recentTransactions || [];

  return (
    <div className="dashboard">
      <div className="dashboard__grid">

        <div className="dashboard__item dashboard__item--transactions">
          {isLoading && <p>Loading transactions...</p>}
          {isError && <p>Failed to fetch dashboard data.</p>}
          {!isLoading && !isError && <TransactionsCard transactions={transactions} />}
        </div>
        <div className="dashboard__item dashboard__item--balance">
          <BalanceCard balance={{
            balance: dashboardData?.balance?.total || 0
          }} />
        </div>

        <div className="dashboard__item dashboard__item--goals">
          <GoalsCard savings={dashboardData?.savings || []} />
        </div>

        <div className="dashboard__item dashboard__item--overview">
          <OverviewCard calendarView={dashboardData?.calendarView} />
        </div>

      </div>
    </div>
  );
};
