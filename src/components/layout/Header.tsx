import React from 'react';
import './Header.css';
import { UserProfile } from '../../types';
import { Avatar } from '../ui/Avatar';
import { Button } from '../ui/Button';

interface HeaderProps {
  user: UserProfile;
}

export const Header: React.FC<HeaderProps> = ({ user }) => {
  return (
    <header className="header">
      <div className="header__search">
        <span className="header__search-icon">🔍</span>
        <input
          type="text"
          placeholder="Search or type command"
          className="header__search-input"
        />
        <kbd className="header__search-kbd">F</kbd>
      </div>

      <div className="header__actions">
        <div className="header__notification">
          <Button variant="icon">
            <span className="header__notification-icon">🔔</span>
          </Button>
          <span className="header__notification-badge">2 New</span>
        </div>

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
