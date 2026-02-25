/* ==========================================================================
   TYPE DEFINITIONS - Job Notification App
   ========================================================================== */

import type { ReactNode } from 'react';

// -------------------------------------------------------------------------
// STATUS TYPES
// -------------------------------------------------------------------------

export type Status = 'not-started' | 'in-progress' | 'shipped';

export type ChecklistItem = {
  label: string;
  checked: boolean;
};

// -------------------------------------------------------------------------
// TOP BAR TYPES
// -------------------------------------------------------------------------

export type TopBarProps = {
  appName: string;
  currentStep: number;
  totalSteps: number;
  status: Status;
};

// -------------------------------------------------------------------------
// CONTEXT HEADER TYPES
// -------------------------------------------------------------------------

export type ContextHeaderProps = {
  headline: string;
  subtext: string;
};

// -------------------------------------------------------------------------
// BUTTON TYPES
// -------------------------------------------------------------------------

export type ButtonVariant = 'primary' | 'secondary' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

export type ButtonProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
};

// -------------------------------------------------------------------------
// INPUT TYPES
// -------------------------------------------------------------------------

export type InputProps = {
  label?: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  disabled?: boolean;
  type?: 'text' | 'email' | 'password' | 'number';
};

// -------------------------------------------------------------------------
// CARD TYPES
// -------------------------------------------------------------------------

export type CardProps = {
  children: ReactNode;
  className?: string;
};

// -------------------------------------------------------------------------
// PROOF FOOTER TYPES
// -------------------------------------------------------------------------

export type ProofFooterProps = {
  items: ChecklistItem[];
};

// -------------------------------------------------------------------------
// EMPTY STATE TYPES
// -------------------------------------------------------------------------

export type EmptyStateProps = {
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
};

// -------------------------------------------------------------------------
// ERROR STATE TYPES
// -------------------------------------------------------------------------

export type ErrorStateProps = {
  title: string;
  description: string;
  solution?: string;
  onRetry?: () => void;
};

// -------------------------------------------------------------------------
// NAVIGATION TYPES
// -------------------------------------------------------------------------

export type NavItem = {
  label: string;
  path: string;
};

export type NavigationProps = {
  items: NavItem[];
};

// -------------------------------------------------------------------------
// PLACEHOLDER PAGE TYPES
// -------------------------------------------------------------------------

export type PlaceholderPageProps = {
  title: string;
};
