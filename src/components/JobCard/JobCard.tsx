import type { Job } from '../../data/jobs';
import { saveJob, unsaveJob } from '../../utils/storage';
import './JobCard.css';

interface JobCardProps {
  job: Job;
  onView: (job: Job) => void;
  onSaveToggle: (jobId: string, isSaved: boolean) => void;
  isSaved: boolean;
}

export function JobCard({ job, onView, onSaveToggle, isSaved }: JobCardProps) {
  const handleSave = () => {
    if (isSaved) {
      unsaveJob(job.id);
      onSaveToggle(job.id, false);
    } else {
      saveJob(job.id);
      onSaveToggle(job.id, true);
    }
  };

  const handleApply = () => {
    window.open(job.applyUrl, '_blank', 'noopener,noreferrer');
  };

  const formatPostedTime = (days: number) => {
    if (days === 0) return 'Today';
    if (days === 1) return '1 day ago';
    return `${days} days ago`;
  };

  return (
    <div className="job-card">
      <div className="job-card__header">
        <div className="job-card__title-section">
          <h3 className="job-card__title">{job.title}</h3>
          <div className="job-card__company">{job.company}</div>
        </div>
      </div>

      <div className="job-card__meta">
        <span className="job-card__meta-item">
          <svg className="job-card__meta-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          {job.location} • {job.mode}
        </span>
        <span className="job-card__meta-item">
          <svg className="job-card__meta-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="2" y="7" width="20" height="14" rx="2" />
            <path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16" />
          </svg>
          {job.experience} years
        </span>
      </div>

      <div className="job-card__salary">{job.salaryRange}</div>

      <div className="job-card__footer">
        <div className="job-card__badges">
          <span className="job-card__source">{job.source}</span>
          <span className="job-card__posted">{formatPostedTime(job.postedDaysAgo)}</span>
        </div>
        <div className="job-card__actions">
          <button className="job-card__btn job-card__btn--view" onClick={() => onView(job)}>
            View
          </button>
          <button 
            className={`job-card__btn ${isSaved ? 'job-card__btn--saved' : 'job-card__btn--save'}`}
            onClick={handleSave}
          >
            {isSaved ? 'Saved' : 'Save'}
          </button>
          <button className="job-card__btn job-card__btn--apply" onClick={handleApply}>
            Apply
          </button>
        </div>
      </div>
    </div>
  );
}
