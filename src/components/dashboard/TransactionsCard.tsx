import React from 'react';
import './TransactionsCard.css';
import '../../fontAwesome'; // Initialize the Font Awesome library
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Transaction, TransactionType } from '../../api-client';
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

  const getTransactionColor = (type: TransactionType | undefined) => {
    switch (type) {
      case TransactionType.NUMBER_0: // Expense
        return 'var(--color-error)';
      case TransactionType.NUMBER_1: // Income
        return 'var(--color-success)';
      case TransactionType.NUMBER_2: // Transfer
        return '#1E90FF';
      case TransactionType.NUMBER_3: // MonthlyExpense
        return '#FFD700';
      case TransactionType.NUMBER_4: // MonthlyIncome
        return '#006400';
      default:
        return 'inherit';
    }
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
              <th>NOMBRE</th>
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
                      <div className="transactions-card__name">
                        {transaction.categoryName}
                        {transaction.subcategory ? `/${transaction.subcategory}` : ''}
                      </div>
                      <div className="transactions-card__date">{transaction.date ? transaction.date.toLocaleDateString() : ''}</div>
                    </div>
                  </div>
                </td>
                <td>
                  <div className="transactions-card__amount" style={{ color: getTransactionColor(transaction.transactionType) }}>
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
