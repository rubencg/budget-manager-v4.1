import React, { useState, useMemo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faChevronLeft,
    faChevronRight,
    faPenToSquare,
    faTrash
} from '@fortawesome/free-solid-svg-icons';
import { findIconDefinition, IconPrefix, IconName } from '@fortawesome/fontawesome-svg-core';
import { PlannedExpensesResponseDto, BudgetSectionItemDto } from '../../api-client';
import { PlannedExpenseCard } from './PlannedExpenseCard';
import './PlannedExpensesView.css';
import '../../pages/Transactions.css'; // Reuse table styles

interface PlannedExpensesViewProps {
    data: PlannedExpensesResponseDto | undefined;
    isLoading: boolean;
    error: Error | null;
}

export const PlannedExpensesView: React.FC<PlannedExpensesViewProps> = ({
    data,
    isLoading,
    error
}) => {
    const [showCompleted, setShowCompleted] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(50); // Default page size matches Transactions

    // Filter Planned Expenses based on toggle
    const filteredPlannedExpenses = useMemo(() => {
        if (!data?.plannedExpenses) return [];

        console.group('PlannedExpensesFilter');
        console.log('ShowCompleted:', showCompleted);

        if (showCompleted) {
            console.log('Returning all:', data.plannedExpenses.length);
            console.groupEnd();
            return data.plannedExpenses;
        }

        const filtered = data.plannedExpenses.filter(pe => {
            // An expense is considered completed if:
            // 1. The API explicitly says so (isCompleted === true)
            // 2. OR the amount left is effectively zero or negative (calculated from amountLeft)
            // We use OR logic here because sometimes the API might return false for isCompleted
            // even if the user has fully spent the budget (e.g. overspent).

            const isCompletedProp = pe.isCompleted === true;
            const calculatedCompleted = (pe.amountLeft !== undefined && pe.amountLeft <= 0.01);

            const isCompleted = isCompletedProp || calculatedCompleted;

            console.log(`Expense: ${pe.name}, left: ${pe.amountLeft}, isCompletedProp: ${pe.isCompleted}, calculated: ${calculatedCompleted}, FINAL: ${isCompleted} -> KEEP: ${!isCompleted}`);
            return !isCompleted;
        });

        console.log('Filtered count:', filtered.length);
        console.groupEnd();
        return filtered;
    }, [data?.plannedExpenses, showCompleted]);

    // Pagination for the item list (bottom grid)
    const paginatedItems = useMemo(() => {
        const items = data?.items || [];
        const startIndex = (currentPage - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        return items.slice(startIndex, endIndex);
    }, [data?.items, currentPage, pageSize]);

    const totalPages = Math.ceil((data?.items?.length || 0) / pageSize);

    // Helper for icons (copied from Transactions.tsx)
    const getIcon = (iconName: string | null | undefined) => {
        const prefix: IconPrefix = 'fas';
        const icon = iconName ? findIconDefinition({ prefix, iconName: iconName as any }) : null;
        return icon || ['fas', 'question-circle'] as [IconPrefix, IconName];
    };

    const formatAmount = (amount: number | undefined) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2
        }).format(amount || 0);
    };

    const formatDate = (date: Date | undefined) => {
        if (!date) return '';
        const d = new Date(date);
        const dayName = d.toLocaleDateString('es-ES', { weekday: 'long' });
        const day = d.getDate();
        const month = d.getMonth() + 1;
        const year = d.getFullYear();
        return `${dayName}\n${day}/${month}/${year}`;
    };

    if (isLoading) {
        return (
            <div className="budget-page__loader" style={{ position: 'relative', height: '200px', background: 'transparent' }}>
                <div className="bg-slate-800 p-4 rounded text-white">Cargando...</div>
            </div>
        );
    }

    if (error) {
        return <div className="budget-page__error">Error loading planned expenses: {error.message}</div>;
    }

    return (
        <div className="planned-expenses-view">
            {/* Header / Toggle */}
            <div className="planned-expenses-view__header">
                <label className="planned-expenses-view__toggle-label">
                    <input
                        type="checkbox"
                        className="planned-expenses-view__toggle-input"
                        checked={showCompleted}
                        onChange={(e) => setShowCompleted(e.target.checked)}
                    />
                    <div className="planned-expenses-view__toggle-switch">
                        <div className="planned-expenses-view__toggle-handle" />
                    </div>
                    <span>Mostrar gastos planeados completados</span>
                </label>
            </div>

            {/* Cards Grid */}
            <div className="planned-expenses-view__grid">
                {filteredPlannedExpenses.map(expense => (
                    <PlannedExpenseCard key={expense.id} expense={expense} />
                ))}
            </div>

            {/* Separator / Spacer */}
            <div style={{ height: 'var(--space-xl)' }} />

            {/* Items Table Header / Controls */}
            {/* Logic implies we reuse the same structure as Transactions page table */}

            <div className="transactions-page__controls">
                <div className="transactions-page__page-size">
                    <label>Mostrar:</label>
                    <select
                        value={pageSize}
                        onChange={(e) => {
                            setPageSize(Number(e.target.value));
                            setCurrentPage(1);
                        }}
                    >
                        <option value={20}>20</option>
                        <option value={50}>50</option>
                        <option value={75}>75</option>
                        <option value={100}>100</option>
                    </select>
                </div>
            </div>

            {/* Table */}
            <div className="transactions-table">
                <div className="transactions-table__header">
                    <div className="transactions-table__header-cell">Fecha</div>
                    <div className="transactions-table__header-cell">Categoría</div>
                    <div className="transactions-table__header-cell">Cuenta</div>
                    <div className="transactions-table__header-cell">Cantidad</div>
                    <div className="transactions-table__header-cell">Notas</div>
                    <div className="transactions-table__header-cell">Acciones</div>
                </div>

                <div className="transactions-table__body">
                    {paginatedItems.length === 0 ? (
                        <div className="transactions-page__empty">
                            No hay transacciones asociadas
                        </div>
                    ) : (
                        paginatedItems.map((item: BudgetSectionItemDto) => (
                            <div key={item.id} className="transactions-table__row">
                                <div className="transactions-table__cell transactions-table__cell--date">
                                    {formatDate(item.createdAt)}
                                </div>
                                <div className="transactions-table__cell transactions-table__cell--category">
                                    <div
                                        className="transactions-table__category-icon"
                                        style={{ backgroundColor: item.color || '#cccccc' }}
                                    >
                                        <FontAwesomeIcon icon={getIcon(item.icon)} />
                                    </div>
                                    <div className="transactions-table__category-text">
                                        <div className="transactions-table__category-name">
                                            {item.categoryName || item.name}
                                        </div>
                                        {item.subcategory && (
                                            <div className="transactions-table__category-subcategory">
                                                {item.subcategory}
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className="transactions-table__cell transactions-table__cell--account">
                                    {item.accountName}
                                </div>
                                <div
                                    className="transactions-table__cell transactions-table__cell--amount"
                                    style={{ color: 'inherit' }} // Customize based on type if needed
                                >
                                    {formatAmount(item.amount)}
                                </div>
                                <div className="transactions-table__cell transactions-table__cell--notes">
                                    {item.notes}
                                </div>
                                <div className="transactions-table__cell transactions-table__cell--actions">
                                    <button className="transactions-table__action-btn" title="Edit">
                                        <FontAwesomeIcon icon={faPenToSquare} />
                                    </button>
                                    <button className="transactions-table__action-btn" title="Delete">
                                        <FontAwesomeIcon icon={faTrash} />
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
                <div className="transactions-page__pagination">
                    <button
                        className="transactions-page__month-btn"
                        onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                        disabled={currentPage === 1}
                    >
                        <FontAwesomeIcon icon={faChevronLeft} />
                    </button>
                    <div className="transactions-page__pagination-info">
                        Página {currentPage} de {totalPages}
                    </div>
                    <button
                        className="transactions-page__month-btn"
                        onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                        disabled={currentPage === totalPages}
                    >
                        <FontAwesomeIcon icon={faChevronRight} />
                    </button>
                </div>
            )}
        </div>
    );
};
