import React from 'react';
import './TransactionsCard.css';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Transaction } from '../../types';

interface TransactionsCardProps {
  transactions: Transaction[];
}

export const TransactionsCard: React.FC<TransactionsCardProps> = ({ transactions }) => {
  const formatAmount = (amount: number, currency: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency === 'EUR' ? 'EUR' : 'USD',
      minimumFractionDigits: 2
    }).format(amount);
  };

  const getPaymentMethodDisplay = (method: string, cardLast4?: string) => {
    if (method === 'credit_card' && cardLast4) {
      return `Credit Card ****${cardLast4}`;
    }
    if (method === 'bank_transfer') {
      return 'Bank Transfer ****';
    }
    return method.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  return (
    <Card className="transactions-card">
      <div className="transactions-card__header">
        <h3 className="card__title">Recent Transactions</h3>
        <Button variant="icon">⚙️</Button>
      </div>

      <div className="transactions-card__table-wrapper">
        <table className="transactions-card__table">
          <thead>
            <tr>
              <th>TYPE</th>
              <th>AMOUNT</th>
              <th>METHOD</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <tr key={transaction.id} className="transactions-card__row">
                <td>
                  <div className="transactions-card__type">
                    <span className="transactions-card__icon">{transaction.icon}</span>
                    <div className="transactions-card__info">
                      <div className="transactions-card__name">{transaction.name}</div>
                      <div className="transactions-card__date">{transaction.date}</div>
                    </div>
                  </div>
                </td>
                <td>
                  <div className="transactions-card__amount">
                    {formatAmount(transaction.amount, transaction.currency)}
                  </div>
                </td>
                <td>
                  <div className="transactions-card__method">
                    {getPaymentMethodDisplay(transaction.paymentMethod, transaction.cardLast4)}
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
