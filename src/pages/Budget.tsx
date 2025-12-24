import React, { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight, faPlus } from '@fortawesome/free-solid-svg-icons';
import { BudgetSidebar } from '../components/budget/BudgetSidebar';
import { IncomeAfterExpenses } from '../components/budget/IncomeAfterExpenses';
import { PlannedExpensesView } from '../components/budget/PlannedExpensesView';
import { OtherExpensesView } from '../components/budget/OtherExpensesView';
import { useBudgetQuery } from '../hooks/useBudgetQuery';
import { useBudgetPlannedExpensesQuery } from '../hooks/useBudgetPlannedExpensesQuery';
import { useBudgetOtherExpensesQuery } from '../hooks/useBudgetOtherExpensesQuery';
import { useAccountsQuery } from '../hooks/useAccountsQuery';
import { TransferModal } from '../components/accounts/TransferModal';
import { TransactionModal } from '../components/transactions/TransactionModal';
import { MonthlyTransactionModal } from '../components/transactions/MonthlyTransactionModal';
import { PlannedExpenseModal } from '../components/planned-expenses/PlannedExpenseModal';
import { SavingsModal } from '../components/savings/SavingsModal';
import { TransactionType, Transaction } from '../api-client';
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

    // Modal & Dropdown States
    const [isAddDropdownOpen, setIsAddDropdownOpen] = useState(false);
    const [isTransferModalOpen, setIsTransferModalOpen] = useState(false);
    const [isTransactionModalOpen, setIsTransactionModalOpen] = useState(false);
    const [transactionModalType, setTransactionModalType] = useState<TransactionType>(TransactionType.NUMBER_0);
    const [isMonthlyTransactionModalOpen, setIsMonthlyTransactionModalOpen] = useState(false);
    const [isPlannedExpenseModalOpen, setIsPlannedExpenseModalOpen] = useState(false);
    const [isSavingsModalOpen, setIsSavingsModalOpen] = useState(false);
    const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);

    const desktopDropdownRef = useRef<HTMLDivElement>(null);
    const mobileDropdownRef = useRef<HTMLDivElement>(null);

    const { data, isLoading, error } = useBudgetQuery(currentYear, currentMonth);
    const {
        data: plannedExpensesData,
        isLoading: isPlannedLoading,
        error: plannedError
    } = useBudgetPlannedExpensesQuery(currentYear, currentMonth);

    const {
        data: otherExpensesData,
        isLoading: isOtherLoading,
        error: otherError
    } = useBudgetOtherExpensesQuery(currentYear, currentMonth);

    const { data: accountGroups } = useAccountsQuery();

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as Node;
            const isOutsideDesktop = !desktopDropdownRef.current || !desktopDropdownRef.current.contains(target);
            const isOutsideMobile = !mobileDropdownRef.current || !mobileDropdownRef.current.contains(target);

            if (isOutsideDesktop && isOutsideMobile) {
                setIsAddDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

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

    const handleOpenTransactionModal = (type: TransactionType) => {
        setEditingTransaction(null);
        setTransactionModalType(type);
        setIsTransactionModalOpen(true);
        setIsAddDropdownOpen(false);
    };

    const incomeTotal = data?.incomesAfterMonthlyExpenses?.total || 0;
    const plannedTotal = plannedExpensesData?.total || 0;
    const otherTotal = otherExpensesData?.total || 0;
    const grandTotal = incomeTotal - plannedTotal - otherTotal;

    const daysInMonth = new Date(currentYear, currentMonth, 0).getDate();
    const isCurrentMonth = currentYear === now.getFullYear() && currentMonth === now.getMonth() + 1;
    const isPastMonth = currentYear < now.getFullYear() || (currentYear === now.getFullYear() && currentMonth < now.getMonth() + 1);

    let remainingDays = 0;
    if (isCurrentMonth) {
        remainingDays = daysInMonth - now.getDate() + 1;
    } else if (isPastMonth) {
        remainingDays = 1;
    } else {
        remainingDays = daysInMonth;
    }

    const dailyAvailable = remainingDays > 0 && grandTotal > 0 ? grandTotal / remainingDays : 0;

    return (
        <div className="budget-page">
            {/* Header / Month Navigation */}
            <div className="budget-page__header">
                <div className="budget-page__actions">
                    <button
                        className="budget-page__month-btn"
                        onClick={handlePreviousMonth}
                        title="Previous Month"
                    >
                        <FontAwesomeIcon icon={faChevronLeft} />
                    </button>
                    <div className="budget-page__title">
                        <span className="capitalize">{MONTHS[currentMonth - 1]} {currentYear}</span>
                    </div>
                    <button
                        className="budget-page__month-btn"
                        onClick={handleNextMonth}
                        title="Next Month"
                    >
                        <FontAwesomeIcon icon={faChevronRight} />
                    </button>
                </div>

                <div className="budget-page__actions">
                    <div className="budget-page__add-container" ref={desktopDropdownRef}>
                        <button
                            className="budget-page__action-btn"
                            title="Add"
                            onClick={() => setIsAddDropdownOpen(!isAddDropdownOpen)}
                        >
                            <FontAwesomeIcon icon={faPlus} />
                            Agregar
                        </button>
                        {isAddDropdownOpen && (
                            <div className="budget-page__add-dropdown">
                                <button
                                    className="budget-page__add-option budget-page__add-option--divider"
                                    onClick={() => handleOpenTransactionModal(TransactionType.NUMBER_1)}
                                >
                                    Agregar ingreso
                                </button>
                                <button
                                    className="budget-page__add-option"
                                    onClick={() => handleOpenTransactionModal(TransactionType.NUMBER_0)}
                                >
                                    Agregar gasto
                                </button>
                                <button
                                    className="budget-page__add-option"
                                    onClick={() => {
                                        setEditingTransaction(null);
                                        setIsAddDropdownOpen(false);
                                        setIsTransferModalOpen(true);
                                    }}
                                >
                                    Agregar transferencia
                                </button>
                                <button className="budget-page__add-option" onClick={() => {
                                    setIsAddDropdownOpen(false);
                                    setIsMonthlyTransactionModalOpen(true);
                                }}>
                                    Agregar transacción mensual
                                </button>
                                <button className="budget-page__add-option" onClick={() => {
                                    setIsAddDropdownOpen(false);
                                    setIsPlannedExpenseModalOpen(true);
                                }}>
                                    Agregar gasto planeado
                                </button>
                                <button className="budget-page__add-option" onClick={() => {
                                    setIsAddDropdownOpen(false);
                                    setIsSavingsModalOpen(true);
                                }}>
                                    Agregar ahorro
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="budget-page__content">
                {/* Sidebar */}
                <BudgetSidebar
                    totalAvailable={incomeTotal}
                    dailyAvailable={dailyAvailable}
                    plannedExpensesTotal={plannedTotal}
                    otherExpensesTotal={otherTotal}
                    grandTotal={grandTotal}
                    activeTab={activeTab}
                    onTabChange={setActiveTab}
                />


                {/* Mobile Controls (Date + Add) - Visible only on mobile */}
                <div className="budget-page__mobile-controls">
                    <div className="budget-page__mobile-month-nav">
                        <button
                            className="budget-page__month-btn"
                            onClick={handlePreviousMonth}
                            title="Previous Month"
                        >
                            <FontAwesomeIcon icon={faChevronLeft} />
                        </button>
                        <span className="capitalize">{MONTHS[currentMonth - 1]} {currentYear}</span>
                        <button
                            className="budget-page__month-btn"
                            onClick={handleNextMonth}
                            title="Next Month"
                        >
                            <FontAwesomeIcon icon={faChevronRight} />
                        </button>
                    </div>

                    <div className="budget-page__add-container" ref={mobileDropdownRef}>
                        <button
                            className="budget-page__action-btn"
                            title="Add"
                            onClick={() => setIsAddDropdownOpen(!isAddDropdownOpen)}
                        >
                            <FontAwesomeIcon icon={faPlus} />
                            Agregar
                        </button>
                        {isAddDropdownOpen && (
                            <div className="budget-page__add-dropdown">
                                <button
                                    className="budget-page__add-option budget-page__add-option--divider"
                                    onClick={() => handleOpenTransactionModal(TransactionType.NUMBER_1)}
                                >
                                    Agregar ingreso
                                </button>
                                <button
                                    className="budget-page__add-option"
                                    onClick={() => handleOpenTransactionModal(TransactionType.NUMBER_0)}
                                >
                                    Agregar gasto
                                </button>
                                <button
                                    className="budget-page__add-option"
                                    onClick={() => {
                                        setEditingTransaction(null);
                                        setIsAddDropdownOpen(false);
                                        setIsTransferModalOpen(true);
                                    }}
                                >
                                    Agregar transferencia
                                </button>
                                <button className="budget-page__add-option" onClick={() => {
                                    setIsAddDropdownOpen(false);
                                    setIsMonthlyTransactionModalOpen(true);
                                }}>
                                    Agregar transacción mensual
                                </button>
                                <button className="budget-page__add-option" onClick={() => {
                                    setIsAddDropdownOpen(false);
                                    setIsPlannedExpenseModalOpen(true);
                                }}>
                                    Agregar gasto planeado
                                </button>
                                <button className="budget-page__add-option" onClick={() => {
                                    setIsAddDropdownOpen(false);
                                    setIsSavingsModalOpen(true);
                                }}>
                                    Agregar ahorro
                                </button>
                            </div>
                        )}
                    </div>
                </div>

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
                        <PlannedExpensesView
                            data={plannedExpensesData}
                            isLoading={isPlannedLoading}
                            error={plannedError}
                            year={currentYear}
                            month={currentMonth}
                        />
                    )}
                    {activeTab === 'otherExpenses' && (
                        <OtherExpensesView
                            data={otherExpensesData}
                            isLoading={isOtherLoading}
                            error={otherError}
                            year={currentYear}
                            month={currentMonth}
                        />
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

            {/* Modals */}
            <TransferModal
                isOpen={isTransferModalOpen}
                onClose={() => {
                    setIsTransferModalOpen(false);
                    setEditingTransaction(null);
                }}
                accounts={accountGroups?.flatMap(group => group.accounts) || []}
                transaction={editingTransaction}
            />
            <TransactionModal
                isOpen={isTransactionModalOpen}
                onClose={() => {
                    setIsTransactionModalOpen(false);
                    setEditingTransaction(null);
                }}
                type={transactionModalType}
                accounts={accountGroups?.flatMap(group => group.accounts) || []}
                transaction={editingTransaction}
            />
            <MonthlyTransactionModal
                isOpen={isMonthlyTransactionModalOpen}
                onClose={() => setIsMonthlyTransactionModalOpen(false)}
                accounts={accountGroups?.flatMap(group => group.accounts) || []}
            />
            <PlannedExpenseModal
                isOpen={isPlannedExpenseModalOpen}
                onClose={() => setIsPlannedExpenseModalOpen(false)}
            />
            <SavingsModal
                isOpen={isSavingsModalOpen}
                onClose={() => setIsSavingsModalOpen(false)}
            />
        </div>
    );
};
