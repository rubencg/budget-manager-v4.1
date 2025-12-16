import React from 'react';
import { BudgetSection } from './BudgetSection';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { IncomeAfterFixedExpensesDto } from '../../api-client';
import './IncomeAfterExpenses.css';

interface IncomeAfterExpensesProps {
    data: IncomeAfterFixedExpensesDto | undefined;
    year: number;
    month: number;
}

export const IncomeAfterExpenses: React.FC<IncomeAfterExpensesProps> = ({ data, year, month }) => {

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
        <div className="flex justify-center">
            <FontAwesomeIcon
                icon={faCheckCircle}
                className={`income-after-expenses__applied-icon ${!isApplied ? 'income-after-expenses__applied-icon--inactive' : ''}`}
            />
        </div>
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
                            {monthlyIncomes?.items?.map((item) => (
                                <tr key={item.id} className="income-after-expenses__tr">
                                    <td className="income-after-expenses__td">{formatDate(item.dayOfMonth)}</td>
                                    <td className="income-after-expenses__td">
                                        <div className="income-after-expenses__category">
                                            {item.categoryName && (
                                                <div className="income-after-expenses__icon">
                                                    {/* Placeholder for icon logic, can reuse existing icon logic */}
                                                    <span style={{ fontSize: '12px' }}>{item.categoryName.substring(0, 1)}</span>
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
                                            <div className="income-after-expenses__account-dot"></div>
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
                            ))}
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
                            {monthlyExpenses?.items?.map((item) => (
                                <tr key={item.id} className="income-after-expenses__tr">
                                    <td className="income-after-expenses__td">{formatDate(item.dayOfMonth)}</td>
                                    <td className="income-after-expenses__td">
                                        <div className="income-after-expenses__category">
                                            {/* Reuse Category Display Logic */}
                                            <div className="income-after-expenses__icon">
                                                <span>{item.categoryName ? item.categoryName.substring(0, 1) : 'G'}</span>
                                            </div>
                                            <div className="income-after-expenses__category-info">
                                                <div className="income-after-expenses__category-name">{item.categoryName || item.name}</div>
                                                {item.subcategory && (
                                                    <div className="income-after-expenses__subcategory">
                                                        <span>{item.categoryName}</span>
                                                        <span>»</span>
                                                        <span>{item.subcategory}</span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="income-after-expenses__td">
                                        <div className="income-after-expenses__account">
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
                            ))}
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
                                            {item.icon && (
                                                <div
                                                    className="income-after-expenses__icon"
                                                    style={{ backgroundColor: item.color || '#333' }}
                                                >
                                                    {/* Icon logic placeholder */}
                                                    <span>{item.icon.substring(0, 2)}</span>
                                                </div>
                                            )}
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
