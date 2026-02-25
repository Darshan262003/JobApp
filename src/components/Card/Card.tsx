import type { CardProps } from '../../types';
import './Card.css';

export function Card({ children, className = '' }: CardProps) {
  return (
    <div className={`card ${className}`}>
      {children}
    </div>
  );
}
