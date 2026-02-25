import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/Button/Button';
import './LandingPage.css';

export function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="landing-page">
      <header className="landing-page__header">
        <span className="landing-page__brand">Job Notification Tracker</span>
      </header>
      
      <main className="landing-page__hero">
        <h1 className="landing-page__headline">
          Stop Missing The Right Jobs.
        </h1>
        <p className="landing-page__subtext">
          Precision-matched job discovery delivered daily at 9AM.
        </p>
        <div className="landing-page__cta">
          <Button size="lg" onClick={() => navigate('/settings')}>
            Start Tracking
          </Button>
        </div>
      </main>
    </div>
  );
}
