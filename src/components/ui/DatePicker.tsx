import React, { forwardRef } from 'react';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import './DatePicker.css';

interface DatePickerProps {
    selected: Date | null;
    onChange: (date: Date | null) => void;
    placeholderText?: string;
    label?: string;
}

export const DatePicker: React.FC<DatePickerProps> = ({
    selected,
    onChange,
    placeholderText = 'Seleccionar fecha',
    label
}) => {
    const CustomInput = forwardRef<HTMLDivElement, any>(({ value, onClick, onKeyDown }, ref) => (
        <div
            className="custom-date-picker__input"
            onClick={onClick}
            onKeyDown={(e) => {
                if (e.key === ' ' || e.key === 'Enter') {
                    e.preventDefault();
                    onClick();
                }
                onKeyDown?.(e);
            }}
            ref={ref}
            tabIndex={0}
            role="button"
            aria-label={label || 'Seleccionar fecha'}
        >
            <span className="custom-date-picker__value">
                {value || placeholderText}
            </span>
            <FontAwesomeIcon icon={faCalendarAlt} className="custom-date-picker__icon" />
        </div>
    ));

    return (
        <div className="custom-date-picker">
            {label && <label className="custom-date-picker__label">{label}</label>}
            <ReactDatePicker
                selected={selected}
                onChange={onChange}
                dateFormat="dd/MM/yyyy"
                customInput={<CustomInput />}
                popperPlacement="bottom-start"
                // This helps with keyboard navigation in the calendar
                focusSelectedMonth={true}
                showPopperArrow={false}
            />
        </div>
    );
};
