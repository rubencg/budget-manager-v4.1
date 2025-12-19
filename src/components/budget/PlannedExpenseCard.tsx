import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRedoAlt, faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import { PlannedExpenseViewDto } from '../../api-client';

interface PlannedExpenseCardProps {
    expense: PlannedExpenseViewDto;
    onAction: (action: 'create-expense' | 'modify' | 'delete' | 'release-remaining' | 'filter', expense: PlannedExpenseViewDto) => void;
    isActiveMenu: boolean;
    onToggleMenu: (e: React.MouseEvent) => void;
}

export const PlannedExpenseCard: React.FC<PlannedExpenseCardProps> = ({
    expense,
    onAction,
    isActiveMenu,
    onToggleMenu
}) => {


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
        if (Math.abs(expense.amountLeft || 0) < 0.01) return 'remaining';
        if (rawPercentage >= 100) return 'overspent';
        if (rawPercentage > 90) return 'warning';
        return 'remaining';
    };

    const statusClass = getStatusColorClass();
    const isOverspent = (expense.amountLeft || 0) < -0.01;

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
                    <div className="planned-expense-card__menu-container">
                        <button
                            className={`planned-expense-card__menu-btn ${isActiveMenu ? 'active' : ''}`}
                            onClick={onToggleMenu}
                        >
                            <FontAwesomeIcon icon={faEllipsisV} />
                        </button>
                        {isActiveMenu && (
                            <div className="planned-expense-card__dropdown">
                                <button className="planned-expense-card__dropdown-item" onClick={() => onAction('create-expense', expense)}>
                                    Crear gasto
                                </button>
                                <button className="planned-expense-card__dropdown-item" onClick={() => onAction('modify', expense)}>
                                    Modificar
                                </button>
                                <button className="planned-expense-card__dropdown-item" onClick={() => onAction('delete', expense)}>
                                    Eliminar
                                </button>
                                <button className="planned-expense-card__dropdown-item" onClick={() => onAction('release-remaining', expense)}>
                                    Liberar restante
                                </button>
                                <button className="planned-expense-card__dropdown-item" onClick={() => onAction('filter', expense)}>
                                    Filtrar solo estos
                                </button>
                            </div>
                        )}
                    </div>
                </div>
                <div className="planned-expense-card__category">
                    Categoria: {expense.categoryName} {expense.subCategory ? `- ${expense.subCategory}` : ''}
                </div>
            </div>

            {/* Content */}
            <div className="planned-expense-card__content">
                <div className={`planned-expense-card__amount-status ${statusClass}`}>
                    {Math.abs(expense.amountLeft || 0) < 0.01
                        ? 'Completado'
                        : isOverspent
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
