import React, { useState, useEffect } from 'react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { Account } from '../../types';
import { useMonthlyTransactionMutations } from '../../hooks/useMonthlyTransactionMutations';
import { useCategoriesQuery } from '../../hooks/useCategoriesQuery';
import { Category, MonthlyTransactionType } from '../../api-client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { findIconDefinition, IconPrefix, IconName } from '@fortawesome/fontawesome-svg-core';
import {
    faLandmark,
    faMoneyCheck,
    faHandHoldingDollar,
    faWallet,
    faPiggyBank,
    faCreditCard,
    faSackDollar,
    faLayerGroup,
    faCalendarDay
} from '@fortawesome/free-solid-svg-icons';
import { Autocomplete } from '../ui/Autocomplete';
import './MonthlyTransactionModal.css';

interface MonthlyTransactionModalProps {
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

const getIcon = (iconName: string | null | undefined) => {
    const prefix: IconPrefix = 'fas';
    const icon = iconName ? findIconDefinition({ prefix, iconName: iconName as any }) : null;
    return icon || ['fas', 'question-circle'] as [IconPrefix, IconName];
};

export const MonthlyTransactionModal: React.FC<MonthlyTransactionModalProps> = ({ isOpen, onClose, accounts }) => {
    const { createMonthlyTransaction } = useMonthlyTransactionMutations();

    const [type, setType] = useState<MonthlyTransactionType>(MonthlyTransactionType.NUMBER_0);
    const categoryType = type === MonthlyTransactionType.NUMBER_0 ? 'expense' : 'income';
    const { data: categories } = useCategoriesQuery(categoryType);

    const [amount, setAmount] = useState('');
    const [dayOfMonth, setDayOfMonth] = useState<number>(1);

    // Account State
    const [accountId, setAccountId] = useState('');
    const [accountName, setAccountName] = useState('');
    const [accountSearch, setAccountSearch] = useState('');

    // Category State
    const [categoryId, setCategoryId] = useState('');
    const [categoryName, setCategoryName] = useState('');
    const [categorySearch, setCategorySearch] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

    const [subcategory, setSubcategory] = useState('');
    const [notes, setNotes] = useState('');

    useEffect(() => {
        if (isOpen) {
            setAmount('');
            setDayOfMonth(1);
            setAccountId('');
            setAccountName('');
            setAccountSearch('');
            setCategoryId('');
            setCategoryName('');
            setCategorySearch('');
            setSelectedCategory(null);
            setSubcategory('');
            setNotes('');
            setType(MonthlyTransactionType.NUMBER_0);
        }
    }, [isOpen]);

    const handleAccountSelect = (account: Account) => {
        setAccountId(account.id);
        setAccountName(account.name);
        setAccountSearch(account.name);
    };

    const handleCategorySelect = (category: Category) => {
        setCategoryId(category.id || '');
        setCategoryName(category.name || '');
        setCategorySearch(category.name || '');
        setSelectedCategory(category);
        setSubcategory('');
    };

    const handleSubmit = async () => {
        try {
            const transactionData = {
                monthlyTransactionType: type,
                amount: parseFloat(amount),
                dayOfMonth: dayOfMonth,
                accountId,
                accountName,
                categoryId,
                categoryName,
                subcategory: subcategory || undefined,
                notes: notes || ''
            };

            await createMonthlyTransaction.mutateAsync(transactionData);
            onClose();
        } catch (error) {
            console.error('Failed to create monthly transaction:', error);
        }
    };

    const isValid = amount.trim().length > 0 &&
        !isNaN(parseFloat(amount)) &&
        parseFloat(amount) > 0 &&
        dayOfMonth >= 1 && dayOfMonth <= 28 &&
        accountId.length > 0 &&
        categoryId.length > 0;

    const isSaving = createMonthlyTransaction.isPending;

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Nueva Transacción Mensual"
        >
            <div className="monthly-transaction-modal__form">

                {/* Type Selection */}
                <div className="monthly-transaction-modal__toggles">
                    <button
                        className={`monthly-transaction-modal__toggle-btn expense ${type === MonthlyTransactionType.NUMBER_0 ? 'active' : ''}`}
                        onClick={() => setType(MonthlyTransactionType.NUMBER_0)}
                    >
                        Gasto
                    </button>
                    <button
                        className={`monthly-transaction-modal__toggle-btn income ${type === MonthlyTransactionType.NUMBER_1 ? 'active' : ''}`}
                        onClick={() => setType(MonthlyTransactionType.NUMBER_1)}
                    >
                        Ingreso
                    </button>
                </div>

                {/* Amount */}
                <div className="monthly-transaction-modal__field">
                    <label className="monthly-transaction-modal__label">Cantidad</label>
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
                            className="monthly-transaction-modal__input"
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

                {/* Day of Month */}
                <div className="monthly-transaction-modal__field">
                    <label className="monthly-transaction-modal__label">Día del mes (1-28)</label>
                    <div style={{ position: 'relative' }}>
                        <span style={{
                            position: 'absolute',
                            left: '0.75rem',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            color: 'var(--text-secondary)',
                            pointerEvents: 'none',
                            zIndex: 1
                        }}><FontAwesomeIcon icon={faCalendarDay} /></span>
                        <input
                            className="monthly-transaction-modal__input"
                            type="number"
                            min="1"
                            max="28"
                            value={dayOfMonth}
                            onChange={(e) => setDayOfMonth(parseInt(e.target.value))}
                            style={{ paddingLeft: '2.5rem' }}
                        />
                    </div>
                </div>

                {/* Account */}
                <div className="monthly-transaction-modal__field">
                    <label className="monthly-transaction-modal__label">Cuenta</label>
                    <Autocomplete<Account>
                        options={accounts}
                        value={accountSearch}
                        onChange={setAccountSearch}
                        onSelect={handleAccountSelect}
                        getLabel={(acc) => acc.name}
                        icon={faLandmark}
                        placeholder="Buscar cuenta..."
                        renderOption={(account) => {
                            const icon = iconMap[account.image] || iconMap['default'];
                            return (
                                <div className="monthly-transaction-modal__autocomplete-option" style={{ padding: 0, display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                    <div
                                        className="monthly-transaction-modal__autocomplete-option-icon"
                                        style={{
                                            backgroundColor: account.color,
                                            width: '32px',
                                            height: '32px',
                                            borderRadius: '50%',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            color: 'white'
                                        }}
                                    >
                                        <FontAwesomeIcon icon={icon} />
                                    </div>
                                    <div className="monthly-transaction-modal__autocomplete-option-text" style={{ display: 'flex', flexDirection: 'column' }}>
                                        <span className="monthly-transaction-modal__autocomplete-option-name" style={{ fontWeight: 500 }}>
                                            {account.name}
                                        </span>
                                        <span className="monthly-transaction-modal__autocomplete-option-type" style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                                            {account.accountType.name}
                                        </span>
                                    </div>
                                </div>
                            );
                        }}
                    />
                </div>

                {/* Category */}
                <div className="monthly-transaction-modal__field">
                    <label className="monthly-transaction-modal__label">Categoría</label>
                    <Autocomplete<Category>
                        options={categories || []}
                        value={categorySearch}
                        onChange={setCategorySearch}
                        onSelect={handleCategorySelect}
                        getLabel={(cat) => cat.name || ''}
                        icon={faLayerGroup}
                        placeholder="Buscar categoría..."
                        renderOption={(cat) => (
                            <div className="monthly-transaction-modal__autocomplete-option" style={{ padding: 0, display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                <div
                                    className="monthly-transaction-modal__autocomplete-option-icon"
                                    style={{
                                        backgroundColor: cat.color || '#ccc',
                                        width: '32px',
                                        height: '32px',
                                        borderRadius: '50%',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        color: 'white'
                                    }}
                                >
                                    <FontAwesomeIcon icon={getIcon(cat.image)} />
                                </div>
                                <div className="monthly-transaction-modal__autocomplete-option-text">
                                    <span className="monthly-transaction-modal__autocomplete-option-name" style={{ fontWeight: 500 }}>
                                        {cat.name}
                                    </span>
                                </div>
                            </div>
                        )}
                    />
                </div>

                {/* Subcategory */}
                <div className="monthly-transaction-modal__field">
                    <label className="monthly-transaction-modal__label">Subcategoría (Opcional)</label>
                    <Autocomplete<string>
                        options={selectedCategory?.subcategories || []}
                        value={subcategory}
                        onChange={setSubcategory}
                        onSelect={setSubcategory}
                        getLabel={(sub) => sub}
                        placeholder="Ej. Internet, Comida..."
                    />
                </div>

                {/* Notes */}
                <div className="monthly-transaction-modal__field">
                    <label className="monthly-transaction-modal__label">Notas</label>
                    <textarea
                        className="monthly-transaction-modal__textarea"
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
                        {isSaving ? 'GUARDANDO...' : 'GUARDAR'}
                    </Button>
                    <Button variant="secondary" onClick={onClose} disabled={isSaving}>
                        CANCELAR
                    </Button>
                </div>
            </div>
        </Modal>
    );
};
