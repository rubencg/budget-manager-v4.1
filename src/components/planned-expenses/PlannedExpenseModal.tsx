import React, { useState, useEffect, useRef } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { Autocomplete } from '../ui/Autocomplete';
import { useCategoriesQuery } from '../../hooks/useCategoriesQuery';
import { usePlannedExpenseMutations } from '../../hooks/usePlannedExpenseMutations';
import { PlannedExpense, Category } from '../../api-client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconName } from '@fortawesome/fontawesome-svg-core';
import { faTag, faBuildingColumns } from '@fortawesome/free-solid-svg-icons';
import './PlannedExpenseModal.css';

interface PlannedExpenseModalProps {
    isOpen: boolean;
    onClose: () => void;
    plannedExpense?: PlannedExpense | null;
}

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
    const [categorySearch, setCategorySearch] = useState('');
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
                setCategorySearch(plannedExpense.categoryName || '');
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
                setCategorySearch('');
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
        setCategorySearch(category.name || '');
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
        parseFloat(amount) > 0 &&
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
                                dateFormat="dd/MM/yyyy"
                                className="planned-expense-modal__input"
                                placeholderText="Seleccionar fecha"
                            />
                        </div>
                    )}
                </div>

                {/* Category */}
                <div className="planned-expense-modal__field">
                    <label className="planned-expense-modal__label">Categoría</label>
                    <Autocomplete<Category>
                        options={categories || []}
                        value={categorySearch}
                        onChange={setCategorySearch}
                        onSelect={handleCategorySelect}
                        getLabel={(cat) => cat.name || ''}
                        icon={faTag}
                        placeholder="Buscar categoría..."
                        renderOption={(category) => (
                            <div className="planned-expense-modal__autocomplete-option" style={{ padding: 0 }}>
                                <div
                                    className="planned-expense-modal__autocomplete-option-icon"
                                    style={{ backgroundColor: category.color || '#ccc' }}
                                >
                                    <FontAwesomeIcon icon={['fas', (category.image as IconName) || 'tag']} />
                                </div>
                                <div className="planned-expense-modal__autocomplete-option-text">
                                    <span className="planned-expense-modal__autocomplete-option-name">
                                        {category.name}
                                    </span>
                                </div>
                            </div>
                        )}
                    />
                </div>

                {/* Subcategory */}
                {selectedCategory && selectedCategory.subcategories && selectedCategory.subcategories.length > 0 && (
                    <div className="planned-expense-modal__field">
                        <label className="planned-expense-modal__label">Subcategoría</label>
                        <select
                            className="planned-expense-modal__select"
                            value={subcategory}
                            onChange={(e) => setSubcategory(e.target.value)}
                        >
                            <option value="">Seleccionar subcategoría</option>
                            {selectedCategory.subcategories.map((sub, index) => (
                                <option key={index} value={sub}>{sub}</option>
                            ))}
                        </select>
                    </div>
                )}

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
