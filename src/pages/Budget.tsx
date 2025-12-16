import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight, faPlus } from '@fortawesome/free-solid-svg-icons';
import { BudgetSidebar } from '../components/budget/BudgetSidebar';
import { IncomeAfterExpenses } from '../components/budget/IncomeAfterExpenses';
import { useBudgetQuery } from '../hooks/useBudgetQuery';
import './Budget.css';

const MONTHS = [
    'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
    'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
];

export const Budget: React.FC = () => {
    const now = new Date();
    const [currentYear, setCurrentYear] = useState(now.getFullYear());
    const [currentMonth, setCurrentMonth] = useState(now.getMonth() + 1); // 1-based
    const [activeTab, setActiveTab] = useState<'incomeAfterExpenses' | 'plannedExpenses' | 'otherExpenses'>('incomeAfterExpenses');

    const { data, isLoading, error } = useBudgetQuery(currentYear, currentMonth);

    const handlePreviousMonth = () => {
        if (currentMonth === 1) {
            setCurrentMonth(12);
            setCurrentYear(currentYear - 1);
        } else {
            setCurrentMonth(currentMonth - 1);
        }
    };

    const handleNextMonth = () => {
        if (currentMonth === 12) {
            setCurrentMonth(1);
            setCurrentYear(currentYear + 1);
        } else {
            setCurrentMonth(currentMonth + 1);
        }
    };

    return (
        <div className="budget-page">
            {/* Header / Month Navigation */}
            <div className="budget-page__header">
                <div className="budget-page__title">
                    <span className="capitalize">{MONTHS[currentMonth - 1]} {currentYear}</span>
                </div>
                <div className="budget-page__actions">
                    <button
                        className="budget-page__action-btn"
                        onClick={() => { }} // Placeholder for add
                        title="Add"
                    >
                        <FontAwesomeIcon icon={faPlus} />
                    </button>
                    <button
                        className="budget-page__action-btn"
                        onClick={handlePreviousMonth}
                        title="Previous Month"
                    >
                        <FontAwesomeIcon icon={faChevronLeft} />
                    </button>
                    <button
                        className="budget-page__action-btn"
                        onClick={handleNextMonth}
                        title="Next Month"
                    >
                        <FontAwesomeIcon icon={faChevronRight} />
                    </button>
                </div>
            </div>

            <div className="budget-page__content">
                {/* Sidebar */}
                <BudgetSidebar
                    totalAvailable={data?.incomesAfterMonthlyExpenses?.total || 0} // Using the total as available for now or based on image logic
                    dailyAvailable={184.35} // Placeholder as calc logic for days is not specified fully
                    activeTab={activeTab}
                    onTabChange={setActiveTab}
                />

                {/* Main Content */}
                <div className="budget-page__main">
                    {activeTab === 'incomeAfterExpenses' && (
                        <IncomeAfterExpenses
                            year={currentYear}
                            month={currentMonth}
                            data={data}
                        />
                    )}
                    {activeTab === 'plannedExpenses' && (
                        <div className="text-white p-4">Gastos planeados content placeholder</div>
                    )}
                    {activeTab === 'otherExpenses' && (
                        <div className="text-white p-4">Otros gastos content placeholder</div>
                    )}
                </div>
            </div>

            {(isLoading) && (
                <div className="budget-page__loader">
                    <div className="bg-slate-800 p-4 rounded text-white">Cargando...</div>
                </div>
            )}

            {error && (
                <div className="budget-page__error">
                    Error: {error.message}
                </div>
            )}
        </div>
    );
};
