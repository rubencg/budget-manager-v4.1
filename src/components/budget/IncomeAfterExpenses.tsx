import React, { useMemo, useState } from 'react';
import { BudgetSection } from './BudgetSection';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash, faCheckCircle, faWallet, faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import { findIconDefinition, IconPrefix, IconName } from '@fortawesome/fontawesome-svg-core';
import { IncomeAfterFixedExpensesDto, BudgetSectionItemDto, Transaction } from '../../api-client';
import { useAccountsQuery } from '../../hooks/useAccountsQuery';
import { useCategoriesQuery } from '../../hooks/useCategoriesQuery';
import { useMonthlyTransactionMutations } from '../../hooks/useMonthlyTransactionMutations';
import { useSavingMutations } from '../../hooks/useSavingMutations';
import { useTransactionsQuery } from '../../hooks/useTransactionsQuery';
import { useTransactionMutations } from '../../hooks/useTransactionMutations';
import { MonthlyTransactionModal } from '../transactions/MonthlyTransactionModal';
import { TransactionModal } from '../transactions/TransactionModal';
import { TransferModal } from '../accounts/TransferModal';
import { SavingsModal } from '../savings/SavingsModal';
import { ConfirmationModal } from '../ui/ConfirmationModal';
import { TransactionType } from '../../api-client/models/TransactionType';
import './IncomeAfterExpenses.css';

interface IncomeAfterExpensesProps {
    data?: IncomeAfterFixedExpensesDto;
    year: number;
    month: number;
}

export const IncomeAfterExpenses: React.FC<IncomeAfterExpensesProps> = ({ data, year, month }) => {
    const { data: accountsData } = useAccountsQuery();
    const { data: expenseCategories } = useCategoriesQuery('expense');
    const { data: incomeCategories } = useCategoriesQuery('income');
    const { deleteMonthlyTransaction } = useMonthlyTransactionMutations();
    const { deleteSaving } = useSavingMutations();
    const { data: transactionsData } = useTransactionsQuery(year, month);
    const { deleteTransaction } = useTransactionMutations();

    const [isTransactionModalOpen, setIsTransactionModalOpen] = useState(false);
    const [editingTransaction, setEditingTransaction] = useState<BudgetSectionItemDto | null>(null);

    const [isSavingModalOpen, setIsSavingModalOpen] = useState(false);
    const [editingSaving, setEditingSaving] = useState<BudgetSectionItemDto | null>(null);

    const [editingAppliedTransaction, setEditingAppliedTransaction] = useState<Transaction | null>(null);

    // Apply Modal State
    const [isApplyTransactionModalOpen, setIsApplyTransactionModalOpen] = useState(false);
    const [isApplyTransferModalOpen, setIsApplyTransferModalOpen] = useState(false);
    const [applyDefaultValues, setApplyDefaultValues] = useState<any>(null);
    const [applyTransactionType, setApplyTransactionType] = useState<TransactionType>(TransactionType.NUMBER_0);

    // Confirmation Modal State
    const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
    const [itemToDelete, setItemToDelete] = useState<{ id: string, type: 'transaction' | 'saving' | 'applied-transaction' } | null>(null);

    const flattenedAccounts = useMemo(() => {
        if (!accountsData) return [];
        return accountsData.flatMap(type => type.accounts || []);
    }, [accountsData]);

    const allCategories = useMemo(() => {
        const expenses = expenseCategories || [];
        const incomes = incomeCategories || [];
        return [...expenses, ...incomes];
    }, [expenseCategories, incomeCategories]);

    const getCategoryDetails = (categoryId: string | null | undefined) => {
        if (!categoryId) return null;
        return allCategories.find(c => c.id === categoryId);
    };

    const getIcon = (iconName: string | null | undefined) => {
        const prefix: IconPrefix = 'fas';
        if (!iconName || iconName === 'default') {
            // Default wallet icon if needed, or question circle
            return faWallet;
        }
        const icon = findIconDefinition({ prefix, iconName: iconName as any });
        return icon || faQuestionCircle;
    };

    const handleDeleteTransaction = (item: BudgetSectionItemDto) => {
        if (!item.id) return;
        if (item.isApplied && item.transactionId) {
            setItemToDelete({ id: item.transactionId, type: 'applied-transaction' });
        } else {
            setItemToDelete({ id: item.id, type: 'transaction' });
        }
        setIsConfirmationModalOpen(true);
    };

    const handleDeleteSaving = (item: BudgetSectionItemDto) => {
        if (!item.id) return;
        if (item.isApplied && item.transactionId) {
            setItemToDelete({ id: item.transactionId, type: 'applied-transaction' });
        } else {
            setItemToDelete({ id: item.id, type: 'saving' });
        }
        setIsConfirmationModalOpen(true);
    };

    const handleConfirmDelete = async () => {
        if (!itemToDelete) return;

        try {
            if (itemToDelete.type === 'transaction') {
                await deleteMonthlyTransaction.mutateAsync(itemToDelete.id);
            } else if (itemToDelete.type === 'saving') {
                await deleteSaving.mutateAsync(itemToDelete.id);
            } else if (itemToDelete.type === 'applied-transaction') {
                await deleteTransaction.mutateAsync(itemToDelete.id);
            }
        } catch (error) {
            console.error('Failed to delete item:', error);
            // Optionally show error state or toast here
        } finally {
            setIsConfirmationModalOpen(false);
            setItemToDelete(null);
        }
    };

    const handleEditTransaction = (item: BudgetSectionItemDto, type: TransactionType) => {
        if (item.isApplied && item.transactionId) {
            const transaction = transactionsData?.data?.find((t: Transaction) => t.id === item.transactionId);
            if (transaction) {
                setEditingAppliedTransaction(transaction);
                setApplyDefaultValues({
                    monthlyKey: item.id
                });
                setApplyTransactionType(type);
                setIsApplyTransactionModalOpen(true);
            }
        } else {
            setEditingTransaction(item);
            setIsTransactionModalOpen(true);
        }
    };

    const handleEditSaving = (item: BudgetSectionItemDto) => {
        if (item.isApplied && item.transactionId) {
            const transaction = transactionsData?.data?.find((t: Transaction) => t.id === item.transactionId);
            if (transaction) {
                setEditingAppliedTransaction(transaction);
                setApplyDefaultValues({
                    savingKey: item.id
                });
                setIsApplyTransferModalOpen(true);
            }
        } else {
            setEditingSaving(item);
            setIsSavingModalOpen(true);
        }
    };

    const handleApplyTransaction = (item: BudgetSectionItemDto, type: TransactionType) => {
        const category = getCategoryDetails(item.categoryId);
        setEditingAppliedTransaction(null); // Ensure we are in create mode
        setApplyDefaultValues({
            amount: item.amount,
            categoryId: item.categoryId,
            categoryName: item.categoryName || category?.name,
            notes: item.notes,
            monthlyKey: item.id
        });
        setApplyTransactionType(type);
        setIsApplyTransactionModalOpen(true);
    };

    const handleApplySaving = (item: BudgetSectionItemDto) => {
        setEditingAppliedTransaction(null); // Ensure we are in create mode
        setApplyDefaultValues({
            amount: item.amountPerMonth,
            toAccountId: item.accountId,
            savingKey: item.id,
            notes: `Ahorro mensual: ${item.name}`
        });
        setIsApplyTransferModalOpen(true);
    };

    // Helper to render action buttons
    const renderActions = (item: BudgetSectionItemDto, type: 'transaction' | 'saving', transactionType?: TransactionType) => (
        <div className="income-after-expenses__actions">
            {!item.isApplied && (
                <button
                    className="income-after-expenses__action-btn income-after-expenses__action-btn--apply"
                    title="Aplicar"
                    onClick={(e) => {
                        e.stopPropagation();
                        if (type === 'transaction' && transactionType !== undefined) {
                            handleApplyTransaction(item, transactionType);
                        } else if (type === 'saving') {
                            handleApplySaving(item);
                        }
                    }}
                >
                    <FontAwesomeIcon icon={faCheckCircle} />
                </button>
            )}
            <button
                className="income-after-expenses__action-btn"
                title="Editar"
                onClick={(e) => {
                    e.stopPropagation();
                    type === 'transaction' && transactionType !== undefined ? handleEditTransaction(item, transactionType) : handleEditSaving(item);
                }}
            >
                <FontAwesomeIcon icon={faPenToSquare} />
            </button>
            <button
                className="income-after-expenses__action-btn income-after-expenses__action-btn--delete"
                title="Eliminar"
                onClick={(e) => {
                    e.stopPropagation();
                    type === 'transaction' ? handleDeleteTransaction(item) : handleDeleteSaving(item);
                }}
            >
                <FontAwesomeIcon icon={faTrash} />
            </button>
        </div>
    );

    // Helper to render isApplied status
    const renderApplied = (isApplied: boolean) => (
        isApplied ? (
            <div className="income-after-expenses__applied-status income-after-expenses__applied-status--active">
                <FontAwesomeIcon icon={faCheckCircle} />
            </div>
        ) : null
    );

    if (!data) return <div className="income-after-expenses__loading">Cargando...</div>;

    const isDeleting = deleteMonthlyTransaction.isPending || deleteSaving.isPending || deleteTransaction.isPending;

    return (
        <div className="income-after-expenses">
            {/* Monthly Incomes Section */}
            <BudgetSection title="Ingresos" total={data.incomesAfterMonthlyExpenses?.monthlyIncomes?.total || 0}>
                {!data.incomesAfterMonthlyExpenses?.monthlyIncomes?.items?.length ? (
                    <div className="income-after-expenses__no-data">No hay ingresos registrados</div>
                ) : (
                    <div className="income-after-expenses__table-container">
                        <table className="income-after-expenses__table">
                            <thead>
                                <tr>
                                    <th className="income-after-expenses__th income-after-expenses__col--date">Fecha</th>
                                    <th className="income-after-expenses__th income-after-expenses__col--category">Categoría</th>
                                    <th className="income-after-expenses__th income-after-expenses__col--account">Cuenta</th>
                                    <th className="income-after-expenses__th income-after-expenses__col--amount">Cantidad</th>
                                    <th className="income-after-expenses__th income-after-expenses__col--notes">Notas</th>
                                    <th className="income-after-expenses__th income-after-expenses__col--applied" style={{ textAlign: 'center' }}>Aplicada</th>
                                    <th className="income-after-expenses__th income-after-expenses__col--actions" style={{ textAlign: 'right' }}>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.incomesAfterMonthlyExpenses.monthlyIncomes.items.map((item, index) => {
                                    const category = getCategoryDetails(item.categoryId);
                                    const account = flattenedAccounts.find(a => a.id === item.accountId);

                                    return (
                                        <tr key={index} className="income-after-expenses__tr">
                                            <td className="income-after-expenses__td">
                                                <div className="income-after-expenses__date">
                                                    <span className="income-after-expenses__day-name">
                                                        {item.dayOfMonth ? `Día ${item.dayOfMonth}` : 'N/A'}
                                                    </span>
                                                    <span className="income-after-expenses__full-date">
                                                        {new Date(year, month - 1, item.dayOfMonth || 1).toLocaleDateString('es-ES', { month: '2-digit', year: 'numeric' })}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="income-after-expenses__td">
                                                <div className="income-after-expenses__category">
                                                    <div
                                                        className="income-after-expenses__icon"
                                                        style={{ backgroundColor: category?.color || item.color || '#374151' }}
                                                    >
                                                        <FontAwesomeIcon icon={getIcon(category?.image || item.icon)} />
                                                    </div>
                                                    <div className="income-after-expenses__category-info">
                                                        <span className="income-after-expenses__category-name">{item.categoryName || category?.name}</span>
                                                        {item.subcategory && (
                                                            <span className="income-after-expenses__subcategory">{item.subcategory}</span>
                                                        )}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="income-after-expenses__td">
                                                <div className="income-after-expenses__account">
                                                    <div
                                                        className="income-after-expenses__icon"
                                                        style={{
                                                            backgroundColor: account?.color || '#374151',
                                                            width: '24px', height: '24px', fontSize: '10px'
                                                        }}
                                                    >
                                                        <FontAwesomeIcon icon={getIcon(account?.image)} />
                                                    </div>
                                                    <span>{item.accountName}</span>
                                                </div>
                                            </td>
                                            <td className="income-after-expenses__td">
                                                <span className={`income-after-expenses__amount ${item.isApplied ? 'income-after-expenses__amount--income-applied' : 'income-after-expenses__amount--income-not-applied'}`}>
                                                    ${item.amount?.toFixed(2)}
                                                </span>
                                            </td>
                                            <td className="income-after-expenses__td">
                                                <div className="income-after-expenses__notes" title={item.notes || ''}>
                                                    {item.notes}
                                                </div>
                                            </td>
                                            <td className="income-after-expenses__td" style={{ textAlign: 'center' }}>
                                                {renderApplied(item.isApplied || false)}
                                            </td>
                                            <td className="income-after-expenses__td" style={{ textAlign: 'right' }}>
                                                {renderActions(item, 'transaction', TransactionType.NUMBER_1)}
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                )}
            </BudgetSection>

            {/* Monthly Expenses Section */}
            <BudgetSection title="Gastos mensuales" total={data.incomesAfterMonthlyExpenses?.monthlyExpenses?.total || 0}>
                {!data.incomesAfterMonthlyExpenses?.monthlyExpenses?.items?.length ? (
                    <div className="income-after-expenses__no-data">No hay gastos mensuales registrados</div>
                ) : (
                    <div className="income-after-expenses__table-container">
                        <table className="income-after-expenses__table">
                            <thead>
                                <tr>
                                    <th className="income-after-expenses__th income-after-expenses__col--date">Fecha</th>
                                    <th className="income-after-expenses__th income-after-expenses__col--category">Categoría</th>
                                    <th className="income-after-expenses__th income-after-expenses__col--account">Cuenta</th>
                                    <th className="income-after-expenses__th income-after-expenses__col--amount">Cantidad</th>
                                    <th className="income-after-expenses__th income-after-expenses__col--notes">Notas</th>
                                    <th className="income-after-expenses__th income-after-expenses__col--applied" style={{ textAlign: 'center' }}>Aplicada</th>
                                    <th className="income-after-expenses__th income-after-expenses__col--actions" style={{ textAlign: 'right' }}>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.incomesAfterMonthlyExpenses.monthlyExpenses.items.map((item, index) => {
                                    const category = getCategoryDetails(item.categoryId);
                                    const account = flattenedAccounts.find(a => a.id === item.accountId);

                                    return (
                                        <tr key={index} className="income-after-expenses__tr">
                                            <td className="income-after-expenses__td">
                                                <div className="income-after-expenses__date">
                                                    <span className="income-after-expenses__day-name">
                                                        {item.dayOfMonth ? `Día ${item.dayOfMonth}` : 'N/A'}
                                                    </span>
                                                    <span className="income-after-expenses__full-date">
                                                        {new Date(year, month - 1, item.dayOfMonth || 1).toLocaleDateString('es-ES', { month: '2-digit', year: 'numeric' })}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="income-after-expenses__td">
                                                <div className="income-after-expenses__category">
                                                    <div
                                                        className="income-after-expenses__icon"
                                                        style={{ backgroundColor: category?.color || item.color || '#374151' }}
                                                    >
                                                        <FontAwesomeIcon icon={getIcon(category?.image || item.icon)} />
                                                    </div>
                                                    <div className="income-after-expenses__category-info">
                                                        <span className="income-after-expenses__category-name">{item.categoryName || category?.name}</span>
                                                        {item.subcategory && (
                                                            <span className="income-after-expenses__subcategory">{item.subcategory}</span>
                                                        )}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="income-after-expenses__td">
                                                <div className="income-after-expenses__account">
                                                    <div
                                                        className="income-after-expenses__icon"
                                                        style={{
                                                            backgroundColor: account?.color || '#374151',
                                                            width: '24px', height: '24px', fontSize: '10px'
                                                        }}
                                                    >
                                                        <FontAwesomeIcon icon={getIcon(account?.image)} />
                                                    </div>
                                                    <span>{item.accountName}</span>
                                                </div>
                                            </td>
                                            <td className="income-after-expenses__td">
                                                <span className={`income-after-expenses__amount ${item.isApplied ? 'income-after-expenses__amount--expense-applied' : 'income-after-expenses__amount--expense-not-applied'}`}>
                                                    ${item.amount?.toFixed(2)}
                                                </span>
                                            </td>
                                            <td className="income-after-expenses__td">
                                                <div className="income-after-expenses__notes" title={item.notes || ''}>
                                                    {item.notes}
                                                </div>
                                            </td>
                                            <td className="income-after-expenses__td" style={{ textAlign: 'center' }}>
                                                {renderApplied(item.isApplied || false)}
                                            </td>
                                            <td className="income-after-expenses__td" style={{ textAlign: 'right' }}>
                                                {renderActions(item, 'transaction', TransactionType.NUMBER_0)}
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                )}
            </BudgetSection>

            {/* Savings Section */}
            <BudgetSection title="Ahorros" total={data.incomesAfterMonthlyExpenses?.savings?.total || 0}>
                {!data.incomesAfterMonthlyExpenses?.savings?.items?.length ? (
                    <div className="income-after-expenses__no-data">No hay ahorros registrados</div>
                ) : (
                    <div className="income-after-expenses__table-container">
                        <table className="income-after-expenses__table">
                            <thead>
                                <tr>
                                    <th className="income-after-expenses__th income-after-expenses__col--savings-name">Nombre</th>
                                    <th className="income-after-expenses__th income-after-expenses__col--savings-monthly">Cantidad por mes</th>
                                    <th className="income-after-expenses__th income-after-expenses__col--savings-saved">Ahorrado</th>
                                    <th className="income-after-expenses__th income-after-expenses__col--savings-goal">Objetivo</th>
                                    <th className="income-after-expenses__th income-after-expenses__col--savings-remaining">Restante</th>
                                    <th className="income-after-expenses__th income-after-expenses__col--applied" style={{ textAlign: 'center' }}>Aplicada</th>
                                    <th className="income-after-expenses__th income-after-expenses__col--actions" style={{ textAlign: 'right' }}>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.incomesAfterMonthlyExpenses.savings.items.map((item, index) => {
                                    const remaining = (item.goalAmount || 0) - (item.savedAmount || 0);

                                    return (
                                        <tr key={index} className="income-after-expenses__tr">
                                            <td className="income-after-expenses__td">
                                                <div className="income-after-expenses__category">
                                                    <div
                                                        className="income-after-expenses__icon"
                                                        style={{ backgroundColor: item.color || '#374151' }}
                                                    >
                                                        <FontAwesomeIcon icon={getIcon(item.icon || 'piggy-bank')} />
                                                    </div>
                                                    <span className="income-after-expenses__category-name">{item.name}</span>
                                                </div>
                                            </td>
                                            <td className="income-after-expenses__td">
                                                <span className="income-after-expenses__amount">
                                                    ${item.amountPerMonth?.toFixed(2)}
                                                </span>
                                            </td>
                                            <td className="income-after-expenses__td">
                                                <span>${item.savedAmount?.toFixed(2)}</span>
                                            </td>
                                            <td className="income-after-expenses__td">
                                                <span>${item.goalAmount?.toFixed(2)}</span>
                                            </td>
                                            <td className="income-after-expenses__td">
                                                <span>${remaining.toFixed(2)}</span>
                                            </td>
                                            <td className="income-after-expenses__td" style={{ textAlign: 'center' }}>
                                                {renderApplied(item.isApplied || false)}
                                            </td>
                                            <td className="income-after-expenses__td" style={{ textAlign: 'right' }}>
                                                {renderActions(item, 'saving')}
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                )}
            </BudgetSection>

            <MonthlyTransactionModal
                isOpen={isTransactionModalOpen}
                onClose={() => setIsTransactionModalOpen(false)}
                accounts={flattenedAccounts}
                entity={editingTransaction}
            />

            <SavingsModal
                isOpen={isSavingModalOpen}
                onClose={() => setIsSavingModalOpen(false)}
                saving={editingSaving as any}
            />

            <TransactionModal
                isOpen={isApplyTransactionModalOpen}
                onClose={() => {
                    setIsApplyTransactionModalOpen(false);
                    setEditingAppliedTransaction(null);
                    setApplyDefaultValues(null);
                }}
                accounts={flattenedAccounts}
                type={applyTransactionType}
                defaultValues={applyDefaultValues}
                transaction={editingAppliedTransaction}
            />

            <TransferModal
                isOpen={isApplyTransferModalOpen}
                onClose={() => {
                    setIsApplyTransferModalOpen(false);
                    setEditingAppliedTransaction(null);
                    setApplyDefaultValues(null);
                }}
                accounts={flattenedAccounts}
                defaultValues={applyDefaultValues}
                transaction={editingAppliedTransaction}
            />

            <ConfirmationModal
                isOpen={isConfirmationModalOpen}
                onClose={() => setIsConfirmationModalOpen(false)}
                onConfirm={handleConfirmDelete}
                title="Eliminar elemento"
                message={itemToDelete?.type === 'transaction'
                    ? "¿Estás seguro de que deseas eliminar esta transacción mensual?"
                    : itemToDelete?.type === 'saving'
                        ? "¿Estás seguro de que deseas eliminar este ahorro?"
                        : "¿Estás seguro de que deseas eliminar la transacción aplicada? Esto desaplicará el elemento del presupuesto."}
                confirmText="Eliminar"
                isLoading={isDeleting}
            />

        </div>
    );
};
