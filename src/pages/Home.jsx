import { useJobs } from '../hooks/useJobs.js'
import Filters from '../components/Filters.jsx'
import JobCard from '../components/JobCard.jsx'
import Pagination from '../components/Pagination.jsx'
import { Loader, ErrorView, EmptyState } from '../components/StatusViews.jsx'

export default function Home() {
  const {
    status,
    errorMessage,
    jobTypes,
    categories,
    filters,
    setSearch,
    setJobType,
    setCategory,
    setLocation,
    visibleJobs,
    totalResults,
    page,
    totalPages,
    setPage,
  } = useJobs()

  const clearFilters = () => {
    setSearch('')
    setJobType('')
    setCategory('')
    setLocation('')
  }

  return (
    <div className="page">
      <section className="hero">
        <h1>Work that follows the trail you actually want.</h1>
        <p>
          Browse remote roles pulled live from Remotive, filter by type, category and
          location, and keep a shortlist as you go.
        </p>
      </section>

      <div className="layout">
        <Filters
          search={filters.search}
          onSearch={setSearch}
          jobType={filters.jobType}
          onJobType={setJobType}
          category={filters.category}
          onCategory={setCategory}
          location={filters.location}
          onLocation={setLocation}
          jobTypes={jobTypes}
          categories={categories}
          onClear={clearFilters}
        />

        <div className="results">
          {status === 'loading' && <Loader />}
          {status === 'error' && (
            <ErrorView message={errorMessage} onRetry={() => window.location.reload()} />
          )}
          {status === 'success' && (
            <>
              <p className="results__count">
                {totalResults} {totalResults === 1 ? 'role' : 'roles'} found
              </p>

              {visibleJobs.length === 0 ? (
                <EmptyState
                  title="No roles match those filters."
                  description="Try clearing a filter or widening your search."
                />
              ) : (
                <div className="job-list">
                  {visibleJobs.map((job) => (
                    <JobCard key={job.id} job={job} />
                  ))}
                </div>
              )}

              <Pagination page={page} totalPages={totalPages} onChange={setPage} />
            </>
          )}
        </div>
      </div>
    </div>
  )
}
