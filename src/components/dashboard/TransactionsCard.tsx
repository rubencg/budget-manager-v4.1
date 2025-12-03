import React from 'react';
import './TransactionsCard.css';
import '../../fontAwesome'; // Initialize the Font Awesome library
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Transaction } from '../../api-client';
import { FontAwesomeIcon, FontAwesomeIconProps } from '@fortawesome/react-fontawesome';
import { IconProp, findIconDefinition, IconPrefix } from '@fortawesome/fontawesome-svg-core';

interface TransactionsCardProps {
  transactions: Transaction[];
}

export const TransactionsCard: React.FC<TransactionsCardProps> = ({ transactions }) => {
  const formatAmount = (amount: number | undefined) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(amount || 0);
  };

  const getPaymentMethodDisplay = (method: string, cardLast4?: string) => {
    if (method === 'credit_card' && cardLast4) {
      return `Tarjeta de Crédito ****${cardLast4}`;
    }
    if (method === 'bank_transfer') {
      return 'Transferencia Bancaria ****';
    }
    return method.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  const getIcon = (iconName: string | null | undefined): FontAwesomeIconProps['icon'] => {
    const prefix: IconPrefix = 'fas'; // Assuming all are solid icons for now
    const icon = iconName ? findIconDefinition({ prefix, iconName: iconName as any }) : null;
    // Return the found icon, or a fallback 'question-circle' icon
    return icon || ['fas', 'question-circle'];
  };

  return (
    <Card className="transactions-card">
      <div className="transactions-card__header">
        <h3 className="card__title">Transacciones Recientes</h3>
        <Button variant="icon">⚙️</Button>
      </div>

      <div className="transactions-card__table-wrapper">
        <table className="transactions-card__table">
          <thead>
            <tr>
              <th>TIPO</th>
              <th>CANTIDAD</th>
              <th>MÉTODO</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <tr key={transaction.id} className="transactions-card__row">
                <td>
                  <div className="transactions-card__type">
                    <span className="transactions-card__icon" style={{ backgroundColor: transaction.categoryColor || '#cccccc' }}>
                      <FontAwesomeIcon icon={getIcon(transaction.categoryImage)} />
                    </span>
                    <div className="transactions-card__info">
                      <div className="transactions-card__name">{transaction.categoryName}/{transaction.subcategory}</div>
                      <div className="transactions-card__date">{transaction.date ? transaction.date.toLocaleDateString() : ''}</div>
                    </div>
                  </div>
                </td>
                <td>
                  <div className="transactions-card__amount">
                    {formatAmount(transaction.amount)}
                  </div>
                </td>
                <td>
                  <div className="transactions-card__method">
                    {transaction.accountName}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
};
