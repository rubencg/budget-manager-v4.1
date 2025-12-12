import React, { useState } from 'react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { Category } from '../../api-client';
import { useCategoryMutations } from '../../hooks/useCategoryMutations';
import './CategoryModal.css'; // Reusing styles

interface SubcategoryModalProps {
    isOpen: boolean;
    onClose: () => void;
    category: Category;
}

export const SubcategoryModal: React.FC<SubcategoryModalProps> = ({
    isOpen,
    onClose,
    category
}) => {
    const { updateCategory } = useCategoryMutations();
    const [subcategoryName, setSubcategoryName] = useState('');

    const handleSubmit = async () => {
        if (!category.id || !subcategoryName.trim()) return;

        const updatedSubcategories = [...(category.subcategories || []), subcategoryName.trim()];
        const categoryTypeReceived = category.categoryType === 0 ? 'expense' : 'income'; // 0 is Expense, 1 is Income as per enum

        try {
            await updateCategory.mutateAsync({
                id: category.id,
                command: {
                    name: category.name,
                    image: category.image,
                    color: category.color,
                    categoryType: category.categoryType,
                    subcategories: updatedSubcategories
                }
            });
            setSubcategoryName('');
            onClose();
        } catch (error) {
            console.error('Failed to add subcategory:', error);
        }
    };

    const isValid = subcategoryName.trim().length > 0;
    const isSaving = updateCategory.isPending;

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={`Agregar Subcategoría a ${category.name}`}
        >
            <div className="category-modal__form">
                <div className="category-modal__field">
                    <label className="category-modal__label">Nombre</label>
                    <input
                        className="category-modal__input"
                        type="text"
                        value={subcategoryName}
                        onChange={(e) => setSubcategoryName(e.target.value)}
                        placeholder="Ej. Mantenimiento"
                        autoFocus
                    />
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
