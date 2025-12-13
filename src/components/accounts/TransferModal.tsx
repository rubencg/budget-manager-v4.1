import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { Account } from '../../types';
import { useTransactionMutations } from '../../hooks/useTransactionMutations';
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
import { Autocomplete } from '../ui/Autocomplete';
import './TransferModal.css';

interface TransferModalProps {
    isOpen: boolean;
    onClose: () => void;
    accounts: Account[];
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

export const TransferModal: React.FC<TransferModalProps> = ({ isOpen, onClose, accounts }) => {
    const { createTransfer } = useTransactionMutations();

    const [amount, setAmount] = useState('');
    const [date, setDate] = useState<Date>(new Date());
    const [fromAccountId, setFromAccountId] = useState('');
    const [fromAccountName, setFromAccountName] = useState('');
    const [fromAccountSearch, setFromAccountSearch] = useState('');

    const [toAccountId, setToAccountId] = useState('');
    const [toAccountName, setToAccountName] = useState('');
    const [toAccountSearch, setToAccountSearch] = useState('');

    const [notes, setNotes] = useState('');

    useEffect(() => {
        if (isOpen) {
            // Reset form
            setAmount('');
            setDate(new Date());
            setFromAccountId('');
            setFromAccountName('');
            setFromAccountSearch('');
            setToAccountId('');
            setToAccountName('');
            setToAccountSearch('');
            setNotes('');
        }
    }, [isOpen]);

    const handleFromAccountSelect = (account: Account) => {
        setFromAccountId(account.id);
        setFromAccountName(account.name);
        setFromAccountSearch(account.name);
    };

    const handleToAccountSelect = (account: Account) => {
        setToAccountId(account.id);
        setToAccountName(account.name);
        setToAccountSearch(account.name);
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
                isApplied: true
            };

            await createTransfer.mutateAsync(transferData);
            onClose();
        } catch (error) {
            console.error('Failed to create transfer:', error);
        }
    };

    const isValid = amount.trim().length > 0 &&
        !isNaN(parseFloat(amount)) &&
        parseFloat(amount) > 0 &&
        fromAccountId.length > 0 &&
        toAccountId.length > 0 &&
        fromAccountId !== toAccountId;

    const isSaving = createTransfer.isPending;

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Nueva transferencia"
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
                            className="transfer-modal__input"
                            type="number"
                            step="any"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            placeholder="0.00"
                            style={{ paddingLeft: '2rem' }}
                            autoFocus
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
                            dateFormat="dd/MM/yyyy"
                            className="transfer-modal__input"
                        />
                    </div>
                </div>

                {/* From Account */}
                <div className="transfer-modal__field">
                    <label className="transfer-modal__label">Cuenta Origen</label>
                    <Autocomplete<Account>
                        options={accounts}
                        value={fromAccountSearch}
                        onChange={setFromAccountSearch}
                        onSelect={handleFromAccountSelect}
                        getLabel={(acc) => acc.name}
                        icon={faLandmark}
                        placeholder="Buscar cuenta..."
                        filterFunction={(item, search) =>
                            item.id !== toAccountId &&
                            (item.name.toLowerCase().includes(search.toLowerCase()) ||
                                item.accountType.name.toLowerCase().includes(search.toLowerCase()))
                        }
                        renderOption={(account) => {
                            const icon = iconMap[account.image] || iconMap['default'];
                            return (
                                <div className="transfer-modal__autocomplete-option" style={{ padding: 0 }}>
                                    <div
                                        className="transfer-modal__autocomplete-option-icon"
                                        style={{ backgroundColor: account.color }}
                                    >
                                        <FontAwesomeIcon icon={icon} />
                                    </div>
                                    <div className="transfer-modal__autocomplete-option-text">
                                        <span className="transfer-modal__autocomplete-option-name">
                                            {account.name}
                                        </span>
                                        <span className="transfer-modal__autocomplete-option-type">
                                            {account.accountType.name}
                                        </span>
                                    </div>
                                </div>
                            );
                        }}
                    />
                </div>

                {/* To Account */}
                <div className="transfer-modal__field">
                    <label className="transfer-modal__label">Cuenta Destino</label>
                    <Autocomplete<Account>
                        options={accounts}
                        value={toAccountSearch}
                        onChange={setToAccountSearch}
                        onSelect={handleToAccountSelect}
                        getLabel={(acc) => acc.name}
                        icon={faLandmark}
                        placeholder="Buscar cuenta..."
                        filterFunction={(item, search) =>
                            item.id !== fromAccountId &&
                            (item.name.toLowerCase().includes(search.toLowerCase()) ||
                                item.accountType.name.toLowerCase().includes(search.toLowerCase()))
                        }
                        renderOption={(account) => {
                            const icon = iconMap[account.image] || iconMap['default'];
                            return (
                                <div className="transfer-modal__autocomplete-option" style={{ padding: 0 }}>
                                    <div
                                        className="transfer-modal__autocomplete-option-icon"
                                        style={{ backgroundColor: account.color }}
                                    >
                                        <FontAwesomeIcon icon={icon} />
                                    </div>
                                    <div className="transfer-modal__autocomplete-option-text">
                                        <span className="transfer-modal__autocomplete-option-name">
                                            {account.name}
                                        </span>
                                        <span className="transfer-modal__autocomplete-option-type">
                                            {account.accountType.name}
                                        </span>
                                    </div>
                                </div>
                            );
                        }}
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

                <div className="category-modal__actions" style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
                    <Button variant="secondary" onClick={onClose} disabled={isSaving}>
                        CANCELAR
                    </Button>
                    <Button
                        variant="primary"
                        onClick={handleSubmit}
                        disabled={!isValid || isSaving}
                    >
                        {isSaving ? 'GUARDANDO...' : 'GUARDAR'}
                    </Button>
                </div>
            </div>
        </Modal>
    );
};
