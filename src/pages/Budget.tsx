import React, { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight, faPlus } from '@fortawesome/free-solid-svg-icons';
import { BudgetSidebar } from '../components/budget/BudgetSidebar';
import { IncomeAfterExpenses } from '../components/budget/IncomeAfterExpenses';
import { useBudgetQuery } from '../hooks/useBudgetQuery';
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

    const dropdownRef = useRef<HTMLDivElement>(null);

    const { data, isLoading, error } = useBudgetQuery(currentYear, currentMonth);
    const { data: accountGroups } = useAccountsQuery();

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
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
                    <div className="budget-page__add-container" ref={dropdownRef}>
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
                    totalAvailable={data?.incomesAfterMonthlyExpenses?.total || 0}
                    dailyAvailable={184.35}
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
