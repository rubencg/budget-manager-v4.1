import React from 'react';
import './Dashboard.css';
import { OverviewCard } from './OverviewCard';
import { BalanceCard } from './BalanceCard';
import { QuickActionsCard } from './QuickActionsCard';
import { GoalsCard } from './GoalsCard';
import { TransactionsCard } from './TransactionsCard';
import { PremiumCard } from './PremiumCard';
import {
  mockOverview,
  mockBalance,
  mockGoals,
  mockTransactions
} from '../../data/mockData';

export const Dashboard: React.FC = () => {
  return (
    <div className="dashboard">
      <div className="dashboard__grid">
        <div className="dashboard__item dashboard__item--overview">
          <OverviewCard metrics={mockOverview} />
        </div>

        <div className="dashboard__item dashboard__item--balance">
          <BalanceCard balance={mockBalance} />
        </div>

        <div className="dashboard__item dashboard__item--quick-actions">
          <QuickActionsCard />
        </div>

        <div className="dashboard__item dashboard__item--goals">
          <GoalsCard goals={mockGoals} />
        </div>

        <div className="dashboard__item dashboard__item--transactions">
          <TransactionsCard transactions={mockTransactions} />
        </div>

        <div className="dashboard__item dashboard__item--premium">
          <PremiumCard />
        </div>
      </div>
    </div>
  );
};
