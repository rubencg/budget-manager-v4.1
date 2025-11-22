import React from 'react';
import './MetricDisplay.css';

interface MetricDisplayProps {
  value: string | number;
  label?: string;
  prefix?: string;
  suffix?: string;
  size?: 'small' | 'medium' | 'large';
  color?: string;
}

export const MetricDisplay: React.FC<MetricDisplayProps> = ({
  value,
  label,
  prefix = '',
  suffix = '',
  size = 'large',
  color
}) => {
  return (
    <div className="metric-display">
      {label && <div className="metric-display__label">{label}</div>}
      <div className={`metric-display__value metric-display__value--${size}`} style={{ color }}>
        {prefix}{value}{suffix}
      </div>
    </div>
  );
};
