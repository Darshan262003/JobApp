import { Button } from '../../components/Button/Button';
import './SettingsPage.css';

export function SettingsPage() {
  return (
    <div className="settings-page">
      <h1 className="settings-page__title">Settings</h1>
      <p className="settings-page__subtitle">
        Configure your job preferences
      </p>
      
      <form className="settings-page__form">
        <div className="settings-page__field">
          <label className="settings-page__label" htmlFor="role-keywords">
            Role keywords
          </label>
          <input
            id="role-keywords"
            className="settings-page__input"
            type="text"
            placeholder="e.g., Senior Frontend Developer, React Engineer"
          />
        </div>

        <div className="settings-page__field">
          <label className="settings-page__label" htmlFor="locations">
            Preferred locations
          </label>
          <input
            id="locations"
            className="settings-page__input"
            type="text"
            placeholder="e.g., San Francisco, Remote, New York"
          />
        </div>

        <div className="settings-page__field">
          <label className="settings-page__label" htmlFor="mode">
            Mode
          </label>
          <select id="mode" className="settings-page__select">
            <option value="">Select work mode</option>
            <option value="remote">Remote</option>
            <option value="hybrid">Hybrid</option>
            <option value="onsite">Onsite</option>
          </select>
        </div>

        <div className="settings-page__field">
          <label className="settings-page__label" htmlFor="experience">
            Experience level
          </label>
          <select id="experience" className="settings-page__select">
            <option value="">Select experience level</option>
            <option value="entry">Entry Level (0-2 years)</option>
            <option value="mid">Mid Level (3-5 years)</option>
            <option value="senior">Senior Level (5+ years)</option>
            <option value="lead">Lead / Staff</option>
          </select>
        </div>

        <div className="settings-page__actions">
          <Button type="submit">Save Preferences</Button>
        </div>
      </form>
    </div>
  );
}
