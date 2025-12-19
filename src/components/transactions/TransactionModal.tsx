import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { Account } from '../../types';
import { useTransactionMutations } from '../../hooks/useTransactionMutations';
import { useCategoriesQuery } from '../../hooks/useCategoriesQuery';
import { Category, Transaction } from '../../api-client';
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
    faLayerGroup
} from '@fortawesome/free-solid-svg-icons';
import { TransactionType } from '../../api-client/models/TransactionType';
import { Autocomplete } from '../ui/Autocomplete';
import './TransactionModal.css';

interface TransactionModalProps {
    isOpen: boolean;
    onClose: () => void;
    accounts: Account[];
    type: TransactionType;
    transaction?: Transaction | null;
    defaultValues?: {
        amount?: number;
        categoryId?: string;
        categoryName?: string;
        monthlyKey?: string;
        savingKey?: string;
        notes?: string;
        subcategory?: string;
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

const getIcon = (iconName: string | null | undefined) => {
    const prefix: IconPrefix = 'fas';
    const icon = iconName ? findIconDefinition({ prefix, iconName: iconName as any }) : null;
    return icon || ['fas', 'question-circle'] as [IconPrefix, IconName];
};

export const TransactionModal: React.FC<TransactionModalProps> = ({ isOpen, onClose, accounts, type, transaction, defaultValues }) => {
    const { createTransaction, updateTransaction } = useTransactionMutations();
    const categoryType = type === TransactionType.NUMBER_0 ? 'expense' : 'income';
    const { data: categories } = useCategoriesQuery(categoryType);

    const [amount, setAmount] = useState('');
    const [date, setDate] = useState<Date>(new Date());

    // Account State
    const [accountId, setAccountId] = useState('');
    const [accountName, setAccountName] = useState('');
    const [accountSearch, setAccountSearch] = useState('');

    // Category State
    const [categoryId, setCategoryId] = useState('');
    const [categoryName, setCategoryName] = useState('');
    const [categoryImage, setCategoryImage] = useState('');
    const [categoryColor, setCategoryColor] = useState('');
    const [categorySearch, setCategorySearch] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

    const [subcategory, setSubcategory] = useState('');
    const [notes, setNotes] = useState('');

    useEffect(() => {
        if (isOpen) {
            if (transaction) {
                // Edit Mode
                setAmount(transaction.amount?.toString() || '');
                setDate(transaction.date ? new Date(transaction.date) : new Date());
                setAccountId(transaction.accountId || '');
                setAccountName(transaction.accountName || '');
                setAccountSearch(transaction.accountName || '');

                setCategoryId(transaction.categoryId || '');
                setCategoryName(transaction.categoryName || '');
                setCategoryImage(transaction.categoryImage || '');
                setCategoryColor(transaction.categoryColor || '');
                setCategorySearch(transaction.categoryName || '');

                // Find and set selected category for subcategories
                const foundCategory = categories?.find(c => c.id === transaction.categoryId);
                setSelectedCategory(foundCategory || null);

                setSubcategory(transaction.subcategory || '');
                setNotes(transaction.notes || '');
            } else {
                // Create Mode with optional default values
                setAmount(defaultValues?.amount?.toString() || '');
                setDate(new Date());
                setAccountId('');
                setAccountName('');
                setAccountSearch('');

                if (defaultValues?.categoryId) {
                    const foundCategory = categories?.find(c => c.id === defaultValues.categoryId);
                    if (foundCategory) {
                        setCategoryId(foundCategory.id || '');
                        setCategoryName(foundCategory.name || '');
                        setCategoryImage(foundCategory.image || '');
                        setCategoryColor(foundCategory.color || '');
                        setCategorySearch(foundCategory.name || '');
                        setSelectedCategory(foundCategory);
                    } else {
                        // Fallback if category not found in list but info provided
                        setCategoryId(defaultValues.categoryId);
                        setCategoryName(defaultValues.categoryName || '');
                        setCategorySearch(defaultValues.categoryName || '');
                    }
                } else {
                    setCategoryId('');
                    setCategoryName('');
                    setCategoryImage('');
                    setCategoryColor('');
                    setCategorySearch('');
                    setSelectedCategory(null);
                }

                setSubcategory(defaultValues?.subcategory || '');
                setNotes(defaultValues?.notes || '');
            }
        }
    }, [isOpen, type, transaction, categories, defaultValues]);

    const handleAccountSelect = (account: Account) => {
        setAccountId(account.id);
        setAccountName(account.name);
        setAccountSearch(account.name);
    };

    const handleCategorySelect = (category: Category) => {
        setCategoryId(category.id || '');
        setCategoryName(category.name || '');
        setCategoryImage(category.image || '');
        setCategoryColor(category.color || '');
        setCategorySearch(category.name || '');
        setSelectedCategory(category);
        setSubcategory(''); // Reset subcategory when category changes
    };

    const handleSubmit = async () => {
        try {
            const transactionData = {
                transactionType: type,
                amount: parseFloat(amount),
                date: date.toISOString().split('T')[0],
                accountId,
                accountName,
                categoryId,
                categoryName,
                categoryImage,
                categoryColor,
                subcategory: type === TransactionType.NUMBER_0 ? subcategory : undefined,
                notes: notes || '',
                isApplied: true,
                monthlyKey: transaction?.monthlyKey || defaultValues?.monthlyKey,
                savingKey: transaction?.savingKey || defaultValues?.savingKey
            };

            if (transaction && transaction.id) {
                await updateTransaction.mutateAsync({ id: transaction.id, ...transactionData });
            } else {
                await createTransaction.mutateAsync(transactionData);
            }
            onClose();
        } catch (error) {
            console.error('Failed to save transaction:', error);
        }
    };

    const isValid = amount.trim().length > 0 &&
        !isNaN(parseFloat(amount)) &&
        parseFloat(amount) > 0 &&
        accountId.length > 0 &&
        categoryId.length > 0;

    const isSaving = createTransaction.isPending || updateTransaction.isPending;

    const title = transaction
        ? (type === TransactionType.NUMBER_0 ? 'Editar Gasto' : 'Editar Ingreso')
        : (type === TransactionType.NUMBER_0 ? 'Nuevo Gasto' : 'Nuevo Ingreso');

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={title}
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
                            style={{ paddingLeft: '2rem' }}
                            autoFocus
                        />
                    </div>
                </div>

                {/* Date */}
                <div className="transaction-modal__field">
                    <label className="transaction-modal__label">Fecha</label>
                    <div className="transaction-modal__datepicker-wrapper">
                        <DatePicker
                            selected={date}
                            onChange={(date: Date | null) => date && setDate(date)}
                            dateFormat="dd/MM/yyyy"
                            className="transaction-modal__input"
                        />
                    </div>
                </div>

                {/* Account */}
                <div className="transaction-modal__field">
                    <label className="transaction-modal__label">Cuenta</label>
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
                                <div className="transaction-modal__autocomplete-option" style={{ padding: 0 }}>
                                    <div
                                        className="transaction-modal__autocomplete-option-icon"
                                        style={{ backgroundColor: account.color }}
                                    >
                                        <FontAwesomeIcon icon={icon} />
                                    </div>
                                    <div className="transaction-modal__autocomplete-option-text">
                                        <span className="transaction-modal__autocomplete-option-name">
                                            {account.name}
                                        </span>
                                        <span className="transaction-modal__autocomplete-option-type">
                                            {account.accountType.name}
                                        </span>
                                    </div>
                                </div>
                            );
                        }}
                    />
                </div>

                {/* Category */}
                <div className="transaction-modal__field">
                    <label className="transaction-modal__label">Categoría</label>
                    <Autocomplete<Category>
                        options={categories || []}
                        value={categorySearch}
                        onChange={setCategorySearch}
                        onSelect={handleCategorySelect}
                        getLabel={(cat) => cat.name || ''}
                        icon={faLayerGroup}
                        placeholder="Buscar categoría..."
                        renderOption={(cat) => (
                            <div className="transaction-modal__autocomplete-option" style={{ padding: 0 }}>
                                <div
                                    className="transaction-modal__autocomplete-option-icon"
                                    style={{ backgroundColor: cat.color || '#ccc' }}
                                >
                                    <FontAwesomeIcon icon={getIcon(cat.image)} />
                                </div>
                                <div className="transaction-modal__autocomplete-option-text">
                                    <span className="transaction-modal__autocomplete-option-name">
                                        {cat.name}
                                    </span>
                                </div>
                            </div>
                        )}
                    />
                </div>

                {/* Subcategory (Only for Expense) */}
                {type === TransactionType.NUMBER_0 && (
                    <div className="transaction-modal__field">
                        <label className="transaction-modal__label">Subcategoría (Opcional)</label>
                        <Autocomplete<string>
                            options={selectedCategory?.subcategories || []}
                            value={subcategory}
                            onChange={setSubcategory}
                            onSelect={setSubcategory}
                            getLabel={(sub) => sub}
                            placeholder="Ej. Internet, Comida..."
                        />
                    </div>
                )}

                {/* Notes */}
                <div className="transaction-modal__field">
                    <label className="transaction-modal__label">Notas</label>
                    <textarea
                        className="transaction-modal__textarea"
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
