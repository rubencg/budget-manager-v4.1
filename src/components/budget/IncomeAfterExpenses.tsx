import React, { useMemo } from 'react';
import { BudgetSection } from './BudgetSection';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { findIconDefinition, IconPrefix, IconName } from '@fortawesome/fontawesome-svg-core';
import { IncomeAfterFixedExpensesDto } from '../../api-client';
import { useAccountsQuery } from '../../hooks/useAccountsQuery';
import { useCategoriesQuery } from '../../hooks/useCategoriesQuery';
import './IncomeAfterExpenses.css';

interface IncomeAfterExpensesProps {
    data: IncomeAfterFixedExpensesDto | undefined;
    year: number;
    month: number;
}

const getIcon = (iconName: string | null | undefined) => {
    const prefix: IconPrefix = 'fas';
    // Fallback if iconName is 'default' or null
    if (!iconName || iconName === 'default') {
        return findIconDefinition({ prefix, iconName: 'wallet' }) || ['fas', 'wallet'] as [IconPrefix, IconName];
    }
    const icon = findIconDefinition({ prefix, iconName: iconName as any });
    return icon || ['fas', 'question-circle'] as [IconPrefix, IconName];
};

export const IncomeAfterExpenses: React.FC<IncomeAfterExpensesProps> = ({ data, year, month }) => {
    const { data: accountGroups } = useAccountsQuery();
    const { data: expenseCategories } = useCategoriesQuery('expense');
    const { data: incomeCategories } = useCategoriesQuery('income');

    const flattenedAccounts = useMemo(() => {
        if (!accountGroups) return [];
        return accountGroups.flatMap(g => g.accounts);
    }, [accountGroups]);

    const allCategories = useMemo(() => {
        return [...(incomeCategories || []), ...(expenseCategories || [])];
    }, [incomeCategories, expenseCategories]);

    const getAccountDetails = (accountId: string | null | undefined) => {
        if (!accountId) return null;
        return flattenedAccounts.find(a => a.id === accountId);
    };

    const getCategoryDetails = (categoryId: string | null | undefined) => {
        if (!categoryId) return null;
        return allCategories.find(c => c.id === categoryId);
    };

    if (!data || !data.incomesAfterMonthlyExpenses) return <div className="income-after-expenses__no-data">No hay datos disponibles.</div>;

    const { monthlyIncomes, monthlyExpenses, savings } = data.incomesAfterMonthlyExpenses;

    const formatCurrency = (amount: number | null | undefined) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2
        }).format(amount || 0);
    };

    const formatDate = (dayOfMonth: number | null | undefined) => {
        if (!dayOfMonth) return '-';
        // Construct a date to get the day name
        const date = new Date(year, month - 1, dayOfMonth);
        const dayName = date.toLocaleDateString('es-ES', { weekday: 'long' });
        return (
            <div className="income-after-expenses__date">
                <span className="income-after-expenses__day-name">{dayName}</span>
                <span className="income-after-expenses__full-date">{dayOfMonth}/{month}/{year}</span>
            </div>
        );
    };

    // Helper to render action buttons
    const renderActions = () => (
        <div className="income-after-expenses__actions">
            <button className="income-after-expenses__action-btn" title="Editar">
                <FontAwesomeIcon icon={faPenToSquare} />
            </button>
            <button className="income-after-expenses__action-btn income-after-expenses__action-btn--delete" title="Eliminar">
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

    return (
        <div className="income-after-expenses">
            {/* Monthly Incomes */}
            <BudgetSection title="Ingresos" total={monthlyIncomes?.total || 0}>
                <div className="income-after-expenses__table-container">
                    <table className="income-after-expenses__table">
                        <thead>
                            <tr>
                                <th className="income-after-expenses__th">Fecha</th>
                                <th className="income-after-expenses__th">Categoría</th>
                                <th className="income-after-expenses__th">Cuenta</th>
                                <th className="income-after-expenses__th">Cantidad</th>
                                <th className="income-after-expenses__th">Notas</th>
                                <th className="income-after-expenses__th" style={{ textAlign: 'center' }}>Aplicada</th>
                                <th className="income-after-expenses__th" style={{ textAlign: 'right' }}>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {monthlyIncomes?.items?.map((item) => {
                                const account = getAccountDetails(item.accountId);
                                const category = getCategoryDetails(item.categoryId);
                                return (
                                    <tr key={item.id} className="income-after-expenses__tr">
                                        <td className="income-after-expenses__td">{formatDate(item.dayOfMonth)}</td>
                                        <td className="income-after-expenses__td">
                                            <div className="income-after-expenses__category">
                                                {item.categoryName && (
                                                    <div
                                                        className="income-after-expenses__icon"
                                                        style={{ backgroundColor: category?.color || item.color || '#374151' }}
                                                    >
                                                        <FontAwesomeIcon icon={getIcon(category?.image || item.icon)} />
                                                    </div>
                                                )}
                                                <div className="income-after-expenses__category-info">
                                                    <div className="income-after-expenses__category-name">{item.categoryName || item.name}</div>
                                                    {item.subcategory && (
                                                        <div className="income-after-expenses__subcategory">{item.subcategory}</div>
                                                    )}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="income-after-expenses__td">
                                            <div className="income-after-expenses__account">
                                                {item.accountName && (
                                                    <div
                                                        className="income-after-expenses__icon"
                                                        style={{ backgroundColor: account?.color }}
                                                    >
                                                        <FontAwesomeIcon icon={getIcon(account?.image)} />
                                                    </div>
                                                )}
                                                <span>{item.accountName}</span>
                                            </div>
                                        </td>
                                        <td className="income-after-expenses__td income-after-expenses__amount income-after-expenses__amount--income">{formatCurrency(item.amount)}</td>
                                        <td className="income-after-expenses__td">
                                            <div className="income-after-expenses__notes" title={item.notes || ''}>
                                                {item.notes}
                                            </div>
                                        </td>
                                        <td className="income-after-expenses__td">{renderApplied(item.isApplied || false)}</td>
                                        <td className="income-after-expenses__td">{renderActions()}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </BudgetSection>

            {/* Monthly Expenses */}
            <BudgetSection title="Gastos mensuales" total={monthlyExpenses?.total || 0}>
                <div className="income-after-expenses__table-container">
                    <table className="income-after-expenses__table">
                        <thead>
                            <tr>
                                <th className="income-after-expenses__th">Fecha</th>
                                <th className="income-after-expenses__th">Categoría</th>
                                <th className="income-after-expenses__th">Cuenta</th>
                                <th className="income-after-expenses__th">Cantidad</th>
                                <th className="income-after-expenses__th">Notas</th>
                                <th className="income-after-expenses__th" style={{ textAlign: 'center' }}>Aplicada</th>
                                <th className="income-after-expenses__th" style={{ textAlign: 'right' }}>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {monthlyExpenses?.items?.map((item) => {
                                const account = getAccountDetails(item.accountId);
                                const category = getCategoryDetails(item.categoryId);
                                return (
                                    <tr key={item.id} className="income-after-expenses__tr">
                                        <td className="income-after-expenses__td">{formatDate(item.dayOfMonth)}</td>
                                        <td className="income-after-expenses__td">
                                            <div className="income-after-expenses__category">
                                                <div
                                                    className="income-after-expenses__icon"
                                                    style={{ backgroundColor: category?.color || item.color || '#374151' }}
                                                >
                                                    <FontAwesomeIcon icon={getIcon(category?.image || item.icon)} />
                                                </div>
                                                <div className="income-after-expenses__category-info">
                                                    <div className="income-after-expenses__category-name">{item.categoryName || item.name}</div>
                                                    {item.subcategory && (
                                                        <div className="income-after-expenses__subcategory">
                                                            <span>{item.subcategory}</span>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="income-after-expenses__td">
                                            <div className="income-after-expenses__account">
                                                {item.accountName && (
                                                    <div
                                                        className="income-after-expenses__icon"
                                                        style={{ backgroundColor: account?.color }}
                                                    >
                                                        <FontAwesomeIcon icon={getIcon(account?.image)} />
                                                    </div>
                                                )}
                                                <span>{item.accountName}</span>
                                            </div>
                                        </td>
                                        <td className="income-after-expenses__td income-after-expenses__amount income-after-expenses__amount--expense">{formatCurrency(item.amount)}</td>
                                        <td className="income-after-expenses__td">
                                            <div className="income-after-expenses__notes" title={item.notes || ''}>
                                                {item.notes}
                                            </div>
                                        </td>
                                        <td className="income-after-expenses__td">{renderApplied(item.isApplied || false)}</td>
                                        <td className="income-after-expenses__td">{renderActions()}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </BudgetSection>

            {/* Savings */}
            <BudgetSection title="Ahorros" total={savings?.total || 0}>
                <div className="income-after-expenses__table-container">
                    <table className="income-after-expenses__table">
                        <thead>
                            <tr>
                                <th className="income-after-expenses__th">Nombre</th>
                                <th className="income-after-expenses__th">Cantidad por mes</th>
                                <th className="income-after-expenses__th">Ahorrado</th>
                                <th className="income-after-expenses__th">Objetivo</th>
                                <th className="income-after-expenses__th">Restante</th>
                                <th className="income-after-expenses__th" style={{ textAlign: 'center' }}>Aplicada</th>
                                <th className="income-after-expenses__th" style={{ textAlign: 'right' }}>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {savings?.items?.map((item) => (
                                <tr key={item.id} className="income-after-expenses__tr">
                                    <td className="income-after-expenses__td">
                                        <div className="income-after-expenses__category">
                                            <div
                                                className="income-after-expenses__icon"
                                                style={{ backgroundColor: item.color || '#374151' }}
                                            >
                                                <FontAwesomeIcon icon={getIcon(item.icon)} />
                                            </div>
                                            <span className="income-after-expenses__category-name">{item.name}</span>
                                        </div>
                                    </td>
                                    <td className="income-after-expenses__td">{formatCurrency(item.amountPerMonth)}</td>
                                    <td className="income-after-expenses__td">{formatCurrency(item.savedAmount)}</td>
                                    <td className="income-after-expenses__td">{formatCurrency(item.goalAmount)}</td>
                                    <td className="income-after-expenses__td">
                                        {formatCurrency((item.goalAmount || 0) - (item.savedAmount || 0))}
                                    </td>
                                    <td className="income-after-expenses__td">{renderApplied(item.isApplied || false)}</td>
                                    <td className="income-after-expenses__td">{renderActions()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </BudgetSection>
        </div>
    );
};
