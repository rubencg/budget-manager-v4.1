import React from 'react';
import './BalanceCard.css';
import { Card } from '../ui/Card';
import { MetricDisplay } from '../ui/MetricDisplay';
import { formatCurrency } from '../../utils/currencyUtils';
import { BalanceData } from '../../types';

interface BalanceCardProps {
  balance: BalanceData;
}

export const BalanceCard: React.FC<BalanceCardProps> = ({ balance }) => {
  const formatValue = (value: number) => {
    // MetricDisplay adds a $ prefix, so we only need the formatted number part
    // but formatCurrency adds $ and commas.
    // Let's strip the $ from formatCurrency if prefix is present, or just use it as is.
    // Actually, it's better to pass the full string to MetricDisplay and empty prefix.
    return formatCurrency(value);
  };

  return (
    <Card className="balance-card">
      <div className="balance-card__header">
        <h3 className="card__title">Balance mensual</h3>
      </div>

      <MetricDisplay
        value={formatValue(balance.balance)}
        prefix=""
        size="large"
      />

      {/* TODO: Get last month's balance and compare (probably better done in BE) */}
      {/* <div className="balance-card__comparison">
        <span className={`balance-card__change ${balance.changePercent >= 0 ? 'balance-card__change--positive' : 'balance-card__change--negative'}`}>
          {balance.changePercent >= 0 ? '↑' : '↓'} {Math.abs(balance.changePercent)}%
        </span>
        <span className="balance-card__period">{balance.comparisonPeriod}</span>
      </div> */}
    </Card>
  );
};
