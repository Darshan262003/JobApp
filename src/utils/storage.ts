const SAVED_JOBS_KEY = 'jobNotificationTracker_savedJobs';

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
