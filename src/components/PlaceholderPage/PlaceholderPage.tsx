import type { PlaceholderPageProps } from '../../types';
import './PlaceholderPage.css';

export function PlaceholderPage({ title }: PlaceholderPageProps) {
  return (
    <div className="placeholder-page">
      <h1 className="placeholder-page__title">{title}</h1>
      <p className="placeholder-page__subtext">
        This section will be built in the next step.
      </p>
    </div>
  );
}
