import React from 'react';
import './GoalsCard.css';
import { Card } from '../ui/Card';
import { ProgressBar } from '../ui/ProgressBar';
import { Goal } from '../../types';

interface GoalsCardProps {
  goals: Goal[];
}

export const GoalsCard: React.FC<GoalsCardProps> = ({ goals }) => {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(value);
  };

  return (
    <Card className="goals-card">
      <div className="goals-card__header">
        <h3 className="card__title">Ahorros</h3>
        <a href="#" className="goals-card__view-all">Ver todos</a>
      </div>

      <div className="goals-card__list">
        {goals.map((goal) => {
          const percentage = (goal.currentAmount / goal.targetAmount) * 100;
          return (
            <div
              key={goal.id}
              className="goals-card__goal"
              style={goal.wasAppliedThisMonth ? {
                position: 'relative'
              } : undefined}
            >
              {goal.wasAppliedThisMonth && (
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'var(--gradient-green)',
                  opacity: 0.2,
                  borderRadius: 'inherit',
                  pointerEvents: 'none',
                  zIndex: 0
                }} />
              )}
              <div className="goals-card__goal-header" style={{ position: 'relative', zIndex: 1 }}>
                <div className="goals-card__goal-info">
                  <span className="goals-card__goal-icon">{goal.icon}</span>
                  <span className="goals-card__goal-name">{goal.name}</span>
                </div>
                <span className="goals-card__goal-target">
                  {formatCurrency(goal.targetAmount)}
                </span>
              </div>

              <div style={{ position: 'relative', zIndex: 1 }}>
                <ProgressBar percentage={percentage} gradient={goal.gradient} />
              </div>

              <div className="goals-card__goal-footer" style={{ position: 'relative', zIndex: 1 }}>
                <span className="goals-card__goal-current">
                  {formatCurrency(goal.currentAmount)}
                </span>
                {!goal.wasAppliedThisMonth && (
                  <button className="goals-card__apply-btn">
                    Ahorrar {formatCurrency(goal.amountPerMonth)}
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
};
