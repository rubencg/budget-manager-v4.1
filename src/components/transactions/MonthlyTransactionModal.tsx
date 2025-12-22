import React, { useState, useEffect, useRef } from 'react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { Account } from '../../types';
import { useMonthlyTransactionMutations } from '../../hooks/useMonthlyTransactionMutations';
import { useCategoriesQuery } from '../../hooks/useCategoriesQuery';
import { Category, MonthlyTransactionType, BudgetSectionItemDto } from '../../api-client';
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
    entity?: BudgetSectionItemDto | null;
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

export const MonthlyTransactionModal: React.FC<MonthlyTransactionModalProps> = ({ isOpen, onClose, accounts, entity }) => {
    const amountInputRef = useRef<HTMLInputElement>(null);
    const { createMonthlyTransaction, updateMonthlyTransaction } = useMonthlyTransactionMutations();

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
            if (entity) {
                // Edit Mode
                setAmount(entity.amount?.toString() || '');
                setDayOfMonth(entity.dayOfMonth || 1);
                setAccountId(entity.accountId || '');
                setAccountName(entity.accountName || '');
                setAccountSearch(entity.accountName || '');
                setCategoryId(entity.categoryId || '');
                setCategoryName(entity.categoryName || '');
                setCategorySearch(entity.categoryName || '');
                setSubcategory(entity.subcategory || '');
                setNotes(entity.notes || '');
                setType(entity.monthlyTransactionType !== undefined ? entity.monthlyTransactionType : MonthlyTransactionType.NUMBER_0);

                // We don't have the full Category object to set selectedCategory (for subcategories) immediately unless we look it up.
                // It will be found when user searches or we could look it up from 'categories' if specific logic is needed, 
                // but typically autocomplete works with strings for display. 
                // If subcategory dropdown depends on selectedCategory, it might be empty initially in edit mode until category is re-selected or we find it.
                // For now we just set valid string values.
            } else {
                // Create Mode
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

            // Focus after modal is open, but prevent scroll jump
            setTimeout(() => {
                amountInputRef.current?.focus({ preventScroll: true });
            }, 100);
        }
    }, [isOpen, entity]);

    // Find category object when categories are loaded and in edit mode to populate subcategories
    useEffect(() => {
        if (entity && categories && !selectedCategory) {
            const cat = categories.find(c => c.id === entity.categoryId);
            if (cat) {
                setSelectedCategory(cat);
            }
        }
    }, [entity, categories, selectedCategory]);


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

            if (entity && entity.id) {
                await updateMonthlyTransaction.mutateAsync({
                    id: entity.id,
                    command: transactionData
                });
            } else {
                await createMonthlyTransaction.mutateAsync(transactionData);
            }
            onClose();
        } catch (error) {
            console.error('Failed to save monthly transaction:', error);
        }
    };

    const isValid = amount.trim().length > 0 &&
        !isNaN(parseFloat(amount)) &&
        parseFloat(amount) > 0 &&
        dayOfMonth >= 1 && dayOfMonth <= 28 &&
        accountId.length > 0 &&
        categoryId.length > 0;

    const isSaving = createMonthlyTransaction.isPending || updateMonthlyTransaction.isPending;

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={entity ? 'Editar Transacción Mensual' : 'Nueva Transacción Mensual'}
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
                            ref={amountInputRef}
                            className="monthly-transaction-modal__input"
                            type="number"
                            step="any"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            placeholder="0.00"
                            style={{ paddingLeft: '2rem' }}
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
                        {isSaving ? (entity ? 'ACTUALIZANDO...' : 'GUARDANDO...') : (entity ? 'ACTUALIZAR' : 'GUARDAR')}
                    </Button>
                    <Button variant="secondary" onClick={onClose} disabled={isSaving}>
                        CANCELAR
                    </Button>
                </div>
            </div>
        </Modal>
    );
};
