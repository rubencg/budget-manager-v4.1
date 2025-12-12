import React, { useState } from 'react';
import { Category } from '../api-client';
import { Button } from '../components/ui/Button';
import { CategoryList } from '../components/categories/CategoryList';
import './Categories.css';
import { useCategoriesQuery } from '../hooks/useCategoriesQuery';
import { CategoryModal } from '../components/categories/CategoryModal';

type TabType = 'expense' | 'income';

export const Categories: React.FC = () => {
    const [activeTab, setActiveTab] = useState<TabType>('expense');
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 20;

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

    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div className="categories-page">
            <div className="categories-page__header">
                <div className="categories-page__title-row">
                    <h1>Categorías</h1>
                    <Button variant="primary" onClick={() => setIsModalOpen(true)}>
                        Agregar Categoría
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
                onClose={() => setIsModalOpen(false)}
                type={activeTab}
            />
        </div>
    );
};
