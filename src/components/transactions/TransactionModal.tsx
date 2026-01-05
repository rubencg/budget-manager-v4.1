import React, { useState, useEffect, useRef } from 'react';
import { DatePicker } from '../ui/DatePicker';
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
import Select, { StylesConfig, components, OptionProps, SingleValue } from 'react-select';
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
        accountId?: string;
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

// React Select Custom Styles
const customSelectStyles: StylesConfig<any, false> = {
    control: (provided, state) => ({
        ...provided,
        backgroundColor: '#262626', // Slightly lighter than card bg for input
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
        zIndex: 9999,
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

// Custom Option Component for Categories with Icons
const CategoryOption = (props: OptionProps<any>) => {
    const { data } = props;
    return (
        <components.Option {...props}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{
                    backgroundColor: data.color || '#374151',
                    width: '28px',
                    height: '28px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '12px',
                    color: 'white',
                    flexShrink: 0
                }}>
                    <FontAwesomeIcon icon={getIcon(data.image)} />
                </div>
                <span style={{ fontSize: '14px' }}>{data.label}</span>
            </div>
        </components.Option>
    );
};

// Custom SingleValue Component for Categories
const CategorySingleValue = (props: any) => {
    const { data } = props;
    return (
        <components.SingleValue {...props}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{
                    backgroundColor: data.color || '#374151',
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
                    <FontAwesomeIcon icon={getIcon(data.image)} />
                </div>
                <span>{data.label}</span>
            </div>
        </components.SingleValue>
    );
};

// Custom Option Component for Accounts
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

// Custom SingleValue Component for Accounts
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

export const TransactionModal: React.FC<TransactionModalProps> = ({ isOpen, onClose, accounts, type, transaction, defaultValues }) => {
    const amountInputRef = useRef<HTMLInputElement>(null);
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
    const [removeFromSpendingPlan, setRemoveFromSpendingPlan] = useState(false);
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
                setRemoveFromSpendingPlan(transaction.removeFromSpendingPlan || false);
            } else {
                // Create Mode with optional default values
                setAmount(defaultValues?.amount?.toString() || '');
                setDate(new Date());
                if (defaultValues?.accountId) {
                    const foundAccount = accounts?.find(a => a.id === defaultValues.accountId);
                    if (foundAccount) {
                        setAccountId(foundAccount.id);
                        setAccountName(foundAccount.name);
                        setAccountSearch(foundAccount.name);
                    } else {
                        setAccountId('');
                        setAccountName('');
                        setAccountSearch('');
                    }
                } else {
                    setAccountId('');
                    setAccountName('');
                    setAccountSearch('');
                }

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
                setRemoveFromSpendingPlan(false);
            }

            // Focus after form is populated, but avoid jumping scroll
            setTimeout(() => {
                amountInputRef.current?.focus({ preventScroll: true });
            }, 100);
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
                subcategory: subcategory,
                notes: notes || '',
                isApplied: true,
                monthlyKey: transaction?.monthlyKey || defaultValues?.monthlyKey,
                removeFromSpendingPlan,
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
                            ref={amountInputRef}
                            className="transaction-modal__input"
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
                <div className="transaction-modal__field">
                    <label className="transaction-modal__label">Fecha</label>
                    <div className="transaction-modal__datepicker-wrapper">
                        <DatePicker
                            selected={date}
                            onChange={(date: Date | null) => date && setDate(date)}
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
                                handleAccountSelect(selected.rawAccount);
                            } else {
                                setAccountId('');
                                setAccountName('');
                                setAccountSearch('');
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

                {/* Category */}
                <div className="transaction-modal__field">
                    <label className="transaction-modal__label">Categoría</label>
                    <Select
                        styles={customSelectStyles}
                        options={categories?.map(c => ({
                            value: c.id,
                            label: c.name,
                            image: c.image,
                            color: c.color,
                            ...c
                        })) || []}
                        value={categoryId ? {
                            value: categoryId,
                            label: categoryName,
                            image: categoryImage,
                            color: categoryColor
                        } : null}
                        onChange={(selected: any) => {
                            if (selected) {
                                handleCategorySelect(selected);
                            } else {
                                setCategoryId('');
                                setCategoryName('');
                                setCategoryImage('');
                                setCategoryColor('');
                                setCategorySearch('');
                                setSelectedCategory(null);
                            }
                        }}
                        placeholder="Buscar categoría..."
                        components={{
                            Option: CategoryOption,
                            SingleValue: CategorySingleValue
                        }}
                        isClearable
                        menuPlacement="auto"
                        menuPortalTarget={document.body}
                        menuPosition="fixed" // Crucial for breaking out of overflow:hidden modals
                    />
                </div>

                {/* Subcategory */}
                {(type === TransactionType.NUMBER_0 || type === TransactionType.NUMBER_1) && (
                    <div className="transaction-modal__field">
                        <label className="transaction-modal__label">Subcategoría (Opcional)</label>
                        <Select
                            styles={customSelectStyles}
                            options={selectedCategory?.subcategories?.map(sub => ({
                                value: sub,
                                label: sub
                            })) || []}
                            value={subcategory ? { value: subcategory, label: subcategory } : null}
                            onChange={(selected: any) => setSubcategory(selected ? selected.value : '')}
                            placeholder="Ej. Internet, Comida..."
                            isClearable
                            menuPlacement="auto"
                            menuPortalTarget={document.body}
                            menuPosition="fixed"
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

                {type === TransactionType.NUMBER_0 && !transaction?.isMonthly && (
                    <div className="transaction-modal__field">
                        <label className="transaction-modal__toggle-label">
                            <input
                                type="checkbox"
                                className="transaction-modal__toggle-input"
                                checked={removeFromSpendingPlan}
                                onChange={(e) => setRemoveFromSpendingPlan(e.target.checked)}
                            />
                            <div className="transaction-modal__toggle-switch">
                                <div className="transaction-modal__toggle-handle" />
                            </div>
                            <span>Excluir del plan de gastos</span>
                        </label>
                    </div>
                )}

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
