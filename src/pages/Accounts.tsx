import React, { useState } from 'react';
import { useAccountsQuery } from '../hooks/useAccountsQuery';
import { AccountGroupCard } from '../components/accounts/AccountGroupCard';
import { AccountModal } from '../components/accounts/AccountModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faRightLeft, faBoxArchive } from '@fortawesome/free-solid-svg-icons';
import './Accounts.css';

export const Accounts: React.FC = () => {
    const { data: accountGroups, isLoading, error } = useAccountsQuery();
    const [isModalOpen, setIsModalOpen] = useState(false);

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
                        onClick={() => setIsModalOpen(true)}
                    >
                        <FontAwesomeIcon icon={faPlus} size="sm" />
                    </button>
                    <button className="accounts-page__action-btn" title="Transfer">
                        <FontAwesomeIcon icon={faRightLeft} size="sm" />
                    </button>
                    <button className="accounts-page__action-btn" title="View Archive">
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
                        <AccountGroupCard key={group.groupName + index} group={group} />
                    ))}
                </div>
            )}

            <AccountModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </div>
    );
};
