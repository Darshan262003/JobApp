import type { TopBarProps } from '../../types';
import './TopBar.css';

export function TopBar({ appName, currentStep, totalSteps, status }: TopBarProps) {
  const statusLabels: Record<string, string> = {
    'not-started': 'Not Started',
    'in-progress': 'In Progress',
    'shipped': 'Shipped'
  };

  return (
    <header className="topbar">
      <div className="topbar__brand">{appName}</div>
      
      <div className="topbar__progress">
        <span>Step {currentStep} / {totalSteps}</span>
        <div className="topbar__progress-indicator">
          {Array.from({ length: totalSteps }, (_, i) => (
            <span
              key={i}
              className={`topbar__progress-dot ${
                i < currentStep - 1 ? 'topbar__progress-dot--completed' : ''
              } ${i === currentStep - 1 ? 'topbar__progress-dot--active' : ''}`}
            />
          ))}
        </div>
      </div>
      
      <div className={`topbar__status topbar__status--${status}`}>
        <span className="topbar__status-dot" />
        <span>{statusLabels[status]}</span>
      </div>
    </header>
  );
}
