import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faBoxArchive, faMoneyCheck, faHandHoldingDollar, faWallet, faPiggyBank, faCreditCard, faSackDollar, faLandmark } from '@fortawesome/free-solid-svg-icons';
import { Account } from '../../types';
import './Accounts.css';

interface AccountItemProps {
    account: Account;
    onEdit: (account: Account) => void;
}

const iconMap: { [key: string]: any } = {
    'money-check': faMoneyCheck,
    'hand-holding-usd': faHandHoldingDollar,
    'wallet': faWallet,
    'piggy-bank': faPiggyBank,
    'credit-card': faCreditCard,
    'sack-dollar': faSackDollar,
    'landmark': faLandmark,
    'default': faWallet
};

export const AccountItem: React.FC<AccountItemProps> = ({ account, onEdit }) => {
    const icon = iconMap[account.image] || iconMap['default'];

    // Formatting currency
    const formattedBalance = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    }).format(account.currentBalance);

    const amountClass = account.currentBalance < 0
        ? 'account-item__amount--negative'
        : 'account-item__amount--positive';

    return (
        <div className="account-item">
            <div className="account-item__main">
                <div
                    className="account-item__icon-wrapper"
                    style={{ backgroundColor: account.color }}
                >
                    <FontAwesomeIcon icon={icon} />
                </div>

                <div className="account-item__info">
                    <span className="account-item__name">{account.name}</span>
                    <span className={`account-item__amount ${amountClass}`}>{formattedBalance}</span>
                </div>
            </div>

            <div className="account-item__actions">
                <button className="account-item__action-btn" title="Edit" onClick={() => onEdit(account)}>
                    <FontAwesomeIcon icon={faPen} size="sm" />
                </button>
                <button className="account-item__action-btn" title="Archive">
                    <FontAwesomeIcon icon={faBoxArchive} size="sm" />
                </button>
            </div>
        </div>
    );
};
