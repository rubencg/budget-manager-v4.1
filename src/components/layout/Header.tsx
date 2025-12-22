import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import './Header.css';
import { UserProfile } from '../../types';
import { Avatar } from '../ui/Avatar';

import { faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface HeaderProps {
  user: UserProfile;
  onMenuClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ user, onMenuClick }) => {
  const { logout } = useAuth0();

  return (
    <header className="header">
      <button className="header__menu-btn" onClick={onMenuClick}>
        <FontAwesomeIcon icon={faBars} />
      </button>
      <div className="header__actions">
        <div className="header__user">
          <Avatar src={user.avatar} alt={user.name} size="large" />
          <div className="header__user-info">
            <div className="header__user-greeting">{user.greeting}</div>
            <div className="header__user-name">{user.name}</div>
            <button
              className="header__logout-btn"
              onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}
            >
              Cerrar sesión
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
