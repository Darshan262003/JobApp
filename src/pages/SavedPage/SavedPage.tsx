import { useState, useMemo } from 'react';
import { jobs, type Job } from '../../data/jobs';
import { JobCard } from '../../components/JobCard/JobCard';
import { JobModal } from '../../components/JobModal/JobModal';
import { EmptyState } from '../../components/EmptyState/EmptyState';
import { getSavedJobs } from '../../utils/storage';
import './SavedPage.css';

export function SavedPage() {
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [savedJobIds, setSavedJobIds] = useState<string[]>(getSavedJobs());

  const savedJobs = useMemo(() => {
    return jobs.filter((job) => savedJobIds.includes(job.id));
  }, [savedJobIds]);

  const handleSaveToggle = (jobId: string, isSaved: boolean) => {
    setSavedJobIds((prev) =>
      isSaved ? [...prev, jobId] : prev.filter((id) => id !== jobId)
    );
  };

  if (savedJobs.length === 0) {
    return (
      <div className="saved-page">
        <h1 className="saved-page__title">Saved Jobs</h1>
        <div className="saved-page__empty">
          <EmptyState
            title="No saved jobs"
            description="Jobs you save will appear here for quick access. Browse the dashboard to find and save jobs."
          />
        </div>
      </div>
    );
  }

  return (
    <div className="saved-page">
      <h1 className="saved-page__title">Saved Jobs</h1>
      <p className="saved-page__count">{savedJobs.length} job{savedJobs.length !== 1 ? 's' : ''} saved</p>
      <div className="saved-page__grid">
        {savedJobs.map((job) => (
          <JobCard
            key={job.id}
            job={job}
            onView={setSelectedJob}
            onSaveToggle={handleSaveToggle}
            isSaved={savedJobIds.includes(job.id)}
          />
        ))}
      </div>
      {selectedJob && (
        <JobModal job={selectedJob} onClose={() => setSelectedJob(null)} />
      )}
    </div>
  );
}
