import React from 'react';
import './Header.css';
import { UserProfile } from '../../types';
import { Avatar } from '../ui/Avatar';

interface HeaderProps {
  user: UserProfile;
}

export const Header: React.FC<HeaderProps> = ({ user }) => {
  return (
    <header className="header">
      <div className="header__actions">
        <div className="header__user">
          <Avatar src={user.avatar} alt={user.name} size="large" />
          <div className="header__user-info">
            <div className="header__user-greeting">{user.greeting}</div>
            <div className="header__user-name">{user.name}</div>
          </div>
        </div>
      </div>
    </header>
  );
};
