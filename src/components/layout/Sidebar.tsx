import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import './Sidebar.css';
import { NavItem } from '../../types';
import calculatorIcon from '../../assets/images/calculator.png';

interface SidebarProps {
  navigation: NavItem[];
  supportNav: NavItem[];
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ navigation, supportNav, isOpen, onClose }) => {
  return (
    <aside className={`sidebar ${isOpen ? 'sidebar--open' : ''}`}>
      <div className="sidebar__brand">
        <Link to="/" className="sidebar__brand-link" onClick={onClose}>
          <div className="sidebar__logo">
            <img src={calculatorIcon} alt="Calculator" style={{ width: '24px', height: '24px' }} />
          </div>
          <div className="sidebar__brand-text">
            <div className="sidebar__brand-name">Tiki</div>
            <div className="sidebar__brand-subtitle">Budget Manager</div>
          </div>
        </Link>
        <button className="sidebar__close-btn" onClick={onClose}>×</button>
      </div>

      <nav className="sidebar__nav">
        <ul className="sidebar__nav-list">
          {navigation.map((item) => (
            <li key={item.id}>
              <NavLink
                to={item.path}
                onClick={onClose}
                className={({ isActive }) =>
                  `sidebar__nav-item ${isActive ? 'sidebar__nav-item--active' : ''}`
                }
              >
                <span className="sidebar__nav-icon">{item.icon}</span>
                <span className="sidebar__nav-label">{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div className="sidebar__support">
        <ul className="sidebar__nav-list">
          {supportNav.map((item) => (
            <li key={item.id}>
              <NavLink
                to={item.path}
                onClick={onClose}
                className={({ isActive }) =>
                  `sidebar__nav-item ${isActive ? 'sidebar__nav-item--active' : ''}`
                }
              >
                <span className="sidebar__nav-icon">{item.icon}</span>
                <span className="sidebar__nav-label">{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};
