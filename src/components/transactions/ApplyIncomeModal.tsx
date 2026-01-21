import React, { useState, useEffect } from 'react';
import { DatePicker } from '../ui/DatePicker';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { Account } from '../../types';
import { useTransactionMutations } from '../../hooks/useTransactionMutations';
import { Transaction } from '../../api-client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoneyCheck, faHandHoldingDollar, faWallet, faPiggyBank, faCreditCard, faSackDollar, faLandmark } from '@fortawesome/free-solid-svg-icons';
import Select, { StylesConfig, components, OptionProps } from 'react-select';
import './ApplyIncomeModal.css';

interface ApplyIncomeModalProps {
    isOpen: boolean;
    onClose: () => void;
    accounts: Account[];
    transaction: Transaction | null;
}

const iconMap: { [key: string]: any } = {
    'money-check': faMoneyCheck,
    'money-check-alt': faMoneyCheck,
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

const customSelectStyles: StylesConfig<any, false> = {
    control: (provided, state) => ({
        ...provided,
        backgroundColor: '#262626',
        borderColor: state.isFocused ? '#00CED1' : 'rgba(255, 255, 255, 0.1)',
        color: '#FFFFFF',
        boxShadow: 'none',
        minHeight: '42px',
        '&:hover': {
            borderColor: 'rgba(255, 255, 255, 0.2)'
        }
    }),
    menu: (provided) => ({
        ...provided,
        backgroundColor: '#1f1f1f',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        zIndex: 999999,
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.5)'
    }),
    option: (provided, state) => ({
        ...provided,
        backgroundColor: state.isSelected ? 'rgba(0, 206, 209, 0.2)' : state.isFocused ? 'rgba(255, 255, 255, 0.05)' : 'transparent',
        color: '#FFFFFF',
        cursor: 'pointer',
        padding: '10px 12px',
    }),
    singleValue: (provided) => ({
        ...provided,
        color: '#FFFFFF'
    }),
    input: (provided) => ({
        ...provided,
        color: '#FFFFFF'
    }),
    placeholder: (provided) => ({
        ...provided,
        color: '#6B6B6B'
    }),
    indicatorSeparator: () => ({
        display: 'none'
    }),
    dropdownIndicator: (provided) => ({
        ...provided,
        color: '#6B6B6B',
        '&:hover': {
            color: '#A0A0A0'
        }
    }),
    menuPortal: (base) => ({
        ...base,
        zIndex: 999999
    })
};

const AccountOption = (props: OptionProps<any>) => {
    const { data } = props;
    const icon = data.rawAccount.image ? iconMap[data.rawAccount.image] || iconMap['default'] : iconMap['default'];
    return (
        <components.Option {...props}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{
                    backgroundColor: data.rawAccount.color || '#374151',
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '14px',
                    color: 'white',
                    flexShrink: 0
                }}>
                    <FontAwesomeIcon icon={icon} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span style={{ fontSize: '14px', fontWeight: 600 }}>{data.label}</span>
                    <span style={{ fontSize: '11px', color: '#A0A0A0' }}>{data.rawAccount.accountType?.name}</span>
                </div>
            </div>
        </components.Option>
    );
};

const AccountSingleValue = (props: any) => {
    const { data } = props;
    const icon = data.rawAccount.image ? iconMap[data.rawAccount.image] || iconMap['default'] : iconMap['default'];
    return (
        <components.SingleValue {...props}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{
                    backgroundColor: data.rawAccount.color || '#374151',
                    width: '20px',
                    height: '20px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '10px',
                    color: 'white',
                    flexShrink: 0
                }}>
                    <FontAwesomeIcon icon={icon} />
                </div>
                <span>{data.label}</span>
            </div>
        </components.SingleValue>
    );
};

export const ApplyIncomeModal: React.FC<ApplyIncomeModalProps> = ({ isOpen, onClose, accounts, transaction }) => {
    const { updateTransaction } = useTransactionMutations();
    const [amount, setAmount] = useState('');
    const [date, setDate] = useState<Date>(new Date());
    const [accountId, setAccountId] = useState('');
    const [accountName, setAccountName] = useState('');

    useEffect(() => {
        if (isOpen && transaction) {
            setAmount(transaction.amount?.toString() || '');
            setDate(transaction.date ? new Date(transaction.date) : new Date());
            setAccountId(transaction.accountId || '');
            setAccountName(transaction.accountName || '');
        }
    }, [isOpen, transaction]);

    const handleSubmit = async () => {
        if (!transaction || !transaction.id) return;

        try {
            await updateTransaction.mutateAsync({
                ...transaction,
                amount: parseFloat(amount),
                date: date.toISOString().split('T')[0],
                accountId,
                accountName: accounts.find(a => a.id === accountId)?.name || accountName,
                isApplied: true
            });
            onClose();
        } catch (error) {
            console.error('Failed to apply income:', error);
        }
    };

    if (!transaction) return null;

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Quieres aplicar esta entrada?"
        >
            <div className="transaction-modal__form">
                {/* Amount */}
                <div className="transaction-modal__field">
                    <label className="transaction-modal__label">Cantidad</label>
                    <div style={{ position: 'relative' }}>
                        <span style={{
                            position: 'absolute',
                            left: '0.75rem',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            color: 'var(--text-secondary)',
                            pointerEvents: 'none'
                        }}>$</span>
                        <input
                            className="transaction-modal__input"
                            type="number"
                            step="any"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            placeholder="0.00"
                            style={{ paddingLeft: '2rem', color: '#00e676', fontWeight: 600 }}
                        />
                    </div>
                </div>

                {/* Date */}
                <div className="transaction-modal__field">
                    <label className="transaction-modal__label">Fecha</label>
                    <div className="transaction-modal__datepicker-wrapper">
                        <DatePicker
                            selected={date}
                            onChange={(d: Date | null) => d && setDate(d)}
                            label=""
                        />
                    </div>
                </div>

                {/* Account */}
                <div className="transaction-modal__field">
                    <label className="transaction-modal__label">Cuenta</label>
                    <Select
                        styles={customSelectStyles}
                        options={accounts.map(acc => ({
                            value: acc.id,
                            label: acc.name,
                            rawAccount: acc
                        }))}
                        value={accountId ? {
                            value: accountId,
                            label: accountName,
                            rawAccount: accounts.find(a => a.id === accountId)
                        } : null}
                        onChange={(selected: any) => {
                            if (selected) {
                                setAccountId(selected.rawAccount.id);
                                setAccountName(selected.rawAccount.name);
                            }
                        }}
                        placeholder="Buscar cuenta..."
                        components={{
                            Option: AccountOption,
                            SingleValue: AccountSingleValue
                        }}
                        isClearable
                        menuPortalTarget={document.body}
                        menuPosition="fixed"
                    />
                </div>

                <div className="category-modal__actions" style={{ display: 'flex', flexDirection: 'row-reverse', justifyContent: 'flex-start', gap: '1rem', marginTop: '1rem' }}>
                    <Button
                        variant="primary"
                        onClick={handleSubmit}
                        style={{ backgroundColor: '#00CED1', borderColor: '#00CED1', color: 'white', fontWeight: 700 }}
                    >
                        APLICAR
                    </Button>
                    <Button variant="secondary" onClick={onClose}>
                        CANCELAR
                    </Button>
                </div>
            </div>
        </Modal>
    );
};
