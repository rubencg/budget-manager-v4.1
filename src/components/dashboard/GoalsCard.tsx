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
        <h3 className="card__title">My Goals</h3>
        <a href="#" className="goals-card__view-all">View All</a>
      </div>

      <div className="goals-card__list">
        {goals.map((goal) => {
          const percentage = (goal.currentAmount / goal.targetAmount) * 100;
          return (
            <div key={goal.id} className="goals-card__goal">
              <div className="goals-card__goal-header">
                <div className="goals-card__goal-info">
                  <span className="goals-card__goal-icon">{goal.icon}</span>
                  <span className="goals-card__goal-name">{goal.name}</span>
                </div>
                <span className="goals-card__goal-target">
                  {formatCurrency(goal.targetAmount)}
                </span>
              </div>

              <ProgressBar percentage={percentage} gradient={goal.gradient} />

              <div className="goals-card__goal-footer">
                <span className="goals-card__goal-current">
                  {formatCurrency(goal.currentAmount)}
                </span>
                {goal.achievementDate && (
                  <span className="goals-card__goal-date">
                    🕐 {goal.achievementDate}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
};
