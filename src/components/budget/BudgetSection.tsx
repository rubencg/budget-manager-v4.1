
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import './BudgetSection.css';

interface BudgetSectionProps {
    title: string;
    total: number;
    children: React.ReactNode;
    defaultOpen?: boolean;
}

export const BudgetSection: React.FC<BudgetSectionProps> = ({
    title,
    total,
    children,
    defaultOpen = true
}) => {
    const [isOpen, setIsOpen] = useState(defaultOpen);

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2
        }).format(amount);
    };

    return (
        <div className="budget-section">
            <div
                className="budget-section__header"
                onClick={() => setIsOpen(!isOpen)}
            >
                <div className="budget-section__title-group">
                    <h2 className="budget-section__title">{title}</h2>
                    <span className="budget-section__toggle">
                        <FontAwesomeIcon icon={isOpen ? faChevronDown : faChevronUp} />
                    </span>
                </div>
                <div className="budget-section__total">
                    {formatCurrency(total)}
                </div>
            </div>

            {isOpen && (
                <div className="budget-section__content">
                    {children}
                </div>
            )}
        </div>
    );
};
