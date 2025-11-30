import React from 'react';
import './OverviewCard.css';
import { Card } from '../ui/Card';
import { Calendar } from '../ui/Calendar';
import { OverviewMetrics } from '../../types';

interface OverviewCardProps {
  metrics: OverviewMetrics;
}

export const OverviewCard: React.FC<OverviewCardProps> = ({ metrics }) => {
  return (
    <Card className="overview-card">
      <div className="overview-card__header">
        <h3 className="card__title">Resumen</h3>
      </div>

      <div className="overview-card__metrics">
        <div className="overview-card__metric">
          <div className="overview-card__metric-value">{metrics.totalTransactions}</div>
          <div className="overview-card__metric-label">Transacciones</div>
        </div>
        <div className="overview-card__metric overview-card__metric--income">
          <div className="overview-card__metric-value">{metrics.incomeCount}</div>
          <div className="overview-card__metric-label">Ingresos</div>
        </div>
        <div className="overview-card__metric overview-card__metric--outcome">
          <div className="overview-card__metric-value">{metrics.outcomeCount}</div>
          <div className="overview-card__metric-label">Gastos</div>
        </div>
      </div>

      <div className="overview-card__calendar">
        <Calendar month={metrics.currentMonth} currentDay={metrics.currentDay} />
      </div>
    </Card>
  );
};
