import type { Job } from '../../data/jobs';
import { Button } from '../Button/Button';
import './JobModal.css';

interface JobModalProps {
  job: Job;
  onClose: () => void;
}

export function JobModal({ job, onClose }: JobModalProps) {
  const handleApply = () => {
    window.open(job.applyUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="job-modal__overlay" onClick={onClose}>
      <div className="job-modal" onClick={(e) => e.stopPropagation()}>
        <div className="job-modal__header">
          <div className="job-modal__title-section">
            <h2 className="job-modal__title">{job.title}</h2>
            <div className="job-modal__company">{job.company}</div>
          </div>
          <button className="job-modal__close" onClick={onClose} aria-label="Close">
            <svg className="job-modal__close-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <div className="job-modal__content">
          <div className="job-modal__section">
            <div className="job-modal__meta-grid">
              <div className="job-modal__meta-item">
                <span className="job-modal__meta-label">Location</span>
                <span className="job-modal__meta-value">{job.location}</span>
              </div>
              <div className="job-modal__meta-item">
                <span className="job-modal__meta-label">Mode</span>
                <span className="job-modal__meta-value">{job.mode}</span>
              </div>
              <div className="job-modal__meta-item">
                <span className="job-modal__meta-label">Experience</span>
                <span className="job-modal__meta-value">{job.experience} years</span>
              </div>
              <div className="job-modal__meta-item">
                <span className="job-modal__meta-label">Source</span>
                <span className="job-modal__meta-value">{job.source}</span>
              </div>
            </div>
          </div>

          <div className="job-modal__section">
            <h3 className="job-modal__section-title">Salary</h3>
            <div className="job-modal__salary">{job.salaryRange}</div>
          </div>

          <div className="job-modal__section">
            <h3 className="job-modal__section-title">Description</h3>
            <p className="job-modal__description">{job.description}</p>
          </div>

          <div className="job-modal__section">
            <h3 className="job-modal__section-title">Skills</h3>
            <div className="job-modal__skills">
              {job.skills.map((skill) => (
                <span key={skill} className="job-modal__skill">{skill}</span>
              ))}
            </div>
          </div>
        </div>

        <div className="job-modal__footer">
          <Button onClick={handleApply}>Apply Now</Button>
          <Button variant="secondary" onClick={onClose}>Close</Button>
        </div>
      </div>
    </div>
  );
}
