import './FilterBar.css';

import type { JobStatus } from '../../utils/storage';

export interface FilterState {
  keyword: string;
  location: string;
  mode: string;
  experience: string;
  source: string;
  sort: string;
  showOnlyMatches: boolean;
  status: JobStatus | '';
}

interface FilterBarProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  resultCount: number;
  hasPreferences?: boolean;
}

const locations = ['All', 'Bangalore', 'Hyderabad', 'Chennai', 'Pune', 'Mumbai', 'Gurgaon', 'Noida', 'Kolkata', 'Remote'];
const modes = ['All', 'Remote', 'Hybrid', 'Onsite'];
const experiences = ['All', 'Fresher', '0-1', '1-3', '3-5'];
const sources = ['All', 'LinkedIn', 'Naukri', 'Indeed'];
const sortOptions = [
  { value: 'latest', label: 'Latest First' },
  { value: 'oldest', label: 'Oldest First' },
  { value: 'matchScore', label: 'Match Score' },
];
const statuses: { value: JobStatus | 'All'; label: string }[] = [
  { value: 'All', label: 'All' },
  { value: 'Not Applied', label: 'Not Applied' },
  { value: 'Applied', label: 'Applied' },
  { value: 'Rejected', label: 'Rejected' },
  { value: 'Selected', label: 'Selected' },
];

export function FilterBar({ filters, onFilterChange, resultCount, hasPreferences }: FilterBarProps) {
  const handleChange = (key: keyof FilterState, value: string | boolean) => {
    onFilterChange({ ...filters, [key]: value });
  };

  return (
    <div className="filter-bar">
      <div className="filter-bar__search">
        <input
          type="text"
          className="filter-bar__search-input"
          placeholder="Search by title or company..."
          value={filters.keyword}
          onChange={(e) => handleChange('keyword', e.target.value)}
        />
      </div>

      <div className="filter-bar__selects">
        <div className="filter-bar__select-wrapper">
          <select
            className="filter-bar__select"
            value={filters.location}
            onChange={(e) => handleChange('location', e.target.value)}
          >
            {locations.map(loc => (
              <option key={loc} value={loc === 'All' ? '' : loc}>{loc}</option>
            ))}
          </select>
        </div>

        <div className="filter-bar__select-wrapper">
          <select
            className="filter-bar__select"
            value={filters.mode}
            onChange={(e) => handleChange('mode', e.target.value)}
          >
            {modes.map(mode => (
              <option key={mode} value={mode === 'All' ? '' : mode}>{mode}</option>
            ))}
          </select>
        </div>

        <div className="filter-bar__select-wrapper">
          <select
            className="filter-bar__select"
            value={filters.experience}
            onChange={(e) => handleChange('experience', e.target.value)}
          >
            {experiences.map(exp => (
              <option key={exp} value={exp === 'All' ? '' : exp}>{exp}</option>
            ))}
          </select>
        </div>

        <div className="filter-bar__select-wrapper">
          <select
            className="filter-bar__select"
            value={filters.source}
            onChange={(e) => handleChange('source', e.target.value)}
          >
            {sources.map(src => (
              <option key={src} value={src === 'All' ? '' : src}>{src}</option>
            ))}
          </select>
        </div>

        <div className="filter-bar__select-wrapper">
          <select
            className="filter-bar__select"
            value={filters.sort}
            onChange={(e) => handleChange('sort', e.target.value)}
          >
            {sortOptions.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>

        <div className="filter-bar__select-wrapper">
          <select
            className="filter-bar__select"
            value={filters.status}
            onChange={(e) => handleChange('status', e.target.value as JobStatus)}
          >
            {statuses.map(stat => (
              <option key={stat.value} value={stat.value === 'All' ? '' : stat.value}>{stat.label}</option>
            ))}
          </select>
        </div>
      </div>

      {hasPreferences && (
        <div className="filter-bar__toggle">
          <label className="filter-bar__toggle-label">
            <input
              type="checkbox"
              checked={filters.showOnlyMatches}
              onChange={(e) => handleChange('showOnlyMatches', e.target.checked)}
            />
            <span>Show only jobs above my threshold</span>
          </label>
        </div>
      )}

      <div className="filter-bar__results">
        {resultCount} job{resultCount !== 1 ? 's' : ''} found
      </div>
    </div>
  );
}
