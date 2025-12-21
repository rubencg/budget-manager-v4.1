import React, { useState, useMemo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faChevronLeft,
    faChevronRight,
    faPenToSquare,
    faTrash
} from '@fortawesome/free-solid-svg-icons';
import { findIconDefinition, IconPrefix, IconName } from '@fortawesome/fontawesome-svg-core';
import { PlannedExpensesResponseDto, BudgetSectionItemDto, Transaction, PlannedExpenseViewDto } from '../../api-client';
import { PlannedExpenseCard } from './PlannedExpenseCard';
import { TransactionModal } from '../transactions/TransactionModal';
import { PlannedExpenseModal } from '../planned-expenses/PlannedExpenseModal';
import { ConfirmationModal } from '../ui/ConfirmationModal';
import { useTransactionMutations } from '../../hooks/useTransactionMutations';
import { usePlannedExpenseMutations } from '../../hooks/usePlannedExpenseMutations';
import { useTransactionsQuery } from '../../hooks/useTransactionsQuery';
import { useAccountsQuery } from '../../hooks/useAccountsQuery';
import { TransactionType } from '../../api-client/models/TransactionType';
import { formatCurrency } from '../../utils/currencyUtils';
import './PlannedExpensesView.css';
import '../../pages/Transactions.css'; // Reuse table styles

interface PlannedExpensesViewProps {
    data: PlannedExpensesResponseDto | undefined;
    isLoading: boolean;
    error: Error | null;
    year: number;
    month: number;
}

export const PlannedExpensesView: React.FC<PlannedExpensesViewProps> = ({
    data,
    isLoading,
    error,
    year,
    month
}) => {
    const [showCompleted, setShowCompleted] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(50); // Default page size matches Transactions

    // Hooks
    const { deleteTransaction } = useTransactionMutations();
    const { updatePlannedExpense, deletePlannedExpense } = usePlannedExpenseMutations();
    const { data: accountsData } = useAccountsQuery();
    const { data: transactionsData } = useTransactionsQuery(year, month);

    // Filter Logic State
    const [filterPlannedExpenseId, setFilterPlannedExpenseId] = useState<string | null>(null);

    // Modal State
    const [isTransactionModalOpen, setIsTransactionModalOpen] = useState(false);
    const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);
    const [transactionDefaultValues, setTransactionDefaultValues] = useState<any>(null);

    const [isPlannedExpenseModalOpen, setIsPlannedExpenseModalOpen] = useState(false);
    const [editingPlannedExpense, setEditingPlannedExpense] = useState<PlannedExpenseViewDto | null>(null);

    const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
    const [itemToDelete, setItemToDelete] = useState<{ id: string, type: 'transaction' | 'planned-expense' } | null>(null);

    // Menu state
    const [activeMenuId, setActiveMenuId] = useState<string | null>(null);

    const handleToggleMenu = (e: React.MouseEvent, id: string) => {
        e.stopPropagation();
        setActiveMenuId(activeMenuId === id ? null : id);
    };

    // Close menu when clicking outside
    React.useEffect(() => {
        const handleClickAway = () => setActiveMenuId(null);
        window.addEventListener('click', handleClickAway);
        return () => window.removeEventListener('click', handleClickAway);
    }, []);

    const flattenedAccounts = useMemo(() => {
        if (!accountsData) return [];
        return accountsData.flatMap(type => type.accounts || []);
    }, [accountsData]);

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
        let items = data?.items || [];

        // Apply FE filter if selected
        if (filterPlannedExpenseId) {
            const pe = data?.plannedExpenses?.find(p => p.id === filterPlannedExpenseId);
            if (pe) {
                items = items.filter(item =>
                    item.categoryId === pe.categoryId &&
                    (!pe.subCategory || item.subcategory === pe.subCategory)
                );
            }
        }

        const startIndex = (currentPage - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        return items.slice(startIndex, endIndex);
    }, [data?.items, data?.plannedExpenses, filterPlannedExpenseId, currentPage, pageSize]);

    const totalItems = useMemo(() => {
        if (!filterPlannedExpenseId) return data?.items?.length || 0;
        const pe = data?.plannedExpenses?.find(p => p.id === filterPlannedExpenseId);
        if (!pe) return 0;
        return (data?.items || []).filter(item =>
            item.categoryId === pe.categoryId &&
            (!pe.subCategory || item.subcategory === pe.subCategory)
        ).length;
    }, [data?.items, data?.plannedExpenses, filterPlannedExpenseId]);

    const totalPages = Math.ceil(totalItems / pageSize);

    // Helper for icons (copied from Transactions.tsx)
    const getIcon = (iconName: string | null | undefined) => {
        const prefix: IconPrefix = 'fas';
        const icon = iconName ? findIconDefinition({ prefix, iconName: iconName as any }) : null;
        return icon || ['fas', 'question-circle'] as [IconPrefix, IconName];
    };

    const formatAmount = (amount: number | undefined) => {
        return formatCurrency(amount);
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

    const handleEditTransaction = (item: BudgetSectionItemDto) => {
        if (!item.id) return;
        const transaction = transactionsData?.data?.find((t: Transaction) => t.id === item.id);
        if (transaction) {
            setEditingTransaction(transaction);
            setIsTransactionModalOpen(true);
        }
    };

    const handleDeleteTransaction = (id: string | null | undefined) => {
        if (!id) return;
        setItemToDelete({ id, type: 'transaction' });
        setIsConfirmationModalOpen(true);
    };

    const handlePlannedExpenseAction = async (action: string, pe: PlannedExpenseViewDto) => {
        setActiveMenuId(null);

        switch (action) {
            case 'create-expense':
                setEditingTransaction(null);
                setTransactionDefaultValues({
                    categoryId: pe.categoryId,
                    categoryName: pe.categoryName,
                    subcategory: pe.subCategory
                });
                setIsTransactionModalOpen(true);
                break;
            case 'modify':
                setEditingPlannedExpense(pe);
                setIsPlannedExpenseModalOpen(true);
                break;
            case 'delete':
                if (pe.id) {
                    setItemToDelete({ id: pe.id, type: 'planned-expense' });
                    setIsConfirmationModalOpen(true);
                }
                break;
            case 'release-remaining':
                if (pe.id) {
                    try {
                        await updatePlannedExpense.mutateAsync({
                            plannedExpenseId: pe.id,
                            name: pe.name || '',
                            totalAmount: pe.amountSpent || 0,
                            categoryId: pe.categoryId || '',
                            categoryName: pe.categoryName || '',
                            categoryImage: pe.categoryImage || '',
                            categoryColor: pe.categoryColor || '',
                            subCategory: pe.subCategory || '',
                            isRecurring: pe.isRecurring || false,
                            date: pe.date,
                            dayOfMonth: pe.dayOfMonth
                        });
                    } catch (err) {
                        console.error('Failed to release remaining:', err);
                    }
                }
                break;
            case 'filter':
                setFilterPlannedExpenseId(pe.id || null);
                setCurrentPage(1);
                break;
        }
    };

    const handleConfirmDelete = async () => {
        if (!itemToDelete) return;

        try {
            if (itemToDelete.type === 'transaction') {
                await deleteTransaction.mutateAsync(itemToDelete.id);
            } else {
                await deletePlannedExpense.mutateAsync(itemToDelete.id);
            }
            setIsConfirmationModalOpen(false);
            setItemToDelete(null);
        } catch (error) {
            console.error('Failed to delete:', error);
        }
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
                    <PlannedExpenseCard
                        key={expense.id}
                        expense={expense}
                        onAction={handlePlannedExpenseAction}
                        isActiveMenu={activeMenuId === expense.id}
                        onToggleMenu={(e) => handleToggleMenu(e, expense.id || '')}
                    />
                ))}
            </div>

            {/* Separator / Spacer */}
            <div style={{ height: 'var(--space-xl)' }} />

            {/* Items Table Header / Controls */}
            {/* Logic implies we reuse the same structure as Transactions page table */}

            <div className="transactions-page__controls">
                <div style={{ display: 'flex', gap: 'var(--space-md)', alignItems: 'center' }}>
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
                    {filterPlannedExpenseId && (
                        <button
                            className="budget-page__action-btn"
                            style={{ height: '36px', padding: '0 16px' }}
                            onClick={() => setFilterPlannedExpenseId(null)}
                        >
                            Borrar filtros
                        </button>
                    )}
                </div>
                {filterPlannedExpenseId && (
                    <div className="transactions-page__filter-info" style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>
                        Filtrando por: <strong>{data?.plannedExpenses?.find(p => p.id === filterPlannedExpenseId)?.name}</strong>
                    </div>
                )}
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
                                    <button
                                        className="transactions-table__action-btn"
                                        title="Edit"
                                        onClick={() => handleEditTransaction(item)}
                                    >
                                        <FontAwesomeIcon icon={faPenToSquare} />
                                    </button>
                                    <button
                                        className="transactions-table__action-btn"
                                        title="Delete"
                                        onClick={() => handleDeleteTransaction(item.id)}
                                    >
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

            {/* Modals */}
            <TransactionModal
                isOpen={isTransactionModalOpen}
                onClose={() => {
                    setIsTransactionModalOpen(false);
                    setEditingTransaction(null);
                    setTransactionDefaultValues(null);
                }}
                type={editingTransaction?.transactionType ?? TransactionType.NUMBER_0}
                accounts={flattenedAccounts}
                transaction={editingTransaction}
                defaultValues={transactionDefaultValues}
            />

            <PlannedExpenseModal
                isOpen={isPlannedExpenseModalOpen}
                onClose={() => {
                    setIsPlannedExpenseModalOpen(false);
                    setEditingPlannedExpense(null);
                }}
                plannedExpense={editingPlannedExpense as any}
            />

            <ConfirmationModal
                isOpen={isConfirmationModalOpen}
                onClose={() => {
                    setIsConfirmationModalOpen(false);
                    setItemToDelete(null);
                }}
                onConfirm={handleConfirmDelete}
                title={itemToDelete?.type === 'transaction' ? "Eliminar Transacción" : "Eliminar Gasto Planeado"}
                message={itemToDelete?.type === 'transaction'
                    ? "¿Estás seguro de que deseas eliminar esta transacción vinculada a este gasto planeado?"
                    : "¿Estás seguro de que deseas eliminar este gasto planeado? Las transacciones asociadas no se eliminarán, pero ya no aparecerán aquí."}
                confirmText="Eliminar"
                isLoading={itemToDelete?.type === 'transaction' ? deleteTransaction.isPending : deletePlannedExpense.isPending}
            />
        </div>
    );
};
