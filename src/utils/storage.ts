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
