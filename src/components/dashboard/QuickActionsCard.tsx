import React from 'react';
import './QuickActionsCard.css';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';

export const QuickActionsCard: React.FC = () => {
  return (
    <Card className="quick-actions-card">
      <div className="quick-actions-card__header">
        <h3 className="card__title">Acciones Rápidas</h3>
      </div>

      <div className="quick-actions-card__buttons">
        <div className="quick-actions-card__action">
          <Button variant="primary" fullWidth>
            Enviar Dinero
          </Button>
          <kbd className="quick-actions-card__kbd">N</kbd>
        </div>
        <div className="quick-actions-card__action">
          <Button variant="secondary" fullWidth>
            Solicitar Dinero
          </Button>
          <kbd className="quick-actions-card__kbd">R</kbd>
        </div>
      </div>

      <a href="#" className="quick-actions-card__manage">
        Gestionar →
      </a>
    </Card>
  );
};
