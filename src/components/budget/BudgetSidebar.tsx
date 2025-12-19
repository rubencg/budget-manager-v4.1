import React from 'react';
import './BudgetSidebar.css';

interface BudgetSidebarProps {
    totalAvailable: number;
    dailyAvailable: number;
    plannedExpensesTotal?: number;
    otherExpensesTotal?: number;
    grandTotal: number;
    activeTab: 'incomeAfterExpenses' | 'plannedExpenses' | 'otherExpenses';
    onTabChange: (tab: 'incomeAfterExpenses' | 'plannedExpenses' | 'otherExpenses') => void;
}

export const BudgetSidebar: React.FC<BudgetSidebarProps> = ({
    totalAvailable,
    dailyAvailable,
    plannedExpensesTotal = 0,
    otherExpensesTotal = 0,
    grandTotal,
    activeTab,
    onTabChange
}) => {

    // Helper to format currency
    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2
        }).format(amount);
    };

    return (
        <div className="budget-sidebar">
            {/* Navigation & Summary Combined */}
            <div className="budget-sidebar__nav-list">
                <div
                    className={`budget-sidebar__nav-item ${activeTab === 'incomeAfterExpenses' ? 'active' : ''}`}
                    onClick={() => onTabChange('incomeAfterExpenses')}
                >
                    <div className="budget-sidebar__amount">{formatCurrency(totalAvailable)}</div>
                    <div className="budget-sidebar__sub-amount" style={{ color: '#4ade80' }}>
                        Ingresos despues de gastos mensuales
                    </div>
                </div>

                <div
                    className={`budget-sidebar__nav-item ${activeTab === 'plannedExpenses' ? 'active' : ''}`}
                    onClick={() => onTabChange('plannedExpenses')}
                >
                    <div className="budget-sidebar__amount">{formatCurrency(plannedExpensesTotal  * -1)}</div>
                    <div className="budget-sidebar__sub-amount" style={{ color: '#f87171', opacity: activeTab === 'plannedExpenses' ? 1 : 0.7 }}>
                        Gastos planeados
                    </div>
                </div>

                <div
                    className={`budget-sidebar__nav-item ${activeTab === 'otherExpenses' ? 'active' : ''}`}
                    onClick={() => onTabChange('otherExpenses')}
                >
                    <div className="budget-sidebar__amount">{formatCurrency(otherExpensesTotal * -1)}</div>
                    <div className="budget-sidebar__sub-amount" style={{ color: '#f87171', opacity: activeTab === 'otherExpenses' ? 1 : 0.7 }}>
                        Otros gastos
                    </div>
                </div>
            </div>

            {/* Daily Available */}
            <div className="budget-sidebar__summary">
                <div className="budget-sidebar__amount">{formatCurrency(grandTotal)}</div>
                <div className="budget-sidebar__label">disponible</div>
                <div className="budget-sidebar__sub-amount">({formatCurrency(dailyAvailable)} por día)</div>
            </div>

            {/* Placeholder Chart */}
            <div className="budget-sidebar__chart">
                <div className="budget-sidebar__chart-placeholder">
                    Chart Area Placeholder
                </div>
            </div>
        </div>
    );
};
