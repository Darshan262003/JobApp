import { useState, useMemo } from 'react';
import { jobs, type Job } from '../../data/jobs';
import { JobCard } from '../../components/JobCard/JobCard';
import { JobModal } from '../../components/JobModal/JobModal';
import { FilterBar, type FilterState } from '../../components/FilterBar/FilterBar';
import { EmptyState } from '../../components/EmptyState/EmptyState';
import { getSavedJobs } from '../../utils/storage';
import './DashboardPage.css';

export function DashboardPage() {
  const [filters, setFilters] = useState<FilterState>({
    keyword: '',
    location: '',
    mode: '',
    experience: '',
    source: '',
    sort: 'latest',
  });
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [savedJobIds, setSavedJobIds] = useState<string[]>(getSavedJobs());

  const filteredJobs = useMemo(() => {
    let result = jobs.filter((job) => {
      const matchesKeyword =
        !filters.keyword ||
        job.title.toLowerCase().includes(filters.keyword.toLowerCase()) ||
        job.company.toLowerCase().includes(filters.keyword.toLowerCase());
      const matchesLocation = !filters.location || job.location === filters.location;
      const matchesMode = !filters.mode || job.mode === filters.mode;
      const matchesExperience = !filters.experience || job.experience === filters.experience;
      const matchesSource = !filters.source || job.source === filters.source;

      return matchesKeyword && matchesLocation && matchesMode && matchesExperience && matchesSource;
    });

    // Sort
    result = [...result].sort((a, b) => {
      if (filters.sort === 'latest') {
        return a.postedDaysAgo - b.postedDaysAgo;
      }
      return b.postedDaysAgo - a.postedDaysAgo;
    });

    return result;
  }, [filters]);

  const handleSaveToggle = (jobId: string, isSaved: boolean) => {
    setSavedJobIds((prev) =>
      isSaved ? [...prev, jobId] : prev.filter((id) => id !== jobId)
    );
  };

  if (filteredJobs.length === 0) {
    return (
      <div className="dashboard-page">
        <h1 className="dashboard-page__title">Dashboard</h1>
        <FilterBar
          filters={filters}
          onFilterChange={setFilters}
          resultCount={0}
        />
        <div className="dashboard-page__empty">
          <EmptyState
            title="No jobs match your search"
            description="Try adjusting your filters to see more results."
          />
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-page">
      <h1 className="dashboard-page__title">Dashboard</h1>
      <FilterBar
        filters={filters}
        onFilterChange={setFilters}
        resultCount={filteredJobs.length}
      />
      <div className="dashboard-page__grid">
        {filteredJobs.map((job) => (
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
