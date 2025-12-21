import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import './GoalsCard.css';
import { Card } from '../ui/Card';
import { formatCurrency } from '../../utils/currencyUtils';
import { ProgressBar } from '../ui/ProgressBar';
import { BudgetSectionItemDto } from '../../api-client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { findIconDefinition, IconPrefix, IconName } from '@fortawesome/fontawesome-svg-core';
import { TransferModal } from '../accounts/TransferModal';
import { useAccountsQuery } from '../../hooks/useAccountsQuery';

interface GoalsCardProps {
  savings: BudgetSectionItemDto[];
}

export const GoalsCard: React.FC<GoalsCardProps> = ({ savings }) => {
  const [isTransferModalOpen, setIsTransferModalOpen] = useState(false);
  const [selectedSaving, setSelectedSaving] = useState<BudgetSectionItemDto | null>(null);
  const { data: accountsData } = useAccountsQuery();

  const flattenedAccounts = useMemo(() => {
    if (!accountsData) return [];
    return accountsData.flatMap(type => type.accounts || []);
  }, [accountsData]);

  const handleAhorrarClick = (item: BudgetSectionItemDto) => {
    setSelectedSaving(item);
    setIsTransferModalOpen(true);
  };

  const getIcon = (iconName: string | null | undefined) => {
    const prefix: IconPrefix = 'fas';
    const icon = iconName ? findIconDefinition({ prefix, iconName: iconName as any }) : null;
    return icon || ['fas', 'piggy-bank'] as [IconPrefix, IconName];
  };

  return (
    <Card className="goals-card">
      <div className="goals-card__header">
        <h3 className="card__title">Ahorros</h3>
        <Link to="/budget" className="goals-card__view-all">Ver todos</Link>
      </div>

      <div className="goals-card__list">
        {savings.map((item) => {
          const current = item.savedAmount || 0;
          const target = item.goalAmount || 1; // Avoid division by zero
          const percentage = (current / target) * 100;
          const displayColor = item.color || '#cccccc';

          return (
            <div
              key={item.id}
              className="goals-card__goal"
              style={item.isApplied ? {
                position: 'relative'
              } : undefined}
            >
              {item.isApplied && (
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  backgroundColor: displayColor,
                  opacity: 0.1,
                  borderRadius: 'inherit',
                  pointerEvents: 'none',
                  zIndex: 0
                }} />
              )}
              <div className="goals-card__goal-header" style={{ position: 'relative', zIndex: 1 }}>
                <div className="goals-card__goal-info">
                  <span className="goals-card__goal-icon" style={{ color: displayColor }}>
                    <FontAwesomeIcon icon={getIcon(item.icon)} />
                  </span>
                  <span className="goals-card__goal-name">{item.name}</span>
                </div>
                <span className="goals-card__goal-target">
                  {formatCurrency(item.goalAmount)}
                </span>
              </div>

              <div style={{ position: 'relative', zIndex: 1 }}>
                <ProgressBar percentage={percentage} gradient={displayColor} />
              </div>

              <div className="goals-card__goal-footer" style={{ position: 'relative', zIndex: 1 }}>
                <span className="goals-card__goal-current">
                  {formatCurrency(item.savedAmount)}
                </span>
                {!item.isApplied && (
                  <button
                    className="goals-card__apply-btn"
                    onClick={() => handleAhorrarClick(item)}
                  >
                    Ahorrar {formatCurrency(item.amountPerMonth)}
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <TransferModal
        isOpen={isTransferModalOpen}
        onClose={() => {
          setIsTransferModalOpen(false);
          setSelectedSaving(null);
        }}
        accounts={flattenedAccounts}
        defaultValues={{
          amount: selectedSaving?.amountPerMonth || 0,
          toAccountId: selectedSaving?.accountId || undefined,
          savingKey: selectedSaving?.id || undefined,
          notes: `Ahorro mensual para ${selectedSaving?.name}`
        }}
      />
    </Card>
  );
};
