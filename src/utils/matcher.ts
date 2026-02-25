import type { Job } from '../data/jobs';
import type { UserPreferences, MatchScoreConfig } from '../types';

const SCORE_CONFIG: MatchScoreConfig = {
  roleInTitle: 25,
  roleInDescription: 15,
  locationMatch: 15,
  modeMatch: 10,
  experienceMatch: 10,
  skillsMatch: 15,
  recentPosting: 5,
  linkedInSource: 5,
};

function normalizeText(text: string): string {
  return text.toLowerCase().trim();
}

function extractKeywords(keywordsString: string): string[] {
  return keywordsString
    .split(',')
    .map(k => normalizeText(k))
    .filter(k => k.length > 0);
}

function hasKeywordMatch(text: string, keywords: string[]): boolean {
  const normalizedText = normalizeText(text);
  return keywords.some(keyword => normalizedText.includes(keyword));
}

function calculateSkillsOverlap(jobSkills: string[], userSkills: string[]): boolean {
  const normalizedJobSkills = jobSkills.map(s => normalizeText(s));
  const normalizedUserSkills = userSkills.map(s => normalizeText(s));
  return normalizedUserSkills.some(skill => normalizedJobSkills.includes(skill));
}

export function calculateMatchScore(job: Job, preferences: UserPreferences): number {
  let score = 0;
  
  const roleKeywords = extractKeywords(preferences.roleKeywords);
  const userSkills = extractKeywords(preferences.skills);
  
  // +25 if any roleKeyword appears in job.title
  if (roleKeywords.length > 0 && hasKeywordMatch(job.title, roleKeywords)) {
    score += SCORE_CONFIG.roleInTitle;
  }
  
  // +15 if any roleKeyword appears in job.description
  if (roleKeywords.length > 0 && hasKeywordMatch(job.description, roleKeywords)) {
    score += SCORE_CONFIG.roleInDescription;
  }
  
  // +15 if job.location matches preferredLocations
  if (preferences.preferredLocations.length > 0 && 
      preferences.preferredLocations.includes(job.location)) {
    score += SCORE_CONFIG.locationMatch;
  }
  
  // +10 if job.mode matches preferredMode
  if (preferences.preferredMode.length > 0 && 
      preferences.preferredMode.includes(job.mode)) {
    score += SCORE_CONFIG.modeMatch;
  }
  
  // +10 if job.experience matches experienceLevel
  if (preferences.experienceLevel && 
      job.experience === preferences.experienceLevel) {
    score += SCORE_CONFIG.experienceMatch;
  }
  
  // +15 if overlap between job.skills and user.skills
  if (userSkills.length > 0 && calculateSkillsOverlap(job.skills, userSkills)) {
    score += SCORE_CONFIG.skillsMatch;
  }
  
  // +5 if postedDaysAgo <= 2
  if (job.postedDaysAgo <= 2) {
    score += SCORE_CONFIG.recentPosting;
  }
  
  // +5 if source is LinkedIn
  if (job.source === 'LinkedIn') {
    score += SCORE_CONFIG.linkedInSource;
  }
  
  // Cap at 100
  return Math.min(score, 100);
}

export function getMatchScoreColor(score: number): string {
  if (score >= 80) return 'var(--color-success)';
  if (score >= 60) return 'var(--color-warning)';
  if (score >= 40) return 'var(--color-text-secondary)';
  return 'var(--color-text-tertiary)';
}

export function getMatchScoreLabel(score: number): string {
  if (score >= 80) return 'Excellent';
  if (score >= 60) return 'Good';
  if (score >= 40) return 'Fair';
  return 'Low';
}
