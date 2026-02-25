import type { Job } from '../data/jobs';
import type { UserPreferences } from '../types';
import { calculateMatchScore } from './matcher';

export type DigestJob = {
  job: Job;
  matchScore: number;
};

export type DailyDigest = {
  date: string;
  jobs: DigestJob[];
  generatedAt: string;
};

const DIGEST_KEY_PREFIX = 'jobTrackerDigest_';

function getTodayKey(): string {
  const today = new Date();
  return `${DIGEST_KEY_PREFIX}${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
}

function getTodayDateString(): string {
  const today = new Date();
  return today.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

export function generateDigest(allJobs: Job[], preferences: UserPreferences): DailyDigest {
  // Calculate match scores and sort
  const jobsWithScores = allJobs.map(job => ({
    job,
    matchScore: calculateMatchScore(job, preferences)
  }));

  // Sort by: 1) matchScore descending, 2) postedDaysAgo ascending
  const sortedJobs = jobsWithScores.sort((a, b) => {
    if (b.matchScore !== a.matchScore) {
      return b.matchScore - a.matchScore;
    }
    return a.job.postedDaysAgo - b.job.postedDaysAgo;
  });

  // Take top 10
  const topJobs = sortedJobs.slice(0, 10);

  const digest: DailyDigest = {
    date: getTodayDateString(),
    jobs: topJobs,
    generatedAt: new Date().toISOString()
  };

  // Save to localStorage
  try {
    localStorage.setItem(getTodayKey(), JSON.stringify(digest));
  } catch {
    // Silently fail if localStorage is not available
  }

  return digest;
}

export function getTodaysDigest(): DailyDigest | null {
  try {
    const saved = localStorage.getItem(getTodayKey());
    return saved ? JSON.parse(saved) : null;
  } catch {
    return null;
  }
}

export function hasTodaysDigest(): boolean {
  return getTodaysDigest() !== null;
}

export function formatDigestForClipboard(digest: DailyDigest): string {
  let text = `Top 10 Jobs For You — 9AM Digest\n`;
  text += `${digest.date}\n`;
  text += `="=".repeat(50)\n\n`;

  digest.jobs.forEach((item, index) => {
    text += `${index + 1}. ${item.job.title}\n`;
    text += `   Company: ${item.job.company}\n`;
    text += `   Location: ${item.job.location} (${item.job.mode})\n`;
    text += `   Experience: ${item.job.experience} years\n`;
    text += `   Match Score: ${item.matchScore}%\n`;
    text += `   Apply: ${item.job.applyUrl}\n\n`;
  });

  text += `---\n`;
  text += `This digest was generated based on your preferences.\n`;

  return text;
}

export function createEmailDraft(digest: DailyDigest): string {
  const subject = encodeURIComponent('My 9AM Job Digest');
  const body = encodeURIComponent(formatDigestForClipboard(digest));
  return `mailto:?subject=${subject}&body=${body}`;
}
