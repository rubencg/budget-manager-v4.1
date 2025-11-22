import React from 'react';
import './BalanceCard.css';
import { Card } from '../ui/Card';
import { MetricDisplay } from '../ui/MetricDisplay';
import { BalanceData } from '../../types';

interface BalanceCardProps {
  balance: BalanceData;
}

export const BalanceCard: React.FC<BalanceCardProps> = ({ balance }) => {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value);
  };

  return (
    <Card className="balance-card">
      <div className="balance-card__header">
        <h3 className="card__title">Your Balance</h3>
        <select className="balance-card__currency-select">
          <option>{balance.currency}</option>
        </select>
      </div>

      <MetricDisplay
        value={formatCurrency(balance.balance)}
        prefix="$"
        size="large"
      />

      <div className="balance-card__comparison">
        <span className={`balance-card__change ${balance.changePercent >= 0 ? 'balance-card__change--positive' : 'balance-card__change--negative'}`}>
          {balance.changePercent >= 0 ? '↑' : '↓'} {Math.abs(balance.changePercent)}%
        </span>
        <span className="balance-card__period">{balance.comparisonPeriod}</span>
      </div>

      <div className="balance-card__health">
        <div className="balance-card__health-header">
          <span className="balance-card__health-title">Finance Health</span>
          <div className="balance-card__health-globe">🌍</div>
        </div>
        <div className="balance-card__health-progress">
          <div className="balance-card__health-bar">
            <div
              className="balance-card__health-fill"
              style={{ width: `${balance.financeHealthScore}%` }}
            />
          </div>
          <span className="balance-card__health-score">{balance.financeHealthScore}%</span>
        </div>
      </div>
    </Card>
  );
};
