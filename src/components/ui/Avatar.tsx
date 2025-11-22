import React from 'react';
import './Avatar.css';

interface AvatarProps {
  src?: string;
  alt: string;
  size?: 'small' | 'medium' | 'large' | 'xlarge';
  fallback?: string;
}

export const Avatar: React.FC<AvatarProps> = ({
  src,
  alt,
  size = 'medium',
  fallback
}) => {
  return (
    <div className={`avatar avatar--${size}`}>
      {src ? (
        <img src={src} alt={alt} className="avatar__image" />
      ) : (
        <div className="avatar__fallback">
          {fallback || alt.charAt(0).toUpperCase()}
        </div>
      )}
    </div>
  );
};
