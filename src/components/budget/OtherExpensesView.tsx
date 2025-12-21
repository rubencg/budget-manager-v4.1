import React, { useState, useMemo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faChevronLeft,
    faChevronRight,
    faPenToSquare,
    faTrash
} from '@fortawesome/free-solid-svg-icons';
import { findIconDefinition, IconPrefix, IconName } from '@fortawesome/fontawesome-svg-core';
import { OtherExpensesResponseDto, BudgetSectionItemDto, Transaction } from '../../api-client';
import { ResponsivePie } from '@nivo/pie';
import { TransactionModal } from '../transactions/TransactionModal';
import { ConfirmationModal } from '../ui/ConfirmationModal';
import { useTransactionMutations } from '../../hooks/useTransactionMutations';
import { useTransactionsQuery } from '../../hooks/useTransactionsQuery';
import { useAccountsQuery } from '../../hooks/useAccountsQuery';
import { TransactionType } from '../../api-client/models/TransactionType';
import { formatCurrency } from '../../utils/currencyUtils';
import './OtherExpensesView.css';
import '../../pages/Transactions.css'; // Reuse table styles

interface OtherExpensesViewProps {
    data: OtherExpensesResponseDto | undefined;
    isLoading: boolean;
    error: Error | null;
    year: number;
    month: number;
}

export const OtherExpensesView: React.FC<OtherExpensesViewProps> = ({
    data,
    isLoading,
    error,
    year,
    month
}) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(50);

    // Hooks
    const { deleteTransaction } = useTransactionMutations();
    const { data: accountsData } = useAccountsQuery();
    const { data: transactionsData } = useTransactionsQuery(year, month);

    // Modal State
    const [isTransactionModalOpen, setIsTransactionModalOpen] = useState(false);
    const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);

    const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
    const [itemToDelete, setItemToDelete] = useState<string | null>(null);

    const flattenedAccounts = useMemo(() => {
        if (!accountsData) return [];
        return accountsData.flatMap(type => type.accounts || []);
    }, [accountsData]);

    // Pagination for the item list
    const paginatedItems = useMemo(() => {
        const items = data?.items || [];
        const startIndex = (currentPage - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        return items.slice(startIndex, endIndex);
    }, [data?.items, currentPage, pageSize]);

    const totalPages = Math.ceil((data?.items?.length || 0) / pageSize);

    // Group items by category for the chart
    const chartData = useMemo(() => {
        const items = data?.items || [];
        const groups: Record<string, { id: string, label: string, value: number, color: string }> = {};

        items.forEach(item => {
            const categoryName = item.categoryName || item.name || 'Otros';
            if (!groups[categoryName]) {
                groups[categoryName] = {
                    id: categoryName,
                    label: categoryName,
                    value: 0,
                    color: item.color || '#cccccc'
                };
            }
            groups[categoryName].value += item.amount || 0;
        });

        return Object.values(groups).sort((a, b) => b.value - a.value);
    }, [data?.items]);

    // Helper for icons
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
        setItemToDelete(id);
        setIsConfirmationModalOpen(true);
    };

    const handleConfirmDelete = async () => {
        if (!itemToDelete) return;

        try {
            await deleteTransaction.mutateAsync(itemToDelete);
            setIsConfirmationModalOpen(false);
            setItemToDelete(null);
        } catch (error) {
            console.error('Failed to delete transaction:', error);
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
        return <div className="budget-page__error">Error loading other expenses: {error.message}</div>;
    }

    return (
        <div className="other-expenses-view">
            {/* Header / Summary */}
            <div className="other-expenses-view__header">
                <div className="other-expenses-view__summary">
                    <span className="other-expenses-view__label">Total Otros Gastos:</span>
                    <span className="other-expenses-view__value">{formatAmount(data?.total)}</span>
                </div>
            </div>

            {/* Chart Area */}
            {chartData.length > 0 && (
                <div className="other-expenses-view__chart-container">
                    <div className="other-expenses-view__chart">
                        <ResponsivePie
                            data={chartData}
                            margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
                            innerRadius={0}
                            padAngle={0.7}
                            cornerRadius={3}
                            activeOuterRadiusOffset={8}
                            colors={{ datum: 'data.color' }}
                            borderWidth={1}
                            borderColor={{ from: 'color', modifiers: [['darker', 0.2]] }}
                            enableArcLinkLabels={false}
                            enableArcLabels={false}
                            isInteractive={true}
                            tooltip={({ datum }) => (
                                <div style={{
                                    color: '#fff',
                                    background: '#333',
                                    padding: '5px 10px',
                                    borderRadius: '4px',
                                    fontSize: '12px',
                                    border: `1px solid ${datum.color}`,
                                    boxShadow: '0 4px 6px rgba(0,0,0,0.3)'
                                }}>
                                    <strong>{datum.label}</strong>: {formatAmount(datum.value)}
                                </div>
                            )}
                        />
                    </div>
                    <div className="other-expenses-view__legend">
                        {chartData.map(item => (
                            <div key={item.id} className="other-expenses-view__legend-item">
                                <div
                                    className="other-expenses-view__legend-color"
                                    style={{ backgroundColor: item.color }}
                                />
                                <span className="other-expenses-view__legend-label">{item.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}

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
                            No hay transacciones registradas
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
                                    style={{ color: 'var(--color-error)' }}
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
                }}
                type={editingTransaction?.transactionType ?? TransactionType.NUMBER_0}
                accounts={flattenedAccounts}
                transaction={editingTransaction}
            />

            <ConfirmationModal
                isOpen={isConfirmationModalOpen}
                onClose={() => {
                    setIsConfirmationModalOpen(false);
                    setItemToDelete(null);
                }}
                onConfirm={handleConfirmDelete}
                title="Eliminar Transacción"
                message="¿Estás seguro de que deseas eliminar este gasto?"
                confirmText="Eliminar"
                isLoading={deleteTransaction.isPending}
            />
        </div>
    );
};
