import React from 'react';
import { Category } from '../../api-client';
import { Button } from '../ui/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp, findIconDefinition, IconPrefix } from '@fortawesome/fontawesome-svg-core';
import './CategoryList.css';

interface CategoryListProps {
    title: string;
    categories: Category[];
}

export const CategoryList: React.FC<CategoryListProps> = ({ title, categories }) => {

    const getIcon = (iconName: string | null | undefined): IconProp => {
        const prefix: IconPrefix = 'fas';
        const icon = iconName ? findIconDefinition({ prefix, iconName: iconName as any }) : null;
        return icon || ['fas', 'question-circle'];
    };

    return (
        <div className="category-list">
            <h3 className="category-list__title">{title}</h3>
            <div className="category-list__items">
                {categories.map((category) => (
                    <div key={category.id} className="category-item">
                        <div
                            className="category-item__icon-wrapper"
                            style={{ backgroundColor: category.color || 'var(--bg-tertiary)' }}
                        >
                            <FontAwesomeIcon icon={getIcon(category.image)} />
                        </div>

                        <div className="category-item__content">
                            <span className="category-item__name">{category.name}</span>
                            {category.subcategories && category.subcategories.length > 0 && (
                                <span className="category-item__meta">{category.subcategories.length} subcategories</span>
                            )}
                        </div>

                        <div className="category-item__actions">
                            <Button variant="icon" title="Edit">✏️</Button>
                            <Button variant="icon" title="Add Subcategory">➕</Button>
                            <Button variant="icon" title="Delete" style={{ color: 'var(--color-error)' }}>🗑️</Button>
                        </div>
                    </div>
                ))}
                {categories.length === 0 && (
                    <div style={{ color: 'var(--text-tertiary)', padding: '20px', textAlign: 'center' }}>
                        No categories found.
                    </div>
                )}
            </div>
        </div>
    );
};
