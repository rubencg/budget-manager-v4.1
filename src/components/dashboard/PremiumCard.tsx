import React from 'react';
import './PremiumCard.css';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';

export const PremiumCard: React.FC = () => {
  return (
    <Card className="premium-card">
      <div className="premium-card__icon">⭐</div>
      <h3 className="premium-card__title">More with Premium</h3>
      <p className="premium-card__description">
        Unlock advanced features, unlimited transactions, and priority support
      </p>
      <div className="premium-card__pricing">
        <span className="premium-card__price">$19.99</span>
        <span className="premium-card__period">/Month</span>
      </div>
      <Button variant="primary" fullWidth>
        Learn More
      </Button>
    </Card>
  );
};
