import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Navigation } from '../../components/Navigation/Navigation';
import type { NavItem } from '../../types';
import './MainLayout.css';

type MainLayoutProps = {
  children: ReactNode;
};

const navItems: NavItem[] = [
  { label: 'Dashboard', path: '/dashboard' },
  { label: 'Saved', path: '/saved' },
  { label: 'Digest', path: '/digest' },
  { label: 'Settings', path: '/settings' },
  { label: 'Proof', path: '/proof' },
];

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="main-layout">
      <header className="main-layout__header">
        <Link to="/" className="main-layout__brand">
          Job Notification App
        </Link>
        <Navigation items={navItems} />
      </header>
      
      <main className="main-layout__main">
        {children}
      </main>
    </div>
  );
}
