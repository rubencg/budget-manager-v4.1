import React from 'react';
import './BudgetSidebar.css';

interface BudgetSidebarProps {
    totalAvailable: number;
    dailyAvailable: number;
    activeTab: 'incomeAfterExpenses' | 'plannedExpenses' | 'otherExpenses';
    onTabChange: (tab: 'incomeAfterExpenses' | 'plannedExpenses' | 'otherExpenses') => void;
}

export const BudgetSidebar: React.FC<BudgetSidebarProps> = ({
    totalAvailable,
    dailyAvailable,
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
            {/* Total Available Summary */}
            <div className="budget-sidebar__summary">
                <div className="budget-sidebar__amount-row">
                    <div className="budget-sidebar__amount">{formatCurrency(totalAvailable)}</div>
                    <div className="budget-sidebar__sub-amount" style={{ color: '#4ade80' }}>Ingresos despues de gastos mensuales</div>
                </div>
                <div className="budget-sidebar__amount-row">
                    <div className="budget-sidebar__amount">{formatCurrency(0)}</div>
                    <div className="budget-sidebar__sub-amount" style={{ color: '#f87171', opacity: 0.5 }}>Gastos planeados</div>
                </div>
                <div className="budget-sidebar__amount-row">
                    <div className="budget-sidebar__amount">{formatCurrency(0)}</div>
                    <div className="budget-sidebar__sub-amount" style={{ color: '#f87171', opacity: 0.5 }}>Otros gastos</div>
                </div>
            </div>

            {/* Daily Available */}
            <div className="budget-sidebar__summary">
                <div className="budget-sidebar__label">disponible</div>
                <div className="budget-sidebar__sub-amount">({formatCurrency(dailyAvailable)} por día)</div>
            </div>

            {/* Navigation Tabs */}
            <nav className="budget-sidebar__nav">
                <button
                    className={`budget-sidebar__nav-item ${activeTab === 'incomeAfterExpenses' ? 'active' : ''}`}
                    onClick={() => onTabChange('incomeAfterExpenses')}
                >
                    Ingresos despues de gastos mensuales
                </button>
                <button
                    className={`budget-sidebar__nav-item ${activeTab === 'plannedExpenses' ? 'active' : ''}`}
                    onClick={() => onTabChange('plannedExpenses')}
                >
                    Gastos planeados
                </button>
                <button
                    className={`budget-sidebar__nav-item ${activeTab === 'otherExpenses' ? 'active' : ''}`}
                    onClick={() => onTabChange('otherExpenses')}
                >
                    Otros gastos
                </button>
            </nav>

            {/* Placeholder Chart */}
            <div className="budget-sidebar__chart">
                <div className="budget-sidebar__chart-placeholder">
                    Chart Area Placeholder
                </div>
            </div>
        </div>
    );
};
