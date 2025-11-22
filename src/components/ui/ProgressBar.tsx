import React from 'react';
import './ProgressBar.css';

interface ProgressBarProps {
  percentage: number;
  gradient?: string;
  height?: number;
  showLabel?: boolean;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  percentage,
  gradient = 'var(--gradient-cyan)',
  height = 8,
  showLabel = false
}) => {
  const clampedPercentage = Math.min(100, Math.max(0, percentage));

  return (
    <div className="progress-bar">
      <div className="progress-bar__track" style={{ height: `${height}px` }}>
        <div
          className="progress-bar__fill"
          style={{
            width: `${clampedPercentage}%`,
            background: gradient
          }}
        />
      </div>
      {showLabel && (
        <div className="progress-bar__label">{clampedPercentage}%</div>
      )}
    </div>
  );
};
