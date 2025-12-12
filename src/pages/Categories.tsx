import React, { useState } from 'react';
import { Category } from '../api-client';
import { Button } from '../components/ui/Button';
import { CategoryList } from '../components/categories/CategoryList';
import './Categories.css';
import { useCategoriesQuery } from '../hooks/useCategoriesQuery';
import { CategoryModal } from '../components/categories/CategoryModal';
import { SubcategoryModal } from '../components/categories/SubcategoryModal';
import { useCategoryMutations } from '../hooks/useCategoryMutations';
import { Modal } from '../components/ui/Modal';

type TabType = 'expense' | 'income';

export const Categories: React.FC = () => {
    const [activeTab, setActiveTab] = useState<TabType>('expense');
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 20;

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingCategory, setEditingCategory] = useState<Category | undefined>(undefined);

    const handleEditClick = (category: Category) => {
        setEditingCategory(category);
        setIsModalOpen(true);
    };

    const handleCreateClick = () => {
        setEditingCategory(undefined);
        setIsModalOpen(true);
    };

    const { data: expenses = [], isLoading: isLoadingExpenses } = useCategoriesQuery('expense');
    const { data: incomes = [], isLoading: isLoadingIncomes } = useCategoriesQuery('income');

    const isLoading = isLoadingExpenses || isLoadingIncomes;

    const currentList = activeTab === 'expense' ? expenses : incomes;
    const totalItems = currentList.length;
    const totalPages = Math.ceil(totalItems / pageSize);

    // Safe slice
    const paginatedList = currentList.slice(
        (currentPage - 1) * pageSize,
        currentPage * pageSize
    );

    const handleTabChange = (tab: TabType) => {
        setActiveTab(tab);
        setCurrentPage(1); // Reset page on tab switch
    };

    // Delete logic
    const { deleteCategory } = useCategoryMutations();
    const [categoryToDelete, setCategoryToDelete] = useState<Category | null>(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const handleDeleteClick = (category: Category) => {
        setCategoryToDelete(category);
        setIsDeleteModalOpen(true);
    };

    const confirmDelete = async () => {
        if (categoryToDelete && categoryToDelete.id) {
            try {
                await deleteCategory.mutateAsync(categoryToDelete.id);
                setIsDeleteModalOpen(false);
                setCategoryToDelete(null);
            } catch (error) {
                console.error("Failed to delete category", error);
            }
        }
    };

    // Subcategory logic
    const [subcategoryCategory, setSubcategoryCategory] = useState<Category | null>(null);
    const [isSubcategoryModalOpen, setIsSubcategoryModalOpen] = useState(false);

    const handleAddSubcategoryClick = (category: Category) => {
        setSubcategoryCategory(category);
        setIsSubcategoryModalOpen(true);
    };

    return (
        <div className="categories-page">
            <div className="categories-page__header">
                <div className="categories-page__title-row">
                    <h1>Categorías</h1>
                    <Button variant="primary" onClick={handleCreateClick}>
                        Agregar Categoría de {activeTab == 'expense' ? 'Gastos' : 'Ingresos'}
                    </Button>
                </div>

                <div className="categories-page__tabs">
                    <button
                        className={`categories-page__tab ${activeTab === 'expense' ? 'categories-page__tab--active' : ''}`}
                        onClick={() => handleTabChange('expense')}
                    >
                        Gastos ({expenses.length})
                    </button>
                    <button
                        className={`categories-page__tab ${activeTab === 'income' ? 'categories-page__tab--active' : ''}`}
                        onClick={() => handleTabChange('income')}
                    >
                        Ingresos ({incomes.length})
                    </button>
                </div>
            </div>

            <div className="categories-page__content">
                {isLoading ? (
                    <p>Loading categories...</p>
                ) : (
                    <CategoryList
                        title={activeTab === 'expense' ? 'Gastos' : 'Ingresos'}
                        categories={paginatedList}
                        onDelete={handleDeleteClick}
                        onAddSubcategory={handleAddSubcategoryClick}
                        onEdit={handleEditClick}
                    />
                )}
            </div>

            {totalPages > 1 && (
                <div className="categories-page__pagination">
                    <Button
                        variant="secondary"
                        onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                        disabled={currentPage === 1}
                    >
                        Previous
                    </Button>
                    <span className="categories-page__pagination-info">
                        Page {currentPage} of {totalPages}
                    </span>
                    <Button
                        variant="secondary"
                        onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                        disabled={currentPage === totalPages}
                    >
                        Next
                    </Button>
                </div>
            )}

            <CategoryModal
                isOpen={isModalOpen}
                onClose={() => {
                    setIsModalOpen(false);
                    setEditingCategory(undefined);
                }}
                type={activeTab}
                category={editingCategory}
            />

            {subcategoryCategory && (
                <SubcategoryModal
                    isOpen={isSubcategoryModalOpen}
                    onClose={() => {
                        setIsSubcategoryModalOpen(false);
                        setSubcategoryCategory(null);
                    }}
                    category={subcategoryCategory}
                />
            )}

            {/* Delete Confirmation Modal */}
            <Modal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                title="Eliminar Categoría"
            >
                <div style={{ padding: '1rem 0' }}>
                    <p>¿Estás seguro de eliminar <strong>{categoryToDelete?.name}</strong>?</p>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1.5rem' }}>
                        <Button variant="secondary" onClick={() => setIsDeleteModalOpen(false)}>
                            Cancelar
                        </Button>
                        <Button
                            variant="primary"
                            style={{ backgroundColor: 'var(--color-error)', borderColor: 'var(--color-error)' }}
                            onClick={confirmDelete}
                            disabled={deleteCategory.isPending}
                        >
                            {deleteCategory.isPending ? 'Eliminando...' : 'Eliminar'}
                        </Button>
                    </div>
                </div>
            </Modal>
        </div>
    );
};
