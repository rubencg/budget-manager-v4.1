import React from 'react';
import './StatusBadge.css';
import { StatusBadgeVariant } from '../../types';

interface StatusBadgeProps {
  variant: StatusBadgeVariant;
  children: React.ReactNode;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ variant, children }) => {
  return (
    <span className={`status-badge status-badge--${variant}`}>
      {children}
    </span>
  );
};
