import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAccountsQuery } from '../hooks/useAccountsQuery';
import { useAccountMutations } from '../hooks/useAccountMutations';
import { AccountGroupCard } from '../components/accounts/AccountGroupCard';
import { AccountModal } from '../components/accounts/AccountModal';
import { Modal } from '../components/ui/Modal';
import { Button } from '../components/ui/Button';
import { Account } from '../types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faRightLeft, faBoxArchive } from '@fortawesome/free-solid-svg-icons';
import './Accounts.css';

export const Accounts: React.FC = () => {
    const navigate = useNavigate();
    const { data: accountGroups, isLoading, error } = useAccountsQuery();
    const { archiveAccount } = useAccountMutations();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingAccount, setEditingAccount] = useState<Account | undefined>(undefined);
    const [archivingAccount, setArchivingAccount] = useState<Account | null>(null);
    const [isArchiveModalOpen, setIsArchiveModalOpen] = useState(false);

    const handleEdit = (account: Account) => {
        setEditingAccount(account);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingAccount(undefined);
    };

    const handleCreateNew = () => {
        setEditingAccount(undefined);
        setIsModalOpen(true);
    };

    const handleArchive = (account: Account) => {
        setArchivingAccount(account);
        setIsArchiveModalOpen(true);
    };

    const confirmArchive = async () => {
        if (archivingAccount) {
            try {
                await archiveAccount.mutateAsync(archivingAccount);
                setIsArchiveModalOpen(false);
                setArchivingAccount(null);
            } catch (error) {
                console.error('Failed to archive account:', error);
            }
        }
    };

    if (error) {
        return <div className="accounts-page__error">Error loading accounts: {error.message}</div>;
    }

    return (
        <div className="accounts-page">
            <div className="accounts-page__header">
                <h1 className="accounts-page__title">Cuentas</h1>

                <div className="accounts-page__actions">
                    <button
                        className="accounts-page__action-btn"
                        title="Add Account"
                        onClick={handleCreateNew}
                    >
                        <FontAwesomeIcon icon={faPlus} size="sm" />
                    </button>
                    <button className="accounts-page__action-btn" title="Transfer">
                        <FontAwesomeIcon icon={faRightLeft} size="sm" />
                    </button>
                    <button
                        className="accounts-page__action-btn"
                        title="View Archive"
                        onClick={() => navigate('/accounts/archived')}
                    >
                        <FontAwesomeIcon icon={faBoxArchive} size="sm" />
                    </button>
                </div>
            </div>

            {isLoading ? (
                <div className="accounts-page__loading">
                    Loading accounts...
                </div>
            ) : (
                <div className="accounts-page__grid">
                    {accountGroups?.map((group, index) => (
                        <AccountGroupCard
                            key={group.groupName + index}
                            group={group}
                            onEdit={handleEdit}
                            onArchive={handleArchive}
                        />
                    ))}
                </div>
            )}

            <AccountModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                account={editingAccount}
            />

            {/* Archive Confirmation Modal */}
            <Modal
                isOpen={isArchiveModalOpen}
                onClose={() => setIsArchiveModalOpen(false)}
                title="Seguro que quieres archivar esta cuenta?"
            >
                <div style={{ padding: '1rem 0' }}>
                    <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
                        Al archivar esta cuenta, no se eliminara la cuenta, solo se mandara a el archivero.
                    </p>
                    <p style={{ marginBottom: '1.5rem', lineHeight: '1.6' }}>
                        Esta cuenta no estara disponible para crear nuevas transacciones, pero todas las transacciones pasadas de esta cuenta seguiran mostrandose de manera normal.
                    </p>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
                        <Button variant="secondary" onClick={() => setIsArchiveModalOpen(false)}>
                            CANCELAR
                        </Button>
                        <Button
                            variant="primary"
                            style={{ backgroundColor: '#FF1493', borderColor: '#FF1493' }}
                            onClick={confirmArchive}
                            disabled={archiveAccount.isPending}
                        >
                            {archiveAccount.isPending ? 'ARCHIVANDO...' : 'ELIMINAR'}
                        </Button>
                    </div>
                </div>
            </Modal>
        </div>
    );
};
