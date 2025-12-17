import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRedoAlt, faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import { PlannedExpenseViewDto } from '../../api-client';

interface PlannedExpenseCardProps {
    expense: PlannedExpenseViewDto;
}

export const PlannedExpenseCard: React.FC<PlannedExpenseCardProps> = ({ expense }) => {


    const formatCurrency = (amount: number | undefined) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2
        }).format(amount || 0);
    };

    // Calculate percentage for width, capped at 100 for width but keep logic for status
    const percentage = Math.min(Math.max(expense.percentageSpent || 0, 0), 100);
    const rawPercentage = expense.percentageSpent || 0;

    const getStatusColorClass = () => {
        if (rawPercentage >= 100) return 'overspent';
        if (rawPercentage > 90) return 'warning';
        return 'remaining';
    };

    const statusClass = getStatusColorClass();
    const isOverspent = rawPercentage >= 100;

    return (
        <div className="planned-expense-card">
            {/* Header */}
            <div className="planned-expense-card__header">
                <div className="planned-expense-card__title-row">
                    <h3 className="planned-expense-card__title">
                        {expense.name}
                        {expense.isRecurring && (
                            <FontAwesomeIcon icon={faRedoAlt} className="planned-expense-card__recurring-icon" />
                        )}
                    </h3>
                    <button className="planned-expense-card__menu-btn">
                        <FontAwesomeIcon icon={faEllipsisV} />
                    </button>
                </div>
                <div className="planned-expense-card__category">
                    Categoria: {expense.categoryName} {expense.subCategory ? `- ${expense.subCategory}` : ''}
                </div>
            </div>

            {/* Content */}
            <div className="planned-expense-card__content">
                <div className={`planned-expense-card__amount-status ${statusClass}`}>
                    {isOverspent
                        ? `${formatCurrency(Math.abs(expense.amountLeft || 0))} sobrepasado`
                        : `${formatCurrency(expense.amountLeft)} restante`
                    }
                </div>

                {/* Progress BarContainer */}
                <div className="planned-expense-card__progress-container">
                    <div className="planned-expense-card__progress-bar">
                        <div
                            className="planned-expense-card__progress-fill"
                            style={{
                                width: `${percentage}%`,
                                background: 'var(--gradient-orange)'
                            }}
                        />
                    </div>
                </div>

                {/* Footer stats */}
                <div className="planned-expense-card__footer">
                    <span>{formatCurrency(expense.amountSpent)} gastado</span>
                    <span>de {formatCurrency(expense.totalAmount)}</span>
                </div>
            </div>
        </div>
    );
};
