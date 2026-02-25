import type { ContextHeaderProps } from '../../types';
import './ContextHeader.css';

export function ContextHeader({ headline, subtext }: ContextHeaderProps) {
  return (
    <div className="context-header">
      <div className="context-header__content">
        <h1 className="context-header__headline">{headline}</h1>
        <p className="context-header__subtext">{subtext}</p>
      </div>
    </div>
  );
}
