import { useState, useMemo } from 'react';
import { jobs, type Job } from '../../data/jobs';
import { JobCard } from '../../components/JobCard/JobCard';
import { JobModal } from '../../components/JobModal/JobModal';
import { FilterBar, type FilterState } from '../../components/FilterBar/FilterBar';
import { EmptyState } from '../../components/EmptyState/EmptyState';
import { Toast, ToastContainer } from '../../components/Toast/Toast';
import { getSavedJobs, getPreferences, hasPreferences, getJobStatus, type JobStatus } from '../../utils/storage';
import { calculateMatchScore } from '../../utils/matcher';
import './DashboardPage.css';

export function DashboardPage() {
  const userPrefs = useMemo(() => getPreferences(), []);
  const prefsExist = useMemo(() => hasPreferences(), []);
  
  const [filters, setFilters] = useState<FilterState>({
    keyword: '',
    location: '',
    mode: '',
    experience: '',
    source: '',
    sort: 'latest',
    showOnlyMatches: false,
    status: '',
  });
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [savedJobIds, setSavedJobIds] = useState<string[]>(getSavedJobs());
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Calculate match scores for all jobs
  const jobsWithScores = useMemo(() => {
    return jobs.map(job => ({
      job,
      matchScore: calculateMatchScore(job, userPrefs),
    }));
  }, [userPrefs]);

  const filteredJobs = useMemo(() => {
    let result = jobsWithScores.filter(({ job, matchScore }) => {
      // Keyword filter (title/company)
      const matchesKeyword =
        !filters.keyword ||
        job.title.toLowerCase().includes(filters.keyword.toLowerCase()) ||
        job.company.toLowerCase().includes(filters.keyword.toLowerCase());
      
      // Location filter
      const matchesLocation = !filters.location || job.location === filters.location;
      
      // Mode filter
      const matchesMode = !filters.mode || job.mode === filters.mode;
      
      // Experience filter
      const matchesExperience = !filters.experience || job.experience === filters.experience;
      
      // Source filter
      const matchesSource = !filters.source || job.source === filters.source;
      
      // Match threshold filter
      const matchesThreshold = !filters.showOnlyMatches || matchScore >= userPrefs.minMatchScore;
      
      // Status filter
      const jobStatus = getJobStatus(job.id);
      const matchesStatus = !filters.status || jobStatus === filters.status;

      return matchesKeyword && matchesLocation && matchesMode && matchesExperience && matchesSource && matchesThreshold && matchesStatus;
    });

    // Sort
    result = [...result].sort((a, b) => {
      if (filters.sort === 'latest') {
        return a.job.postedDaysAgo - b.job.postedDaysAgo;
      }
      if (filters.sort === 'oldest') {
        return b.job.postedDaysAgo - a.job.postedDaysAgo;
      }
      if (filters.sort === 'matchScore') {
        return b.matchScore - a.matchScore;
      }
      return 0;
    });

    return result;
  }, [filters, jobsWithScores, userPrefs.minMatchScore]);

  const handleSaveToggle = (jobId: string, isSaved: boolean) => {
    setSavedJobIds((prev) =>
      isSaved ? [...prev, jobId] : prev.filter((id) => id !== jobId)
    );
  };

  const handleStatusChange = (_jobId: string, status: JobStatus) => {
    if (status !== 'Not Applied') {
      setToastMessage(`Status updated: ${status}`);
    }
  };

  // No preferences banner
  const renderPreferencesBanner = () => {
    if (prefsExist) return null;
    return (
      <div className="dashboard-page__banner">
        <span>Set your preferences to activate intelligent matching.</span>
      </div>
    );
  };

  // Empty state message
  const getEmptyStateMessage = () => {
    if (filters.showOnlyMatches && prefsExist) {
      return {
        title: "No roles match your criteria",
        description: "Adjust filters or lower your match threshold in settings."
      };
    }
    return {
      title: "No jobs match your search",
      description: "Try adjusting your filters to see more results."
    };
  };

  if (filteredJobs.length === 0) {
    const emptyMessage = getEmptyStateMessage();
    return (
      <div className="dashboard-page">
        <h1 className="dashboard-page__title">Dashboard</h1>
        {renderPreferencesBanner()}
        <FilterBar
          filters={filters}
          onFilterChange={setFilters}
          resultCount={0}
          hasPreferences={prefsExist}
        />
        <div className="dashboard-page__empty">
          <EmptyState
            title={emptyMessage.title}
            description={emptyMessage.description}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-page">
      <h1 className="dashboard-page__title">Dashboard</h1>
      {renderPreferencesBanner()}
      <FilterBar
        filters={filters}
        onFilterChange={setFilters}
        resultCount={filteredJobs.length}
        hasPreferences={prefsExist}
      />
      <div className="dashboard-page__grid">
        {filteredJobs.map(({ job, matchScore }) => (
          <JobCard
            key={job.id}
            job={job}
            matchScore={matchScore}
            onView={setSelectedJob}
            onSaveToggle={handleSaveToggle}
            isSaved={savedJobIds.includes(job.id)}
            onStatusChange={handleStatusChange}
          />
        ))}
      </div>
      {selectedJob && (
        <JobModal job={selectedJob} onClose={() => setSelectedJob(null)} />
      )}
      <ToastContainer>
        {toastMessage && (
          <Toast 
            message={toastMessage} 
            onClose={() => setToastMessage(null)} 
          />
        )}
      </ToastContainer>
    </div>
  );
}
