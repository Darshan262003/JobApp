import type { ErrorStateProps } from '../../types';
import { Button } from '../Button/Button';
import './ErrorState.css';

export function ErrorState({ title, description, solution, onRetry }: ErrorStateProps) {
  return (
    <div className="error-state">
      <div className="error-state__header">
        <svg 
          className="error-state__icon" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2"
        >
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="12" />
          <line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
        <h3 className="error-state__title">{title}</h3>
      </div>
      <p className="error-state__description">{description}</p>
      {solution && (
        <div className="error-state__solution">
          <span className="error-state__solution-label">Solution:</span>
          <p className="error-state__solution-text">{solution}</p>
        </div>
      )}
      {onRetry && (
        <div className="error-state__action">
          <Button variant="secondary" onClick={onRetry}>Try Again</Button>
        </div>
      )}
    </div>
  );
}
