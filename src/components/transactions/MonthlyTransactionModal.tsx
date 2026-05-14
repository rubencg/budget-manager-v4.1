import React, { useState, useEffect, useRef } from 'react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { Account } from '../../types';
import { useMonthlyTransactionMutations } from '../../hooks/useMonthlyTransactionMutations';
import { useCategoriesQuery } from '../../hooks/useCategoriesQuery';
import { Category, BudgetSectionItemDto } from '../../api-client';
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
import { MonthlyTransactionType } from '../../api-client/models/MonthlyTransactionType';
import Select, { StylesConfig, components, OptionProps } from 'react-select';
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

// Custom Option/SingleValue Components
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

    // Category State
    const [categoryId, setCategoryId] = useState('');
    const [categoryName, setCategoryName] = useState('');
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
                setCategoryId(entity.categoryId || '');
                setCategoryName(entity.categoryName || '');
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
                setCategoryId('');
                setCategoryName('');
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
    };

    const handleCategorySelect = (category: Category) => {
        setCategoryId(category.id || '');
        setCategoryName(category.name || '');
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
        parseFloat(amount) >= 0 &&
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
                <div className="monthly-transaction-modal__field">
                    <label className="monthly-transaction-modal__label">Categoría</label>
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
                            // Ideally these should come from state or lookup, but if missing on edit initially,
                            // visual might be slighty off until re-selected. 
                            // However, we can try to look it up if we have categories loaded.
                            image: categories?.find(c => c.id === categoryId)?.image || '',
                            color: categories?.find(c => c.id === categoryId)?.color || ''
                        } : null}
                        onChange={(selected: any) => {
                            if (selected) {
                                handleCategorySelect(selected);
                            } else {
                                setCategoryId('');
                                setCategoryName('');
                                setSelectedCategory(null);
                            }
                        }}
                        placeholder="Buscar categoría..."
                        components={{
                            Option: CategoryOption,
                            SingleValue: CategorySingleValue
                        }}
                        isClearable
                        menuPortalTarget={document.body}
                        menuPosition="fixed"
                    />
                </div>

                {/* Subcategory */}
                <div className="monthly-transaction-modal__field">
                    <label className="monthly-transaction-modal__label">Subcategoría (Opcional)</label>
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
                        menuPortalTarget={document.body}
                        menuPosition="fixed"
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
