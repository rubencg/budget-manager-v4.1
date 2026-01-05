import React, { useState, useEffect, useRef } from 'react';
import { DatePicker } from '../ui/DatePicker';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { Account } from '../../types';
import { useTransactionMutations } from '../../hooks/useTransactionMutations';
import { Transaction } from '../../api-client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faLandmark,
    faMoneyCheck,
    faHandHoldingDollar,
    faWallet,
    faPiggyBank,
    faCreditCard,
    faSackDollar
} from '@fortawesome/free-solid-svg-icons';
import './TransferModal.css';
import Select, { StylesConfig, components, OptionProps } from 'react-select';

interface TransferModalProps {
    isOpen: boolean;
    onClose: () => void;
    accounts: Account[];
    transaction?: Transaction | null;
    defaultValues?: {
        amount?: number;
        monthlyKey?: string;
        savingKey?: string;
        notes?: string;
        fromAccountId?: string;
        toAccountId?: string;
    };
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

// React Select Custom Styles
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
    menuList: (provided) => ({
        ...provided,
        padding: 0
    }),
    option: (provided, state) => ({
        ...provided,
        backgroundColor: state.isSelected ? 'rgba(0, 206, 209, 0.2)' : state.isFocused ? 'rgba(255, 255, 255, 0.05)' : 'transparent',
        color: '#FFFFFF',
        cursor: 'pointer',
        padding: '10px 12px',
        ':active': {
            backgroundColor: 'rgba(0, 206, 209, 0.3)'
        }
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

export const TransferModal: React.FC<TransferModalProps> = ({ isOpen, onClose, accounts, transaction, defaultValues }) => {
    const amountInputRef = useRef<HTMLInputElement>(null);
    const { createTransfer, updateTransaction } = useTransactionMutations();

    const [amount, setAmount] = useState('');
    const [date, setDate] = useState<Date>(new Date());
    const [fromAccountId, setFromAccountId] = useState('');
    const [fromAccountName, setFromAccountName] = useState('');

    const [toAccountId, setToAccountId] = useState('');
    const [toAccountName, setToAccountName] = useState('');

    const [notes, setNotes] = useState('');

    useEffect(() => {
        if (isOpen) {
            if (transaction) {
                // Edit Mode
                setAmount(transaction.amount?.toString() || '');
                setDate(transaction.date ? new Date(transaction.date) : new Date());

                setFromAccountId(transaction.fromAccountId || '');
                setFromAccountName(transaction.fromAccountName || '');

                setToAccountId(transaction.toAccountId || '');
                setToAccountName(transaction.toAccountName || '');

                setNotes(transaction.notes || '');
            } else {
                // Create Mode
                setAmount(defaultValues?.amount?.toString() || '');
                setDate(new Date());

                // Handle default fromAccount
                if (defaultValues?.fromAccountId) {
                    const fromAcc = accounts?.find(a => a.id === defaultValues.fromAccountId);
                    if (fromAcc) {
                        setFromAccountId(fromAcc.id);
                        setFromAccountName(fromAcc.name);
                    }
                } else {
                    setFromAccountId('');
                    setFromAccountName('');
                }

                // Handle default toAccount
                if (defaultValues?.toAccountId) {
                    const toAcc = accounts?.find(a => a.id === defaultValues.toAccountId);
                    if (toAcc) {
                        setToAccountId(toAcc.id);
                        setToAccountName(toAcc.name);
                    }
                } else {
                    setToAccountId('');
                    setToAccountName('');
                }

                setNotes(defaultValues?.notes || '');
            }

            // Focus after modal is open, but prevent scroll jump
            setTimeout(() => {
                amountInputRef.current?.focus({ preventScroll: true });
            }, 100);
        }
    }, [isOpen, transaction, defaultValues, accounts]);

    const handleFromAccountSelect = (account: Account) => {
        setFromAccountId(account.id);
        setFromAccountName(account.name);
    };

    const handleToAccountSelect = (account: Account) => {
        setToAccountId(account.id);
        setToAccountName(account.name);
    };

    const handleSubmit = async () => {
        try {
            const transferData = {
                transactionType: 2,
                amount: parseFloat(amount),
                date: date.toISOString().split('T')[0], // Format as YYYY-MM-DD
                fromAccountId,
                fromAccountName,
                toAccountId,
                toAccountName,
                notes: notes || '',
                isApplied: true,
                monthlyKey: transaction?.monthlyKey || defaultValues?.monthlyKey,
                savingKey: transaction?.savingKey || defaultValues?.savingKey
            };

            if (transaction && transaction.id) {
                await updateTransaction.mutateAsync({ id: transaction.id, ...transferData });
            } else {
                await createTransfer.mutateAsync(transferData);
            }
            onClose();
        } catch (error) {
            console.error('Failed to save transfer:', error);
        }
    };

    const isValid = amount.trim().length > 0 &&
        !isNaN(parseFloat(amount)) &&
        parseFloat(amount) > 0 &&
        fromAccountId.length > 0 &&
        toAccountId.length > 0 &&
        fromAccountId !== toAccountId;

    const isSaving = createTransfer.isPending || updateTransaction.isPending;

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={transaction ? 'Editar transferencia' : 'Nueva transferencia'}
        >
            <div className="transfer-modal__form">
                {/* Amount */}
                <div className="transfer-modal__field">
                    <label className="transfer-modal__label">Cantidad</label>
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
                            ref={amountInputRef}
                            className="transfer-modal__input"
                            type="number"
                            step="any"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            placeholder="0.00"
                            style={{ paddingLeft: '2rem' }}
                        />
                    </div>
                </div>

                {/* Date */}
                <div className="transfer-modal__field">
                    <label className="transfer-modal__label">Fecha</label>
                    <div className="transfer-modal__datepicker-wrapper">
                        <DatePicker
                            selected={date}
                            onChange={(date: Date | null) => date && setDate(date)}
                            label=""
                        />
                    </div>
                </div>

                {/* From Account */}
                <div className="transfer-modal__field">
                    <label className="transfer-modal__label">Cuenta Origen</label>
                    <Select
                        styles={customSelectStyles}
                        options={accounts
                            .filter(acc => acc.id !== toAccountId)
                            .map(acc => ({
                                value: acc.id,
                                label: acc.name,
                                rawAccount: acc
                            }))}
                        value={fromAccountId ? {
                            value: fromAccountId,
                            label: fromAccountName,
                            rawAccount: accounts.find(a => a.id === fromAccountId)
                        } : null}
                        onChange={(selected: any) => {
                            if (selected) {
                                handleFromAccountSelect(selected.rawAccount);
                            } else {
                                setFromAccountId('');
                                setFromAccountName('');
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

                {/* To Account */}
                <div className="transfer-modal__field">
                    <label className="transfer-modal__label">Cuenta Destino</label>
                    <Select
                        styles={customSelectStyles}
                        options={accounts
                            .filter(acc => acc.id !== fromAccountId)
                            .map(acc => ({
                                value: acc.id,
                                label: acc.name,
                                rawAccount: acc
                            }))}
                        value={toAccountId ? {
                            value: toAccountId,
                            label: toAccountName,
                            rawAccount: accounts.find(a => a.id === toAccountId)
                        } : null}
                        onChange={(selected: any) => {
                            if (selected) {
                                handleToAccountSelect(selected.rawAccount);
                            } else {
                                setToAccountId('');
                                setToAccountName('');
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

                {/* Notes */}
                <div className="transfer-modal__field">
                    <label className="transfer-modal__label">Notas</label>
                    <textarea
                        className="transfer-modal__textarea"
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder="Notas opcionales..."
                    />
                </div>

                <div className="category-modal__actions" style={{ display: 'flex', flexDirection: 'row-reverse', justifyContent: 'flex-start', gap: '1rem' }}>
                    <Button
                        variant="primary"
                        onClick={handleSubmit}
                        disabled={!isValid || isSaving}
                    >
                        {isSaving ? (transaction ? 'ACTUALIZANDO...' : 'GUARDANDO...') : (transaction ? 'ACTUALIZAR' : 'GUARDAR')}
                    </Button>
                    <Button variant="secondary" onClick={onClose} disabled={isSaving}>
                        CANCELAR
                    </Button>
                </div>
            </div>
        </Modal>
    );
};
