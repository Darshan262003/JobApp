import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import type { NavigationProps } from '../../types';
import './Navigation.css';

export function Navigation({ items }: NavigationProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLinkClick = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="navigation">
      {/* Desktop Navigation */}
      <ul className="navigation__list">
        {items.map((item) => (
          <li key={item.path}>
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                `navigation__link ${isActive ? 'navigation__link--active' : ''}`
              }
              end={item.path === '/'}
            >
              {item.label}
            </NavLink>
          </li>
        ))}
      </ul>

      {/* Mobile Hamburger Button */}
      <button
        className="navigation__toggle"
        onClick={() => setIsMobileMenuOpen(true)}
        aria-label="Open navigation menu"
        aria-expanded={isMobileMenuOpen}
      >
        <svg
          className="navigation__toggle-icon"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <line x1="3" y1="6" x2="21" y2="6" />
          <line x1="3" y1="12" x2="21" y2="12" />
          <line x1="3" y1="18" x2="21" y2="18" />
        </svg>
      </button>

      {/* Mobile Overlay */}
      <div
        className={`navigation__mobile-overlay ${
          isMobileMenuOpen ? 'navigation__mobile-overlay--open' : ''
        }`}
        onClick={() => setIsMobileMenuOpen(false)}
        aria-hidden="true"
      />

      {/* Mobile Menu */}
      <div
        className={`navigation__mobile-menu ${
          isMobileMenuOpen ? 'navigation__mobile-menu--open' : ''
        }`}
        role="dialog"
        aria-label="Navigation menu"
      >
        <button
          className="navigation__mobile-close"
          onClick={() => setIsMobileMenuOpen(false)}
          aria-label="Close navigation menu"
        >
          <svg
            className="navigation__mobile-close-icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        <ul className="navigation__mobile-list">
          {items.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `navigation__mobile-link ${
                    isActive ? 'navigation__mobile-link--active' : ''
                  }`
                }
                onClick={handleLinkClick}
                end={item.path === '/'}
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
