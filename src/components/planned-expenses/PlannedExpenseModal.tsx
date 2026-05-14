import React, { useState, useEffect, useRef } from 'react';
import { DatePicker } from '../ui/DatePicker';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { useCategoriesQuery } from '../../hooks/useCategoriesQuery';
import { usePlannedExpenseMutations } from '../../hooks/usePlannedExpenseMutations';
import { PlannedExpense, Category } from '../../api-client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { findIconDefinition, IconPrefix, IconName } from '@fortawesome/fontawesome-svg-core';
import { faTag, faBuildingColumns } from '@fortawesome/free-solid-svg-icons';
import Select, { StylesConfig, components, OptionProps } from 'react-select';
import './PlannedExpenseModal.css';

interface PlannedExpenseModalProps {
    isOpen: boolean;
    onClose: () => void;
    plannedExpense?: PlannedExpense | null;
}

const getIcon = (iconName: string | null | undefined) => {
    const prefix: IconPrefix = 'fas';
    const icon = iconName ? findIconDefinition({ prefix, iconName: iconName as any }) : null;
    return icon || ['fas', 'question-circle'] as [IconPrefix, IconName];
};

// React Select Custom Styles (Same as TransactionModal)
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

export const PlannedExpenseModal: React.FC<PlannedExpenseModalProps> = ({ isOpen, onClose, plannedExpense }) => {
    const amountInputRef = useRef<HTMLInputElement>(null);
    const { createPlannedExpense, updatePlannedExpense } = usePlannedExpenseMutations();
    const { data: categories } = useCategoriesQuery('expense');

    const [amount, setAmount] = useState('');
    const [isRecurring, setIsRecurring] = useState(false);
    const [name, setName] = useState('');
    const [date, setDate] = useState<Date | null>(new Date());
    const [dayOfMonth, setDayOfMonth] = useState<number>(1);

    const [categoryId, setCategoryId] = useState('');
    const [categoryName, setCategoryName] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

    const [subcategory, setSubcategory] = useState('');

    useEffect(() => {
        if (isOpen) {
            if (plannedExpense) {
                // Edit Mode
                setAmount(plannedExpense.totalAmount?.toString() || '');
                setIsRecurring(plannedExpense.isRecurring || false);
                setName(plannedExpense.name || '');

                if (plannedExpense.date) {
                    setDate(new Date(plannedExpense.date));
                } else {
                    setDate(new Date());
                }

                if (plannedExpense.dayOfMonth) {
                    setDayOfMonth(plannedExpense.dayOfMonth);
                } else {
                    setDayOfMonth(1);
                }

                setCategoryId(plannedExpense.categoryId || '');
                setCategoryName(plannedExpense.categoryName || '');
                setSubcategory(plannedExpense.subCategory || '');

                // Find and set selected category object to enable subcategories
                if (categories && plannedExpense.categoryId) {
                    const cat = categories.find(c => c.id === plannedExpense.categoryId);
                    setSelectedCategory(cat || null);
                }

            } else {
                // Create Mode
                setAmount('');
                setIsRecurring(false);
                setName('');
                setDate(new Date());
                setDayOfMonth(1);
                setCategoryId('');
                setCategoryName('');
                setSelectedCategory(null);
                setSubcategory('');
            }

            // Focus after modal is open, but prevent scroll jump
            setTimeout(() => {
                amountInputRef.current?.focus({ preventScroll: true });
            }, 100);
        }
    }, [isOpen, plannedExpense, categories]);

    const handleCategorySelect = (category: Category) => {
        setCategoryId(category.id || '');
        setCategoryName(category.name || '');
        setCategoryName(category.name || '');
        setSelectedCategory(category);
        setSubcategory(''); // Reset subcategory when category changes
    };

    const handleSubmit = async () => {
        try {
            const commonData = {
                name,
                totalAmount: parseFloat(amount),
                isRecurring,
                categoryId,
                categoryName,
                categoryImage: selectedCategory?.image || '',
                categoryColor: selectedCategory?.color || '',
                subCategory: subcategory,
            };

            const payload = isRecurring
                ? { ...commonData, dayOfMonth, date: null }
                : { ...commonData, date: date, dayOfMonth: null };

            if (plannedExpense && plannedExpense.id) {
                await updatePlannedExpense.mutateAsync({
                    plannedExpenseId: plannedExpense.id,
                    ...payload
                });
            } else {
                await createPlannedExpense.mutateAsync(payload);
            }
            onClose();
        } catch (error) {
            console.error('Failed to save planned expense:', error);
        }
    };

    const isValid = amount.trim().length > 0 &&
        !isNaN(parseFloat(amount)) &&
        parseFloat(amount) >= 0 &&
        name.trim().length > 0 &&
        categoryId.length > 0 &&
        (!isRecurring ? !!date : true); // Date required if not recurring

    const isSaving = createPlannedExpense.isPending || updatePlannedExpense.isPending;

    // Generate days 1-28
    const daysOfMonth = Array.from({ length: 28 }, (_, i) => i + 1);

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={plannedExpense ? 'Editar gasto planeado' : 'Nuevo gasto planeado'}
        >
            <div className="planned-expense-modal__form">

                {/* Row 1: Amount & Recurring Toggle */}
                <div className="planned-expense-modal__row">
                    <div className="planned-expense-modal__amount-container">
                        <label className="planned-expense-modal__label">Cantidad</label>
                        <div style={{ position: 'relative', marginTop: '0.5rem' }}>
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
                                className="planned-expense-modal__input"
                                type="number"
                                step="any"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                placeholder="0.00"
                                style={{ paddingLeft: '2rem' }}
                            />
                        </div>
                    </div>

                    <div
                        className="planned-expense-modal__toggle-container"
                        onClick={() => setIsRecurring(!isRecurring)}
                        tabIndex={0}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                                e.preventDefault();
                                setIsRecurring(!isRecurring);
                            }
                        }}
                        role="button"
                        aria-pressed={isRecurring}
                    >
                        <div className={`planned-expense-modal__toggle ${isRecurring ? 'active' : ''}`}>
                            <div className="planned-expense-modal__toggle-handle" />
                        </div>
                        <span className="planned-expense-modal__label" style={{ cursor: 'pointer', color: 'var(--text-primary)' }}>
                            No recurrente
                        </span>
                    </div>
                </div>

                {/* Name */}
                <div className="planned-expense-modal__field">
                    <label className="planned-expense-modal__label">Nombre</label>
                    <input
                        className="planned-expense-modal__input"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Nombre del gasto"
                    />
                </div>

                {/* Date or Day of Month */}
                <div className="planned-expense-modal__field">
                    <label className="planned-expense-modal__label">
                        {isRecurring ? 'Día del mes' : 'Fecha'}
                    </label>
                    {isRecurring ? (
                        <select
                            className="planned-expense-modal__select"
                            value={dayOfMonth}
                            onChange={(e) => setDayOfMonth(parseInt(e.target.value))}
                        >
                            {daysOfMonth.map(day => (
                                <option key={day} value={day}>{day}</option>
                            ))}
                        </select>
                    ) : (
                        <div className="transfer-modal__datepicker-wrapper">
                            <DatePicker
                                selected={date}
                                onChange={(date: Date | null) => setDate(date)}
                                label=""
                                placeholderText="Seleccionar fecha"
                            />
                        </div>
                    )}
                </div>

                {/* Category */}
                <div className="planned-expense-modal__field">
                    <label className="planned-expense-modal__label">Categoría</label>
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
                <div className="planned-expense-modal__field">
                    <label className="planned-expense-modal__label">Subcategoría (Opcional)</label>
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

                {/* Actions */}
                <div className="planned-expense-modal__actions">
                    <Button
                        variant="primary"
                        onClick={handleSubmit}
                        disabled={!isValid || isSaving}
                    >
                        {isSaving ? (plannedExpense ? 'ACTUALIZANDO...' : 'GUARDANDO...') : (plannedExpense ? 'ACTUALIZAR' : 'GUARDAR')}
                    </Button>
                    <Button variant="secondary" onClick={onClose} disabled={isSaving}>
                        CANCELAR
                    </Button>
                </div>

            </div>
        </Modal>
    );
};
