import type { UserPreferences } from '../types';

const SAVED_JOBS_KEY = 'jobNotificationTracker_savedJobs';
const PREFERENCES_KEY = 'jobTrackerPreferences';

const DEFAULT_PREFERENCES: UserPreferences = {
  roleKeywords: '',
  preferredLocations: [],
  preferredMode: [],
  experienceLevel: '',
  skills: '',
  minMatchScore: 40,
};

export function getSavedJobs(): string[] {
  try {
    const saved = localStorage.getItem(SAVED_JOBS_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
}

export function saveJob(jobId: string): void {
  try {
    const saved = getSavedJobs();
    if (!saved.includes(jobId)) {
      saved.push(jobId);
      localStorage.setItem(SAVED_JOBS_KEY, JSON.stringify(saved));
    }
  } catch {
    // Silently fail if localStorage is not available
  }
}

export function unsaveJob(jobId: string): void {
  try {
    const saved = getSavedJobs();
    const filtered = saved.filter(id => id !== jobId);
    localStorage.setItem(SAVED_JOBS_KEY, JSON.stringify(filtered));
  } catch {
    // Silently fail if localStorage is not available
  }
}

export function isJobSaved(jobId: string): boolean {
  return getSavedJobs().includes(jobId);
}

// Preferences storage
export function getPreferences(): UserPreferences {
  try {
    const prefs = localStorage.getItem(PREFERENCES_KEY);
    return prefs ? { ...DEFAULT_PREFERENCES, ...JSON.parse(prefs) } : DEFAULT_PREFERENCES;
  } catch {
    return DEFAULT_PREFERENCES;
  }
}

export function savePreferences(preferences: UserPreferences): void {
  try {
    localStorage.setItem(PREFERENCES_KEY, JSON.stringify(preferences));
  } catch {
    // Silently fail if localStorage is not available
  }
}

export function hasPreferences(): boolean {
  try {
    const prefs = localStorage.getItem(PREFERENCES_KEY);
    if (!prefs) return false;
    const parsed = JSON.parse(prefs);
    return !!(parsed.roleKeywords || parsed.preferredLocations?.length || parsed.preferredMode?.length || parsed.skills);
  } catch {
    return false;
  }
}

// Job Status types
export type JobStatus = 'Not Applied' | 'Applied' | 'Rejected' | 'Selected';

export type StatusUpdate = {
  jobId: string;
  jobTitle: string;
  company: string;
  status: JobStatus;
  updatedAt: string;
};

const STATUS_KEY = 'jobTrackerStatus';
const STATUS_UPDATES_KEY = 'jobTrackerStatusUpdates';

export function getJobStatus(jobId: string): JobStatus {
  try {
    const statuses = localStorage.getItem(STATUS_KEY);
    if (!statuses) return 'Not Applied';
    const parsed = JSON.parse(statuses);
    return parsed[jobId] || 'Not Applied';
  } catch {
    return 'Not Applied';
  }
}

export function getAllJobStatuses(): Record<string, JobStatus> {
  try {
    const statuses = localStorage.getItem(STATUS_KEY);
    return statuses ? JSON.parse(statuses) : {};
  } catch {
    return {};
  }
}

export function setJobStatus(jobId: string, status: JobStatus, jobTitle: string, company: string): void {
  try {
    // Save status
    const statuses = getAllJobStatuses();
    statuses[jobId] = status;
    localStorage.setItem(STATUS_KEY, JSON.stringify(statuses));
    
    // Record update for history
    const updates = getStatusUpdates();
    updates.unshift({
      jobId,
      jobTitle,
      company,
      status,
      updatedAt: new Date().toISOString()
    });
    // Keep only last 20 updates
    const trimmedUpdates = updates.slice(0, 20);
    localStorage.setItem(STATUS_UPDATES_KEY, JSON.stringify(trimmedUpdates));
  } catch {
    // Silently fail
  }
}

export function getStatusUpdates(): StatusUpdate[] {
  try {
    const updates = localStorage.getItem(STATUS_UPDATES_KEY);
    return updates ? JSON.parse(updates) : [];
  } catch {
    return [];
  }
}

export function getStatusColor(status: JobStatus): string {
  switch (status) {
    case 'Not Applied':
      return 'var(--color-text-tertiary)';
    case 'Applied':
      return '#2563EB'; // Blue
    case 'Rejected':
      return 'var(--color-accent)'; // Red
    case 'Selected':
      return 'var(--color-success)'; // Green
    default:
      return 'var(--color-text-tertiary)';
  }
}

// Test Checklist types
export type TestChecklistItem = {
  id: string;
  label: string;
  tooltip: string;
  checked: boolean;
};

export const DEFAULT_TEST_CHECKLIST: TestChecklistItem[] = [
  { id: 'prefs-persist', label: 'Preferences persist after refresh', tooltip: 'Set preferences, refresh page, verify they remain', checked: false },
  { id: 'match-score', label: 'Match score calculates correctly', tooltip: 'Check that jobs show match scores based on your preferences', checked: false },
  { id: 'show-matches', label: '"Show only matches" toggle works', tooltip: 'Toggle filter and verify only jobs above threshold show', checked: false },
  { id: 'save-persist', label: 'Save job persists after refresh', tooltip: 'Save a job, refresh, verify it remains saved', checked: false },
  { id: 'apply-tab', label: 'Apply opens in new tab', tooltip: 'Click Apply button, verify it opens in new tab', checked: false },
  { id: 'status-persist', label: 'Status update persists after refresh', tooltip: 'Change job status, refresh, verify status remains', checked: false },
  { id: 'status-filter', label: 'Status filter works correctly', tooltip: 'Use status filter dropdown, verify correct jobs show', checked: false },
  { id: 'digest-generate', label: 'Digest generates top 10 by score', tooltip: 'Generate digest, verify top 10 jobs by match score', checked: false },
  { id: 'digest-persist', label: 'Digest persists for the day', tooltip: 'Generate digest, refresh, verify it loads automatically', checked: false },
  { id: 'no-errors', label: 'No console errors on main pages', tooltip: 'Check browser console on all pages for errors', checked: false },
];

const TEST_CHECKLIST_KEY = 'jobTrackerTestStatus';

export function getTestChecklist(): TestChecklistItem[] {
  try {
    const saved = localStorage.getItem(TEST_CHECKLIST_KEY);
    if (!saved) return DEFAULT_TEST_CHECKLIST;
    const parsed = JSON.parse(saved);
    // Merge with defaults to ensure all items exist
    return DEFAULT_TEST_CHECKLIST.map(defaultItem => ({
      ...defaultItem,
      checked: parsed.find((p: TestChecklistItem) => p.id === defaultItem.id)?.checked ?? false
    }));
  } catch {
    return DEFAULT_TEST_CHECKLIST;
  }
}

export function saveTestChecklist(checklist: TestChecklistItem[]): void {
  try {
    localStorage.setItem(TEST_CHECKLIST_KEY, JSON.stringify(checklist));
  } catch {
    // Silently fail
  }
}

export function resetTestChecklist(): void {
  try {
    localStorage.removeItem(TEST_CHECKLIST_KEY);
  } catch {
    // Silently fail
  }
}

export function getPassedTestCount(): number {
  const checklist = getTestChecklist();
  return checklist.filter(item => item.checked).length;
}

export function areAllTestsPassed(): boolean {
  return getPassedTestCount() === DEFAULT_TEST_CHECKLIST.length;
}
