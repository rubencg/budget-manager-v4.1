import React, { useState, useEffect, useRef } from 'react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { ExpenseCategoryIcons } from '../categories/expense-category-icons'; // User wanted expense icons
import { HexColorPicker } from 'react-colorful';
import { useSavingMutations } from '../../hooks/useSavingMutations';
import { Saving } from '../../api-client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconName } from '@fortawesome/fontawesome-svg-core';
import '../categories/CategoryModal.css';

interface SavingsModalProps {
    isOpen: boolean;
    onClose: () => void;
    saving?: Saving | null;
}

export const SavingsModal: React.FC<SavingsModalProps> = ({ isOpen, onClose, saving }) => {
    const nameInputRef = useRef<HTMLInputElement>(null);
    const { createSaving, updateSaving } = useSavingMutations();

    const [name, setName] = useState('');
    const [goalAmount, setGoalAmount] = useState('');
    const [savedAmount, setSavedAmount] = useState('');
    const [amountPerMonth, setAmountPerMonth] = useState('');
    const [selectedIcon, setSelectedIcon] = useState('');
    const [color, setColor] = useState('#fff300');
    const [showColorPicker, setShowColorPicker] = useState(false);

    useEffect(() => {
        if (isOpen) {
            if (saving) {
                // Edit Mode
                setName(saving.name || '');
                setGoalAmount(saving.goalAmount?.toString() || '');
                setSavedAmount(saving.savedAmount?.toString() || '');
                setAmountPerMonth(saving.amountPerMonth?.toString() || '');
                setSelectedIcon(saving.icon || '');
                setColor(saving.color || '#fff300');
            } else {
                // Create Mode
                setName('');
                setGoalAmount('');
                setSavedAmount('');
                setAmountPerMonth('');
                setSelectedIcon(ExpenseCategoryIcons[0] as string); // Default icon
                setColor('#fff300');
            }
            setShowColorPicker(false);

            // Focus after modal is open, but prevent scroll jump
            setTimeout(() => {
                nameInputRef.current?.focus({ preventScroll: true });
            }, 100);
        }
    }, [isOpen, saving]);

    const handleSubmit = async () => {
        try {
            const payload = {
                name,
                goalAmount: parseFloat(goalAmount) || 0,
                savedAmount: parseFloat(savedAmount) || 0,
                amountPerMonth: parseFloat(amountPerMonth) || 0,
                icon: selectedIcon,
                color
            };

            if (saving && saving.id) {
                await updateSaving.mutateAsync({
                    id: saving.id,
                    command: payload
                });
            } else {
                await createSaving.mutateAsync(payload);
            }
            onClose();
        } catch (error) {
            console.error('Failed to save saving:', error);
        }
    };

    const isValid = name.trim().length > 0 &&
        !isNaN(parseFloat(goalAmount)) &&
        !isNaN(parseFloat(savedAmount)) &&
        !isNaN(parseFloat(amountPerMonth)) &&
        selectedIcon.length > 0;

    const isSaving = createSaving.isPending || updateSaving.isPending;

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={saving ? 'Editar ahorro' : 'Nuevo ahorro'}
        >
            <div className="category-modal__form">
                {/* Name */}
                <div className="category-modal__field">
                    <label className="category-modal__label">Nombre</label>
                    <input
                        ref={nameInputRef}
                        className="category-modal__input"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Nombre del ahorro"
                    />
                </div>

                {/* Goal Amount */}
                <div className="category-modal__field">
                    <label className="category-modal__label">Objetivo</label>
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
                            className="category-modal__input"
                            type="number"
                            step="any"
                            value={goalAmount}
                            onChange={(e) => setGoalAmount(e.target.value)}
                            placeholder="0.00"
                            style={{ paddingLeft: '2rem' }}
                        />
                    </div>
                </div>

                {/* Saved Amount */}
                <div className="category-modal__field">
                    <label className="category-modal__label">Ahorrado</label>
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
                            className="category-modal__input"
                            type="number"
                            step="any"
                            value={savedAmount}
                            onChange={(e) => setSavedAmount(e.target.value)}
                            placeholder="0.00"
                            style={{ paddingLeft: '2rem' }}
                        />
                    </div>
                </div>

                {/* Amount Per Month */}
                <div className="category-modal__field">
                    <label className="category-modal__label">Cantidad por mes</label>
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
                            className="category-modal__input"
                            type="number"
                            step="any"
                            value={amountPerMonth}
                            onChange={(e) => setAmountPerMonth(e.target.value)}
                            placeholder="0.00"
                            style={{ paddingLeft: '2rem' }}
                        />
                    </div>
                </div>

                {/* Color (Before Icon as requested) */}
                <div className="category-modal__field">
                    <label className="category-modal__label">Color</label>
                    <div className="category-modal__color-section">
                        <div className="category-modal__color-picker-wrapper">
                            <div
                                className="category-modal__color-preview"
                                style={{ backgroundColor: color }}
                                onClick={() => setShowColorPicker(!showColorPicker)}
                            >
                                {color}
                            </div>
                            {showColorPicker && (
                                <div className="category-modal__color-popover">
                                    <div
                                        className="category-modal__color-cover"
                                        onClick={() => setShowColorPicker(false)}
                                    />
                                    <HexColorPicker color={color} onChange={setColor} />
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Icon */}
                <div className="category-modal__field">
                    <label className="category-modal__label">Ícono</label>
                    <div className="category-modal__icons-grid">
                        {ExpenseCategoryIcons.map((icon) => (
                            <div
                                key={icon as string}
                                className={`category-modal__icon-option ${selectedIcon === icon ? 'selected' : ''}`}
                                onClick={() => setSelectedIcon(icon as string)}
                            >
                                <FontAwesomeIcon icon={['fas', icon as IconName]} />
                            </div>
                        ))}
                    </div>
                </div>

                <div className="category-modal__actions">
                    <Button variant="secondary" onClick={onClose} disabled={isSaving}>
                        CANCELAR
                    </Button>
                    <Button
                        variant="primary"
                        onClick={handleSubmit}
                        disabled={!isValid || isSaving}
                    >
                        {isSaving ? (saving ? 'ACTUALIZANDO...' : 'GUARDANDO...') : (saving ? 'ACTUALIZAR' : 'GUARDAR')}
                    </Button>
                </div>
            </div>
        </Modal>
    );
};
