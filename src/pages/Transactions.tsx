import React, { useState, useMemo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faChevronLeft,
    faChevronRight,
    faPlus,
    faFilter,
    faSearch,
    faPenToSquare,
    faTrash
} from '@fortawesome/free-solid-svg-icons';
import { findIconDefinition, IconPrefix, IconName } from '@fortawesome/fontawesome-svg-core';
import { useTransactionsQuery } from '../hooks/useTransactionsQuery';
import { useAccountsQuery } from '../hooks/useAccountsQuery';
import { useTransactionMutations } from '../hooks/useTransactionMutations';
import { TransferModal } from '../components/accounts/TransferModal';
import { TransactionModal } from '../components/transactions/TransactionModal';
import { MonthlyTransactionModal } from '../components/transactions/MonthlyTransactionModal';
import { PlannedExpenseModal } from '../components/planned-expenses/PlannedExpenseModal';
import { Modal } from '../components/ui/Modal';
import { Button } from '../components/ui/Button';
import { Transaction, TransactionType } from '../api-client';
import './Transactions.css';

const MONTHS = [
    'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
    'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
];

export const Transactions: React.FC = () => {
    const now = new Date();
    const [currentYear, setCurrentYear] = useState(now.getFullYear());
    const [currentMonth, setCurrentMonth] = useState(now.getMonth() + 1); // 1-based
    const [pageSize, setPageSize] = useState(50);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [isAddDropdownOpen, setIsAddDropdownOpen] = useState(false);
    const [isTransferModalOpen, setIsTransferModalOpen] = useState(false);
    const [isTransactionModalOpen, setIsTransactionModalOpen] = useState(false);
    const [transactionModalType, setTransactionModalType] = useState<TransactionType>(TransactionType.NUMBER_0);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [transactionToDelete, setTransactionToDelete] = useState<string | null>(null);
    const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);
    const [isMonthlyTransactionModalOpen, setIsMonthlyTransactionModalOpen] = useState(false);
    const [isPlannedExpenseModalOpen, setIsPlannedExpenseModalOpen] = useState(false);
    const dropdownRef = React.useRef<HTMLDivElement>(null);

    const { data, isLoading, error } = useTransactionsQuery(currentYear, currentMonth);
    const { data: accountGroups } = useAccountsQuery();
    const { deleteTransaction } = useTransactionMutations();

    React.useEffect(() => {
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

    const handleOpenTransactionModal = (type: TransactionType) => {
        setEditingTransaction(null); // Ensure not editing
        setTransactionModalType(type);
        setIsTransactionModalOpen(true);
        setIsAddDropdownOpen(false);
    };

    const handleEditClick = (transaction: Transaction) => {
        setEditingTransaction(transaction);
        if (transaction.transactionType === TransactionType.NUMBER_2) {
            setIsTransferModalOpen(true);
        } else if (transaction.transactionType !== undefined) {
            setTransactionModalType(transaction.transactionType);
            setIsTransactionModalOpen(true);
        }
    };

    const handleDeleteClick = (transactionId: string) => {
        setTransactionToDelete(transactionId);
        setIsDeleteModalOpen(true);
    };

    const confirmDelete = async () => {
        if (transactionToDelete) {
            try {
                await deleteTransaction.mutateAsync(transactionToDelete);
                setIsDeleteModalOpen(false);
                setTransactionToDelete(null);
            } catch (error) {
                console.error('Failed to delete transaction:', error);
            }
        }
    };

    const handlePreviousMonth = () => {
        if (currentMonth === 1) {
            setCurrentMonth(12);
            setCurrentYear(currentYear - 1);
        } else {
            setCurrentMonth(currentMonth - 1);
        }
        setCurrentPage(1);
    };

    const handleNextMonth = () => {
        if (currentMonth === 12) {
            setCurrentMonth(1);
            setCurrentYear(currentYear + 1);
        } else {
            setCurrentMonth(currentMonth + 1);
        }
        setCurrentPage(1);
    };

    const getIcon = (iconName: string | null | undefined) => {
        const prefix: IconPrefix = 'fas';
        const icon = iconName ? findIconDefinition({ prefix, iconName: iconName as any }) : null;
        return icon || ['fas', 'question-circle'] as [IconPrefix, IconName];
    };

    const getTransactionColor = (type: TransactionType | undefined) => {
        switch (type) {
            case TransactionType.NUMBER_0: // Expense
                return 'var(--color-error)';
            case TransactionType.NUMBER_1: // Income
                return 'var(--color-success)';
            case TransactionType.NUMBER_2: // Transfer
                return '#1E90FF';
            case TransactionType.NUMBER_3: // MonthlyExpense
                return '#FFD700';
            case TransactionType.NUMBER_4: // MonthlyIncome
                return '#006400';
            default:
                return 'inherit';
        }
    };

    const formatAmount = (amount: number | undefined) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2
        }).format(amount || 0);
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

    const filteredTransactions = useMemo(() => {
        const transactions = data?.data || [];
        if (!searchTerm) {
            return transactions;
        }
        const lowerCaseSearchTerm = searchTerm.toLowerCase();

        return transactions.filter(transaction => {
            const searchFields = [
                transaction.amount,
                transaction.toAccountName,
                transaction.fromAccountName,
                transaction.accountName,
                transaction.categoryName,
                transaction.subcategory,
                transaction.notes
            ];

            return searchFields.some(value => {
                if (value === null || typeof value === 'undefined') {
                    return false;
                }
                return String(value).toLowerCase().includes(lowerCaseSearchTerm);
            });
        });
    }, [data?.data, searchTerm]);

    // Paginate transactions
    const paginatedTransactions = useMemo(() => {
        const startIndex = (currentPage - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        return filteredTransactions.slice(startIndex, endIndex);
    }, [filteredTransactions, currentPage, pageSize]);

    const totalPages = Math.ceil((filteredTransactions.length || 0) / pageSize);

    const renderAccountInfo = (transaction: Transaction) => {
        if (transaction.transactionType === TransactionType.NUMBER_2) {
            // Transfer
            return (
                <div className="transactions-table__transfer">
                    <span>{transaction.fromAccountName}</span>
                    <FontAwesomeIcon icon={faChevronRight} className="transactions-table__transfer-arrow" />
                    <span>{transaction.toAccountName}</span>
                </div>
            );
        }
        return transaction.accountName;
    };

    if (error) {
        return (
            <div className="transactions-page">
                <div className="transactions-page__error">
                    Error loading transactions: {error.message}
                </div>
            </div>
        );
    }

    return (
        <div className="transactions-page">
            <div className="transactions-page__header">
                <div className="transactions-page__month-nav">
                    <button
                        className="transactions-page__month-btn"
                        onClick={handlePreviousMonth}
                        title="Previous Month"
                    >
                        <FontAwesomeIcon icon={faChevronLeft} />
                    </button>
                    <div className="transactions-page__month-display">
                        {MONTHS[currentMonth - 1]} {currentYear}
                    </div>
                    <button
                        className="transactions-page__month-btn"
                        onClick={handleNextMonth}
                        title="Next Month"
                    >
                        <FontAwesomeIcon icon={faChevronRight} />
                    </button>
                </div>

                <div className="transactions-page__actions">
                    <div className="transactions-page__search-container">
                        <FontAwesomeIcon icon={faSearch} className="transactions-page__search-icon" />
                        <input
                            type="text"
                            placeholder="Buscar..."
                            className="transactions-page__search-input"
                            value={searchTerm}
                            onChange={(e) => {
                                setSearchTerm(e.target.value);
                                setCurrentPage(1);
                            }}
                        />
                    </div>
                    <div className="transactions-page__add-container" ref={dropdownRef}>
                        <button
                            className="transactions-page__action-btn"
                            title="Add Transaction"
                            onClick={() => setIsAddDropdownOpen(!isAddDropdownOpen)}
                        >
                            <FontAwesomeIcon icon={faPlus} />
                            Agregar
                        </button>
                        {isAddDropdownOpen && (
                            <div className="transactions-page__add-dropdown">
                                <button
                                    className="transactions-page__add-option transactions-page__add-option--divider"
                                    onClick={() => handleOpenTransactionModal(TransactionType.NUMBER_1)}
                                >
                                    Agregar ingreso
                                </button>
                                <button
                                    className="transactions-page__add-option"
                                    onClick={() => handleOpenTransactionModal(TransactionType.NUMBER_0)}
                                >
                                    Agregar gasto
                                </button>
                                <button
                                    className="transactions-page__add-option"
                                    onClick={() => {
                                        setEditingTransaction(null); // Ensure not editing
                                        setIsAddDropdownOpen(false);
                                        setIsTransferModalOpen(true);
                                    }}
                                >
                                    Agregar transferencia
                                </button>
                                <button className="transactions-page__add-option" onClick={() => {
                                    setIsAddDropdownOpen(false);
                                    setIsMonthlyTransactionModalOpen(true);
                                }}>
                                    Agregar transacción mensual
                                </button>
                                <button className="transactions-page__add-option" onClick={() => {
                                    setIsAddDropdownOpen(false);
                                    setIsPlannedExpenseModalOpen(true);
                                }}>
                                    Agregar gasto planeado
                                </button>
                                <button className="transactions-page__add-option" onClick={() => setIsAddDropdownOpen(false)}>
                                    Agregar ahorro
                                </button>
                            </div>
                        )}
                    </div>
                    <label className="transactions-page__toggle" style={{ display: 'none' }}>
                        {/* Removed: Mostrar transacciones no aplicadas */}
                    </label>
                </div>
            </div>

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
                        <option value={100}>100</option>
                    </select>
                </div>
            </div>

            {isLoading ? (
                <div className="transactions-page__loading">
                    Cargando transacciones...
                </div>
            ) : (
                <>
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
                            {paginatedTransactions.length === 0 ? (
                                <div className="transactions-page__empty">
                                    No hay transacciones para este mes
                                </div>
                            ) : (
                                paginatedTransactions.map((transaction) => (
                                    <div key={transaction.id} className="transactions-table__row">
                                        <div className="transactions-table__cell transactions-table__cell--date">
                                            {formatDate(transaction.date)}
                                        </div>
                                        <div className="transactions-table__cell transactions-table__cell--category">
                                            {transaction.categoryName && (
                                                <>
                                                    <div
                                                        className="transactions-table__category-icon"
                                                        style={{ backgroundColor: transaction.categoryColor || '#cccccc' }}
                                                    >
                                                        <FontAwesomeIcon icon={getIcon(transaction.categoryImage)} />
                                                    </div>
                                                    <div className="transactions-table__category-text">
                                                        <div className="transactions-table__category-name">
                                                            {transaction.categoryName}
                                                        </div>
                                                        {transaction.subcategory && (
                                                            <div className="transactions-table__category-subcategory">
                                                                {transaction.subcategory}
                                                            </div>
                                                        )}
                                                    </div>
                                                </>
                                            )}
                                            {!transaction.categoryName && transaction.transactionType === TransactionType.NUMBER_2 && (
                                                <div className="transactions-table__category-name">Transferencia</div>
                                            )}
                                        </div>
                                        <div className="transactions-table__cell transactions-table__cell--account">
                                            {renderAccountInfo(transaction)}
                                        </div>
                                        <div
                                            className="transactions-table__cell transactions-table__cell--amount"
                                            style={{ color: getTransactionColor(transaction.transactionType) }}
                                        >
                                            {formatAmount(transaction.amount)}
                                        </div>
                                        <div className="transactions-table__cell transactions-table__cell--notes">
                                            {transaction.notes}
                                        </div>
                                        <div className="transactions-table__cell transactions-table__cell--actions">
                                            <button
                                                className="transactions-table__action-btn"
                                                title="Edit"
                                                onClick={() => handleEditClick(transaction)}
                                            >
                                                <FontAwesomeIcon icon={faPenToSquare} />
                                            </button>
                                            <button
                                                className="transactions-table__action-btn"
                                                title="Delete"
                                                onClick={() => handleDeleteClick(transaction.id || '')}
                                            >
                                                <FontAwesomeIcon icon={faTrash} />
                                            </button>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>

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
                </>
            )}
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
            <Modal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                title="Eliminar Transacción"
            >
                <div style={{ padding: '1rem 0' }}>
                    <p>¿Estás seguro de que quieres eliminar esta transacción? Esta acción no se puede deshacer.</p>
                </div>
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1rem' }}>
                    <Button variant="secondary" onClick={() => setIsDeleteModalOpen(false)}>
                        CANCELAR
                    </Button>
                    <Button
                        variant="primary"
                        onClick={confirmDelete}
                        style={{ background: 'var(--color-error)' }}
                    >
                        ELIMINAR
                    </Button>
                </div>
            </Modal>
        </div>
    );
};
