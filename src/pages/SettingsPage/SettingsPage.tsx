import { useState, useEffect } from 'react';
import { Button } from '../../components/Button/Button';
import { getPreferences, savePreferences } from '../../utils/storage';
import type { UserPreferences } from '../../types';
import './SettingsPage.css';

const LOCATIONS = ['Bangalore', 'Hyderabad', 'Chennai', 'Pune', 'Mumbai', 'Gurgaon', 'Noida', 'Kolkata', 'Remote'];
const MODES = ['Remote', 'Hybrid', 'Onsite'];
const EXPERIENCE_LEVELS = [
  { value: '', label: 'Select experience level' },
  { value: 'Fresher', label: 'Fresher' },
  { value: '0-1', label: '0-1 years' },
  { value: '1-3', label: '1-3 years' },
  { value: '3-5', label: '3-5 years' },
];

export function SettingsPage() {
  const [preferences, setPreferences] = useState<UserPreferences>(getPreferences());
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setPreferences(getPreferences());
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    savePreferences(preferences);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleLocationToggle = (location: string) => {
    setPreferences(prev => ({
      ...prev,
      preferredLocations: prev.preferredLocations.includes(location)
        ? prev.preferredLocations.filter(l => l !== location)
        : [...prev.preferredLocations, location]
    }));
  };

  const handleModeToggle = (mode: string) => {
    setPreferences(prev => ({
      ...prev,
      preferredMode: prev.preferredMode.includes(mode)
        ? prev.preferredMode.filter(m => m !== mode)
        : [...prev.preferredMode, mode]
    }));
  };

  return (
    <div className="settings-page">
      <h1 className="settings-page__title">Settings</h1>
      <p className="settings-page__subtitle">
        Configure your job preferences for intelligent matching
      </p>
      
      <form className="settings-page__form" onSubmit={handleSubmit}>
        <div className="settings-page__field">
          <label className="settings-page__label" htmlFor="role-keywords">
            Role Keywords
          </label>
          <input
            id="role-keywords"
            className="settings-page__input"
            type="text"
            placeholder="e.g., Frontend, React, Full Stack"
            value={preferences.roleKeywords}
            onChange={(e) => setPreferences(prev => ({ ...prev, roleKeywords: e.target.value }))}
          />
          <span className="settings-page__hint">Comma-separated keywords to match in job titles</span>
        </div>

        <div className="settings-page__field">
          <label className="settings-page__label">Preferred Locations</label>
          <div className="settings-page__checkbox-group">
            {LOCATIONS.map(location => (
              <label key={location} className="settings-page__checkbox">
                <input
                  type="checkbox"
                  checked={preferences.preferredLocations.includes(location)}
                  onChange={() => handleLocationToggle(location)}
                />
                <span>{location}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="settings-page__field">
          <label className="settings-page__label">Preferred Mode</label>
          <div className="settings-page__checkbox-group">
            {MODES.map(mode => (
              <label key={mode} className="settings-page__checkbox">
                <input
                  type="checkbox"
                  checked={preferences.preferredMode.includes(mode)}
                  onChange={() => handleModeToggle(mode)}
                />
                <span>{mode}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="settings-page__field">
          <label className="settings-page__label" htmlFor="experience">
            Experience Level
          </label>
          <select 
            id="experience" 
            className="settings-page__select"
            value={preferences.experienceLevel}
            onChange={(e) => setPreferences(prev => ({ ...prev, experienceLevel: e.target.value }))}
          >
            {EXPERIENCE_LEVELS.map(level => (
              <option key={level.value} value={level.value}>{level.label}</option>
            ))}
          </select>
        </div>

        <div className="settings-page__field">
          <label className="settings-page__label" htmlFor="skills">
            Your Skills
          </label>
          <input
            id="skills"
            className="settings-page__input"
            type="text"
            placeholder="e.g., React, TypeScript, Node.js"
            value={preferences.skills}
            onChange={(e) => setPreferences(prev => ({ ...prev, skills: e.target.value }))}
          />
          <span className="settings-page__hint">Comma-separated skills to match with job requirements</span>
        </div>

        <div className="settings-page__field">
          <label className="settings-page__label" htmlFor="min-match-score">
            Minimum Match Score: {preferences.minMatchScore}%
          </label>
          <input
            id="min-match-score"
            className="settings-page__slider"
            type="range"
            min="0"
            max="100"
            value={preferences.minMatchScore}
            onChange={(e) => setPreferences(prev => ({ ...prev, minMatchScore: parseInt(e.target.value) }))}
          />
          <span className="settings-page__hint">Jobs below this score will be filtered when &quot;Show only matches&quot; is enabled</span>
        </div>

        <div className="settings-page__actions">
          <Button type="submit">{saved ? 'Saved!' : 'Save Preferences'}</Button>
        </div>
      </form>
    </div>
  );
}
