import React from 'react';
import './Button.css';
import { ButtonVariant } from '../../types';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  fullWidth?: boolean;
  icon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  className = '',
  fullWidth = false,
  icon,
  ...props
}) => {
  return (
    <button
      className={`button button--${variant} ${fullWidth ? 'button--full-width' : ''} ${className}`}
      {...props}
    >
      {icon && <span className="button__icon">{icon}</span>}
      {children}
    </button>
  );
};
