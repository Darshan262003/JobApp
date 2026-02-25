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
