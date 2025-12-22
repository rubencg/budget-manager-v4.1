import React, { useState, useEffect, useRef } from 'react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { Category } from '../../api-client';
import { ExpenseCategoryIcons } from './expense-category-icons';
import { IncomeCategoryIcons } from './income-category-icons';
import { HexColorPicker } from 'react-colorful';
import { useCategoryMutations } from '../../hooks/useCategoryMutations';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconName } from '@fortawesome/fontawesome-svg-core';
import './CategoryModal.css';

interface CategoryModalProps {
    isOpen: boolean;
    onClose: () => void;
    category?: Category;
    type: 'expense' | 'income';
}

export const CategoryModal: React.FC<CategoryModalProps> = ({
    isOpen,
    onClose,
    category,
    type
}) => {
    const nameInputRef = useRef<HTMLInputElement>(null);
    const isEditing = !!category;
    const { createCategory, updateCategory } = useCategoryMutations();

    // State
    const [name, setName] = useState('');
    const [selectedIcon, setSelectedIcon] = useState('');
    const [color, setColor] = useState('#aabbcc');
    const [showColorPicker, setShowColorPicker] = useState(false);
    const [subcategories, setSubcategories] = useState<string[]>([]);
    const [subcategoryInput, setSubcategoryInput] = useState('');

    const icons = type === 'expense' ? ExpenseCategoryIcons : IncomeCategoryIcons;

    // Reset or populate form when opening
    useEffect(() => {
        if (isOpen) {
            if (category) {
                setName(category.name || '');
                setSelectedIcon(category.image || '');
                setColor(category.color || '#aabbcc');
                setSubcategories(category.subcategories || []);
            } else {
                setName('');
                setSelectedIcon('');
                setColor('#aabbcc');
                setSubcategories([]);
            }
            setSubcategoryInput('');
            setShowColorPicker(false);

            // Focus after modal is open, but prevent scroll jump
            setTimeout(() => {
                nameInputRef.current?.focus({ preventScroll: true });
            }, 100);
        }
    }, [isOpen, category]);

    const handleSubcategoryKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            const trimmed = subcategoryInput.trim();
            if (trimmed && !subcategories.includes(trimmed)) {
                setSubcategories([...subcategories, trimmed]);
                setSubcategoryInput('');
            }
        }
    };

    const removeSubcategory = (sub: string) => {
        setSubcategories(subcategories.filter(s => s !== sub));
    };

    const handleSubmit = async () => {
        const categoryType = type === 'expense' ? 0 : 1;

        try {
            if (isEditing && category && category.id) {
                await updateCategory.mutateAsync({
                    id: category.id,
                    command: {
                        name,
                        image: selectedIcon,
                        color: color,
                        categoryType,
                        subcategories
                    }
                });
            } else {
                await createCategory.mutateAsync({
                    name,
                    image: selectedIcon,
                    color: color,
                    categoryType,
                    subcategories
                });
            }
            onClose();
        } catch (error) {
            console.error('Failed to save category:', error);
            // Could add error handling UI here
        }
    };

    // Validation
    const isValid = name.trim().length > 0 && selectedIcon.length > 0;
    const isSaving = createCategory.isPending || updateCategory.isPending;

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={isEditing ? 'Editar Categoría' : 'Agregar Categoría'}
        >
            <div className="category-modal__form">
                <div className="category-modal__field">
                    <label className="category-modal__label">Nombre</label>
                    <input
                        ref={nameInputRef}
                        className="category-modal__input"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Ej. Comida, Transporte..."
                    />
                </div>

                <div className="category-modal__field">
                    <label className="category-modal__label">Ícono</label>
                    <div className="category-modal__icons-grid">
                        {icons.map((icon) => (
                            <div
                                key={`${icon}`}
                                className={`category-modal__icon-option ${selectedIcon === icon ? 'selected' : ''}`}
                                onClick={() => setSelectedIcon(icon as string)}
                            >
                                <FontAwesomeIcon icon={['fas', icon as IconName]} />
                            </div>
                        ))}
                    </div>
                </div>

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

                <div className="category-modal__field">
                    <label className="category-modal__label">Subcategorías</label>
                    <input
                        className="category-modal__input"
                        type="text"
                        value={subcategoryInput}
                        onChange={(e) => setSubcategoryInput(e.target.value)}
                        onKeyDown={handleSubcategoryKeyDown}
                        placeholder="Escribe y presiona Enter"
                    />
                    <div className="category-modal__subcategories">
                        {subcategories.map((sub) => (
                            <span key={sub} className="category-modal__badge">
                                {sub}
                                <span
                                    className="category-modal__badge-remove"
                                    onClick={() => removeSubcategory(sub)}
                                >
                                    &times;
                                </span>
                            </span>
                        ))}
                    </div>
                </div>

                <div className="category-modal__actions">
                    <Button variant="secondary" onClick={onClose} disabled={isSaving}>
                        Cancelar
                    </Button>
                    <Button
                        variant="primary"
                        onClick={handleSubmit}
                        disabled={!isValid || isSaving}
                    >
                        {isSaving ? 'Guardando...' : 'Guardar'}
                    </Button>
                </div>
            </div>
        </Modal>
    );
};
