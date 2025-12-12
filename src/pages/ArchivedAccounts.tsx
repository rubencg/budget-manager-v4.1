import React, { useState } from 'react';
import { useArchivedAccountsQuery } from '../hooks/useArchivedAccountsQuery';
import { useAccountMutations } from '../hooks/useAccountMutations';
import { Account } from '../types';
import { Button } from '../components/ui/Button';
import { Modal } from '../components/ui/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faRotateLeft,
    faTrash,
    faMoneyCheck,
    faHandHoldingDollar,
    faWallet,
    faPiggyBank,
    faCreditCard,
    faSackDollar,
    faLandmark,
    faSort,
    faSortUp,
    faSortDown
} from '@fortawesome/free-solid-svg-icons';
import './ArchivedAccounts.css';

const iconMap: { [key: string]: any } = {
    'money-check': faMoneyCheck,
    'hand-holding-usd': faHandHoldingDollar,
    'wallet': faWallet,
    'piggy-bank': faPiggyBank,
    'credit-card': faCreditCard,
    'sack-dollar': faSackDollar,
    'landmark': faLandmark,
    'euro-sign': faSackDollar,
    'dollar-sign': faSackDollar,
    'default': faWallet
};

export const ArchivedAccounts: React.FC = () => {
    const [pageNumber, setPageNumber] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [sortBy, setSortBy] = useState<string | undefined>(undefined);
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc' | undefined>(undefined);
    const [deletingAccount, setDeletingAccount] = useState<Account | null>(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const { data, isLoading, error } = useArchivedAccountsQuery({
        pageNumber,
        pageSize,
        sortBy,
        sortDirection
    });

    const { restoreAccount, deleteAccount } = useAccountMutations();

    const handleSort = (field: string) => {
        if (sortBy === field) {
            // Toggle direction
            if (sortDirection === 'asc') {
                setSortDirection('desc');
            } else if (sortDirection === 'desc') {
                // Clear sorting
                setSortBy(undefined);
                setSortDirection(undefined);
            } else {
                setSortDirection('asc');
            }
        } else {
            // New field
            setSortBy(field);
            setSortDirection('asc');
        }
        setPageNumber(1); // Reset to first page
    };

    const getSortIcon = (field: string) => {
        if (sortBy !== field) return faSort;
        if (sortDirection === 'asc') return faSortUp;
        if (sortDirection === 'desc') return faSortDown;
        return faSort;
    };

    const handlePageSizeChange = (newSize: number) => {
        setPageSize(newSize);
        setPageNumber(1);
    };

    const handleRestore = async (account: Account) => {
        try {
            await restoreAccount.mutateAsync(account);
        } catch (error) {
            console.error('Failed to restore account:', error);
        }
    };

    const handleDeleteClick = (account: Account) => {
        setDeletingAccount(account);
        setIsDeleteModalOpen(true);
    };

    const confirmDelete = async () => {
        if (deletingAccount?.id) {
            try {
                await deleteAccount.mutateAsync(deletingAccount.id);
                setIsDeleteModalOpen(false);
                setDeletingAccount(null);
            } catch (error) {
                console.error('Failed to delete account:', error);
            }
        }
    };

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        }).format(amount);
    };

    if (error) {
        return <div className="archived-accounts-page__error">Error loading archived accounts: {error.message}</div>;
    }

    return (
        <div className="archived-accounts-page">
            <div className="archived-accounts-page__header">
                <h1 className="archived-accounts-page__title">Cuentas archivadas</h1>

                <div className="archived-accounts-page__controls">
                    <div className="archived-accounts-page__page-size">
                        <label>Mostrar:</label>
                        <select
                            value={pageSize}
                            onChange={(e) => handlePageSizeChange(Number(e.target.value))}
                        >
                            <option value={10}>10</option>
                            <option value={20}>20</option>
                            <option value={50}>50</option>
                        </select>
                    </div>
                </div>
            </div>

            {isLoading ? (
                <div className="archived-accounts-page__loading">
                    Cargando cuentas archivadas...
                </div>
            ) : data && data.data.length > 0 ? (
                <>
                    <div className="archived-accounts-table">
                        <div className="archived-accounts-table__header">
                            <div
                                className={`archived-accounts-table__header-cell ${sortBy === 'name' ? 'archived-accounts-table__header-cell--active' : ''}`}
                                onClick={() => handleSort('name')}
                            >
                                Nombre
                                <FontAwesomeIcon
                                    icon={getSortIcon('name')}
                                    className="archived-accounts-table__sort-icon"
                                />
                            </div>
                            <div
                                className={`archived-accounts-table__header-cell ${sortBy === 'accountType' ? 'archived-accounts-table__header-cell--active' : ''}`}
                                onClick={() => handleSort('accountType')}
                            >
                                Tipo
                                <FontAwesomeIcon
                                    icon={getSortIcon('accountType')}
                                    className="archived-accounts-table__sort-icon"
                                />
                            </div>
                            <div
                                className={`archived-accounts-table__header-cell ${sortBy === 'currentBalance' ? 'archived-accounts-table__header-cell--active' : ''}`}
                                onClick={() => handleSort('currentBalance')}
                            >
                                Balance
                                <FontAwesomeIcon
                                    icon={getSortIcon('currentBalance')}
                                    className="archived-accounts-table__sort-icon"
                                />
                            </div>
                            <div className="archived-accounts-table__header-cell">
                                Acciones
                            </div>
                        </div>

                        <div className="archived-accounts-table__body">
                            {data.data.map((account) => {
                                const icon = iconMap[account.image] || iconMap['default'];

                                return (
                                    <div key={account.id} className="archived-accounts-table__row">
                                        <div className="archived-accounts-table__cell archived-accounts-table__cell--name">
                                            <div
                                                className="archived-accounts-table__icon"
                                                style={{ backgroundColor: account.color }}
                                            >
                                                <FontAwesomeIcon icon={icon} />
                                            </div>
                                            <span>{account.name}</span>
                                        </div>
                                        <div className="archived-accounts-table__cell archived-accounts-table__cell--type">
                                            {account.accountType.name}
                                        </div>
                                        <div className="archived-accounts-table__cell archived-accounts-table__cell--balance">
                                            {formatCurrency(account.currentBalance)}
                                        </div>
                                        <div className="archived-accounts-table__cell archived-accounts-table__cell--actions">
                                            <button
                                                className="archived-accounts-table__action-btn"
                                                title="Restore"
                                                onClick={() => handleRestore(account)}
                                                disabled={restoreAccount.isPending}
                                            >
                                                <FontAwesomeIcon icon={faRotateLeft} size="sm" />
                                            </button>
                                            <button
                                                className="archived-accounts-table__action-btn"
                                                title="Delete"
                                                onClick={() => handleDeleteClick(account)}
                                            >
                                                <FontAwesomeIcon icon={faTrash} size="sm" />
                                            </button>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {data.totalPages > 1 && (
                        <div className="archived-accounts-page__pagination">
                            <Button
                                variant="secondary"
                                onClick={() => setPageNumber(p => Math.max(1, p - 1))}
                                disabled={!data.hasPreviousPage}
                            >
                                Anterior
                            </Button>
                            <span className="archived-accounts-page__pagination-info">
                                Página {data.pageNumber} de {data.totalPages}
                            </span>
                            <Button
                                variant="secondary"
                                onClick={() => setPageNumber(p => Math.min(data.totalPages, p + 1))}
                                disabled={!data.hasNextPage}
                            >
                                Siguiente
                            </Button>
                        </div>
                    )}
                </>
            ) : (
                <div className="archived-accounts-page__empty">
                    No hay cuentas archivadas
                </div>
            )}

            {/* Delete Confirmation Modal */}
            <Modal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                title="Eliminar cuenta"
            >
                <div style={{ padding: '1rem 0' }}>
                    <p style={{ marginBottom: '1.5rem', lineHeight: '1.6' }}>
                        ¿Estás seguro de que quieres eliminar permanentemente <strong>{deletingAccount?.name}</strong>?
                        Esta acción no se puede deshacer.
                    </p>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
                        <Button variant="secondary" onClick={() => setIsDeleteModalOpen(false)}>
                            CANCELAR
                        </Button>
                        <Button
                            variant="primary"
                            style={{ backgroundColor: 'var(--color-error)', borderColor: 'var(--color-error)' }}
                            onClick={confirmDelete}
                            disabled={deleteAccount.isPending}
                        >
                            {deleteAccount.isPending ? 'ELIMINANDO...' : 'ELIMINAR'}
                        </Button>
                    </div>
                </div>
            </Modal>
        </div>
    );
};
