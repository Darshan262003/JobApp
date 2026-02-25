import { useState, useMemo } from 'react';
import { jobs } from '../../data/jobs';
import { Button } from '../../components/Button/Button';
import { EmptyState } from '../../components/EmptyState/EmptyState';
import { getPreferences, hasPreferences } from '../../utils/storage';
import { generateDigest, getTodaysDigest, formatDigestForClipboard, createEmailDraft, type DailyDigest } from '../../utils/digest';
import { getMatchScoreColor } from '../../utils/matcher';
import './DigestPage.css';

export function DigestPage() {
  const prefsExist = useMemo(() => hasPreferences(), []);
  const userPrefs = useMemo(() => getPreferences(), []);
  
  const [digest, setDigest] = useState<DailyDigest | null>(getTodaysDigest());
  const [copied, setCopied] = useState(false);

  const handleGenerate = () => {
    const newDigest = generateDigest(jobs, userPrefs);
    setDigest(newDigest);
  };

  const handleCopy = async () => {
    if (!digest) return;
    try {
      await navigator.clipboard.writeText(formatDigestForClipboard(digest));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Silently fail
    }
  };

  const handleEmail = () => {
    if (!digest) return;
    window.location.href = createEmailDraft(digest);
  };

  // No preferences state
  if (!prefsExist) {
    return (
      <div className="digest-page">
        <div className="digest-page__blocking">
          <EmptyState
            title="Set preferences to generate a personalized digest."
            description="Go to Settings and configure your job preferences to unlock the daily digest feature."
          />
        </div>
      </div>
    );
  }

  // No digest generated yet
  if (!digest) {
    return (
      <div className="digest-page">
        <div className="digest-page__empty">
          <EmptyState
            title="No digest generated yet"
            description="Generate your personalized 9AM digest to see the top matching jobs for today."
            actionLabel="Generate Today's 9AM Digest (Simulated)"
            onAction={handleGenerate}
          />
          <p className="digest-page__note">Demo Mode: Daily 9AM trigger simulated manually.</p>
        </div>
      </div>
    );
  }

  // Digest exists but no matches
  if (digest.jobs.length === 0) {
    return (
      <div className="digest-page">
        <div className="digest-page__empty">
          <EmptyState
            title="No matching roles today"
            description="Check again tomorrow for new opportunities that match your preferences."
          />
          <Button variant="secondary" onClick={handleGenerate}>
            Regenerate Digest
          </Button>
          <p className="digest-page__note">Demo Mode: Daily 9AM trigger simulated manually.</p>
        </div>
      </div>
    );
  }

  // Render digest
  return (
    <div className="digest-page">
      <div className="digest-page__container">
        {/* Header */}
        <div className="digest-page__header">
          <h1 className="digest-page__title">Top 10 Jobs For You — 9AM Digest</h1>
          <p className="digest-page__date">{digest.date}</p>
        </div>

        {/* Job List */}
        <div className="digest-page__jobs">
          {digest.jobs.map((item, index) => (
            <div key={item.job.id} className="digest-page__job">
              <div className="digest-page__job-header">
                <span className="digest-page__job-number">{index + 1}</span>
                <div className="digest-page__job-title-section">
                  <h3 className="digest-page__job-title">{item.job.title}</h3>
                  <div className="digest-page__job-company">{item.job.company}</div>
                </div>
                <div 
                  className="digest-page__job-score"
                  style={{ backgroundColor: getMatchScoreColor(item.matchScore) }}
                >
                  {item.matchScore}%
                </div>
              </div>
              
              <div className="digest-page__job-meta">
                <span>{item.job.location} • {item.job.mode}</span>
                <span>Experience: {item.job.experience} years</span>
              </div>

              <button 
                className="digest-page__job-apply"
                onClick={() => window.open(item.job.applyUrl, '_blank', 'noopener,noreferrer')}
              >
                Apply
              </button>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="digest-page__footer">
          <p>This digest was generated based on your preferences.</p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="digest-page__actions">
        <Button variant="secondary" onClick={handleCopy}>
          {copied ? 'Copied!' : 'Copy Digest to Clipboard'}
        </Button>
        <Button variant="secondary" onClick={handleEmail}>
          Create Email Draft
        </Button>
        <Button onClick={handleGenerate}>
          Regenerate Digest
        </Button>
      </div>

      <p className="digest-page__note">Demo Mode: Daily 9AM trigger simulated manually.</p>
    </div>
  );
}
