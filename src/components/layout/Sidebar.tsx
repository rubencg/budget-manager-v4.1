import React from 'react';
import './Sidebar.css';
import { NavItem } from '../../types';

interface SidebarProps {
  navigation: NavItem[];
  supportNav: NavItem[];
}

export const Sidebar: React.FC<SidebarProps> = ({ navigation, supportNav }) => {
  return (
    <aside className="sidebar">
      <div className="sidebar__brand">
        <div className="sidebar__logo">💰</div>
        <div className="sidebar__brand-text">
          <div className="sidebar__brand-name">Tiki</div>
          <div className="sidebar__brand-subtitle">Budget Manager</div>
        </div>
      </div>

      <nav className="sidebar__nav">
        <ul className="sidebar__nav-list">
          {navigation.map((item) => (
            <li key={item.id}>
              <a
                href={item.path}
                className={`sidebar__nav-item ${item.active ? 'sidebar__nav-item--active' : ''}`}
              >
                <span className="sidebar__nav-icon">{item.icon}</span>
                <span className="sidebar__nav-label">{item.label}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="sidebar__support">
        <ul className="sidebar__nav-list">
          {supportNav.map((item) => (
            <li key={item.id}>
              <a href={item.path} className="sidebar__nav-item">
                <span className="sidebar__nav-icon">{item.icon}</span>
                <span className="sidebar__nav-label">{item.label}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};
