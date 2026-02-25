import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/Button/Button';
import './NotFound.css';

export function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="not-found">
      <svg
        className="not-found__icon"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <circle cx="12" cy="12" r="10" />
        <line x1="9" y1="9" x2="15" y2="15" />
        <line x1="15" y1="9" x2="9" y2="15" />
      </svg>
      <h1 className="not-found__title">Page Not Found</h1>
      <p className="not-found__description">
        The page you are looking for does not exist.
      </p>
      <div className="not-found__action">
        <Button onClick={() => navigate('/')}>Go Home</Button>
      </div>
    </div>
  );
}
