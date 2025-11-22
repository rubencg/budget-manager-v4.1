import React from 'react';
import './Card.css';
import { CardVariant } from '../../types';

interface CardProps {
  children: React.ReactNode;
  variant?: CardVariant;
  className?: string;
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({
  children,
  variant = 'default',
  className = '',
  onClick
}) => {
  return (
    <div
      className={`card card--${variant} ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};
