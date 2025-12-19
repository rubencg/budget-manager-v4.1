import React from 'react';
import './OverviewCard.css';
import { Card } from '../ui/Card';
import { Calendar } from '../ui/Calendar';
import { CalendarView } from '../../api-client';

interface OverviewCardProps {
  calendarView: CalendarView | undefined;
}

export const OverviewCard: React.FC<OverviewCardProps> = ({ calendarView }) => {
  // Extract month and day from yearMonth if possible, or use current date as fallback
  const now = new Date();
  const currentDay = now.getDate();
  const currentMonth = now.toLocaleString('default', { month: 'long' });

  return (
    <Card className="overview-card">
      <div className="overview-card__header">
        <h3 className="card__title">Resumen</h3>
      </div>

      <div className="overview-card__metrics">
        <div className="overview-card__metric overview-card__metric--transfer">
          <div className="overview-card__metric-value">{calendarView?.transfersCount || 0}</div>
          <div className="overview-card__metric-label">Transferencias</div>
        </div>
        <div className="overview-card__metric overview-card__metric--income">
          <div className="overview-card__metric-value">{calendarView?.incomesCount || 0}</div>
          <div className="overview-card__metric-label">Ingresos</div>
        </div>
        <div className="overview-card__metric overview-card__metric--outcome">
          <div className="overview-card__metric-value">{calendarView?.expensesCount || 0}</div>
          <div className="overview-card__metric-label">Gastos</div>
        </div>
      </div>

      <div className="overview-card__calendar">
        <Calendar month={currentMonth} currentDay={currentDay} />
      </div>
    </Card>
  );
};
