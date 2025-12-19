import React from 'react';
import { ResponsivePie } from '@nivo/pie';
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

    const chartData = [
        {
            id: 'Gastos planeados',
            label: 'Gastos planeados',
            value: plannedExpensesTotal,
            color: '#a855f7' // Purple
        },
        {
            id: 'Otros',
            label: 'Otros',
            value: otherExpensesTotal,
            color: '#ec4899' // Pink
        },
        {
            id: 'Disponible',
            label: 'Disponible',
            value: Math.max(0, grandTotal),
            color: '#4ade80' // Green
        }
    ];

    // Check if there is data to show, otherwise show grey ring
    const hasData = chartData.some(d => d.value > 0);
    const finalData = hasData ? chartData : [{ id: 'Empty', value: 1, color: '#333' }];

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
                    <div className="budget-sidebar__amount">{formatCurrency(plannedExpensesTotal * -1)}</div>
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

            {/* Chart */}
            <div className="budget-sidebar__chart" style={{ padding: '0 20px 20px', height: 'auto', display: 'flex', flexDirection: 'column' }}>
                <div style={{ height: '120px', width: '100%' }}>
                    <ResponsivePie
                        data={finalData}
                        margin={{ top: 0, right: 10, bottom: 0, left: 10 }}
                        startAngle={-90}
                        endAngle={90}
                        innerRadius={0.6}
                        padAngle={1}
                        cornerRadius={3}
                        activeOuterRadiusOffset={8}
                        colors={{ datum: 'data.color' }}
                        borderWidth={0}
                        enableArcLinkLabels={false}
                        enableArcLabels={false}
                        isInteractive={hasData}
                        tooltip={({ datum }) => (
                            <div style={{ color: '#fff', background: '#333', padding: '5px 10px', borderRadius: '4px', fontSize: '12px', border: `1px solid ${datum.color}` }}>
                                <strong>{datum.label}</strong>: {formatCurrency(datum.value)}
                            </div>
                        )}
                    />
                </div>

                {/* Custom Legend */}
                <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '8px', paddingLeft: '10px' }}>
                    {chartData.map(item => (
                        <div key={item.id} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px' }}>
                            <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: item.color }}></div>
                            <span style={{ color: '#e5e5e5' }}>{item.label}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
