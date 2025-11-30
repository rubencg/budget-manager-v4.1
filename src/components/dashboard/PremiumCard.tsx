import React from 'react';
import './PremiumCard.css';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';

export const PremiumCard: React.FC = () => {
  return (
    <Card className="premium-card">
      <div className="premium-card__icon">⭐</div>
      <h3 className="premium-card__title">Más con Premium</h3>
      <p className="premium-card__description">
        Desbloquea funciones avanzadas, transacciones ilimitadas y soporte prioritario
      </p>
      <div className="premium-card__pricing">
        <span className="premium-card__price">$19.99</span>
        <span className="premium-card__period">/Mes</span>
      </div>
      <Button variant="primary" fullWidth>
        Saber más
      </Button>
    </Card>
  );
};
