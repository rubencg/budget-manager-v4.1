import React from 'react';
import { AccountGroup } from '../../types';
import { AccountItem } from './AccountItem';
import './Accounts.css';

interface AccountGroupCardProps {
    group: AccountGroup;
}

export const AccountGroupCard: React.FC<AccountGroupCardProps> = ({ group }) => {
    const formattedTotal = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    }).format(group.total);

    return (
        <div className="account-group-card">
            <div className="account-group-card__header">
                <h3 className="account-group-card__title">{group.groupName}</h3>
                <span className="account-group-card__total">{formattedTotal}</span>
            </div>

            <div className="account-group-card__list">
                {group.accounts.map(account => (
                    <AccountItem key={account.id} account={account} />
                ))}
            </div>
        </div>
    );
};
