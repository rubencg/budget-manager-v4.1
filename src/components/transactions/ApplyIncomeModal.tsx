import React, { useState, useEffect, useRef } from 'react';
import { DatePicker } from '../ui/DatePicker';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { Account } from '../../types';
import { useTransactionMutations } from '../../hooks/useTransactionMutations';
import { Transaction } from '../../api-client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWallet, faCalendarAlt, faMoneyBillWave } from '@fortawesome/free-solid-svg-icons';
import Select, { StylesConfig, components, OptionProps } from 'react-select';
import './ApplyIncomeModal.css';

interface ApplyIncomeModalProps {
    isOpen: boolean;
    onClose: () => void;
    accounts: Account[];
    transaction: Transaction | null;
}

const customSelectStyles: StylesConfig<any, false> = {
    control: (provided, state) => ({
        ...provided,
        backgroundColor: 'transparent',
        border: 'none',
        color: '#FFFFFF',
        boxShadow: 'none',
        minHeight: '32px',
        padding: 0,
        margin: 0,
        '&:hover': {
            border: 'none'
        }
    }),
    valueContainer: (provided) => ({
        ...provided,
        padding: 0,
        margin: 0
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
        color: '#FFFFFF',
        fontWeight: 600,
        fontSize: '1.2rem'
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
        padding: 0,
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
            <div className="apply-income-modal__form">
                <div className="apply-income-modal__card">
                    <div className="apply-income-modal__card-label">Cantidad</div>
                    <div className="apply-income-modal__card-content">
                        <FontAwesomeIcon icon={faMoneyBillWave} className="apply-income-modal__icon" />
                        <span className="apply-income-modal__currency">$</span>
                        <input
                            type="number"
                            className="apply-income-modal__amount-input"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                        />
                    </div>
                </div>

                <div className="apply-income-modal__card">
                    <div className="apply-income-modal__card-label">Fecha</div>
                    <div className="apply-income-modal__card-content">
                        <FontAwesomeIcon icon={faCalendarAlt} className="apply-income-modal__icon" />
                        <DatePicker
                            selected={date}
                            onChange={(d: Date | null) => d && setDate(d)}
                            label=""
                        />
                    </div>
                </div>

                <div className="apply-income-modal__card">
                    <div className="apply-income-modal__card-label">Cuenta</div>
                    <div className="apply-income-modal__card-content">
                        <FontAwesomeIcon icon={faWallet} className="apply-income-modal__icon" />
                        <div style={{ flex: 1 }}>
                            <Select
                                styles={customSelectStyles}
                                options={accounts.map(acc => ({
                                    value: acc.id,
                                    label: acc.name
                                }))}
                                value={accountId ? {
                                    value: accountId,
                                    label: accounts.find(a => a.id === accountId)?.name || accountName
                                } : null}
                                onChange={(selected: any) => {
                                    if (selected) {
                                        setAccountId(selected.value);
                                        setAccountName(selected.label);
                                    }
                                }}
                                isSearchable={false}
                                menuPortalTarget={document.body}
                                menuPosition="fixed"
                            />
                        </div>
                    </div>
                </div>

                <div className="apply-income-modal__actions">
                    <Button variant="secondary" onClick={onClose}>
                        CANCELAR
                    </Button>
                    <Button variant="primary" className="apply-income-modal__btn--apply" onClick={handleSubmit}>
                        APLICAR
                    </Button>
                </div>
            </div>
        </Modal>
    );
};
