import { useMemo } from 'react';
import { areAllTestsPassed, getPassedTestCount } from '../../utils/storage';
import { Button } from '../../components/Button/Button';
import './ShipPage.css';

export function ShipPage() {
  const allTestsPassed = useMemo(() => areAllTestsPassed(), []);
  const passedCount = useMemo(() => getPassedTestCount(), []);

  // Locked state - show blocking message
  if (!allTestsPassed) {
    return (
      <div className="ship-page ship-page--locked">
        <div className="ship-page__lock-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0110 0v4" />
          </svg>
        </div>
        <h1 className="ship-page__title">Complete all tests before shipping.</h1>
        <p className="ship-page__subtitle">
          You have completed {passedCount} of 10 tests.
        </p>
        <div className="ship-page__progress">
          <div 
            className="ship-page__progress-bar"
            style={{ width: `${(passedCount / 10) * 100}%` }}
          />
        </div>
        <Button onClick={() => window.location.href = '/jt/07-test'}>
          Go to Test Checklist
        </Button>
      </div>
    );
  }

  // Unlocked state - show ship confirmation
  return (
    <div className="ship-page ship-page--unlocked">
      <div className="ship-page__success-icon">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
          <polyline points="22 4 12 14.01 9 11.01" />
        </svg>
      </div>
      <h1 className="ship-page__title">Ready to Ship</h1>
      <p className="ship-page__subtitle">
        All 10 tests passed. Your application is ready for deployment.
      </p>
      <div className="ship-page__checklist">
        <h2 className="ship-page__checklist-title">Pre-Flight Checklist</h2>
        <ul className="ship-page__checklist-items">
          <li className="ship-page__checklist-item ship-page__checklist-item--checked">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
              <polyline points="20 6 9 17 4 12" />
            </svg>
            All tests passed
          </li>
          <li className="ship-page__checklist-item">
            <span className="ship-page__checklist-checkbox"></span>
            Review environment variables
          </li>
          <li className="ship-page__checklist-item">
            <span className="ship-page__checklist-checkbox"></span>
            Verify API endpoints
          </li>
          <li className="ship-page__checklist-item">
            <span className="ship-page__checklist-checkbox"></span>
            Check analytics integration
          </li>
        </ul>
      </div>
      <div className="ship-page__actions">
        <Button variant="secondary" onClick={() => window.location.href = '/jt/07-test'}>
          Review Tests
        </Button>
        <Button onClick={() => alert('Deploy initiated!')}>
          Deploy to Production
        </Button>
      </div>
    </div>
  );
}
