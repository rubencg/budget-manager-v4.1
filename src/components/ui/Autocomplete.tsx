import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import './Autocomplete.css';

interface AutocompleteProps<T> {
    options: T[];
    value: string;
    onChange: (value: string) => void;
    onSelect: (item: T) => void;
    getLabel: (item: T) => string;
    renderOption?: (item: T) => React.ReactNode;
    placeholder?: string;
    icon?: IconProp;
    filterFunction?: (item: T, searchTerm: string) => boolean;
}

export function Autocomplete<T>({
    options,
    value,
    onChange,
    onSelect,
    getLabel,
    renderOption,
    placeholder,
    icon,
    filterFunction
}: AutocompleteProps<T>) {
    const [isOpen, setIsOpen] = useState(false);
    const [highlightedIndex, setHighlightedIndex] = useState(-1);
    const wrapperRef = useRef<HTMLDivElement>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Filter options
    const filteredOptions = filterFunction
        ? options.filter(item => filterFunction(item, value))
        : options.filter(item => getLabel(item).toLowerCase().includes(value.toLowerCase()));

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // Scroll to highlighted item
    useEffect(() => {
        if (isOpen && dropdownRef.current && highlightedIndex >= 0) {
            const item = dropdownRef.current.children[highlightedIndex] as HTMLElement;
            if (item) {
                item.scrollIntoView({ block: 'nearest' });
            }
        }
    }, [highlightedIndex, isOpen]);

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            setHighlightedIndex(prev =>
                prev < filteredOptions.length - 1 ? prev + 1 : prev
            );
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            setHighlightedIndex(prev => prev > 0 ? prev - 1 : prev);
        } else if (e.key === 'Enter') {
            e.preventDefault();
            if (filteredOptions.length > 0) {
                // If nothing highlighted, select the first one, otherwise select highlighted
                const index = highlightedIndex >= 0 ? highlightedIndex : 0;
                const selected = filteredOptions[index];
                onSelect(selected);
                onChange(getLabel(selected));
                setIsOpen(false);
            }
        } else if (e.key === 'Escape') {
            setIsOpen(false);
        } else if (e.key === 'Tab') {
            if (isOpen && filteredOptions.length > 0) {
                // Select on Tab (same logic as Enter but no preventDefault)
                const index = highlightedIndex >= 0 ? highlightedIndex : 0;
                const selected = filteredOptions[index];
                onSelect(selected);
                onChange(getLabel(selected));
                setIsOpen(false);
            } else {
                setIsOpen(false);
            }
        }
    };

    return (
        <div className="autocomplete-wrapper" ref={wrapperRef}>
            <div className="autocomplete-input-container">
                {icon && (
                    <FontAwesomeIcon
                        icon={icon}
                        className="autocomplete-icon"
                    />
                )}
                <input
                    className="autocomplete-input"
                    type="text"
                    value={value}
                    onChange={(e) => {
                        onChange(e.target.value);
                        setIsOpen(true);
                        setHighlightedIndex(0); // Auto-highlight first option when typing
                    }}
                    onFocus={() => setIsOpen(true)}
                    onBlur={() => setIsOpen(false)}
                    onKeyDown={handleKeyDown}
                    placeholder={placeholder}
                    style={!icon ? { paddingLeft: '0.75rem' } : undefined}
                />
            </div>

            {isOpen && (
                <div className="autocomplete-dropdown" ref={dropdownRef}>
                    {filteredOptions.length > 0 ? (
                        filteredOptions.map((item, index) => (
                            <div
                                key={index}
                                className={`autocomplete-option ${index === highlightedIndex ? 'selected' : ''}`}
                                onMouseDown={(e) => e.preventDefault()}
                                onClick={() => {
                                    onSelect(item);
                                    onChange(getLabel(item));
                                    setIsOpen(false);
                                }}
                                onMouseEnter={() => setHighlightedIndex(index)}
                            >
                                {renderOption ? renderOption(item) : getLabel(item)}
                            </div>
                        ))
                    ) : (
                        <div className="autocomplete-empty">
                            No se encontraron resultados
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
