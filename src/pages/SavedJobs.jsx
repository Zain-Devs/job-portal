import { Link } from 'react-router-dom'
import { useSavedJobs } from '../context/JobContext.jsx'
import { EmptyState } from '../components/StatusViews.jsx'

export default function SavedJobs() {
  const { savedJobs, removeSaved } = useSavedJobs()

  return (
    <div className="page">
      <h1 className="page__title">Your saved roles</h1>

      {savedJobs.length === 0 ? (
        <EmptyState
          title="Nothing saved yet."
          description="Save a role from the listings page to come back to it later."
        />
      ) : (
        <div className="job-list">
          {savedJobs.map((job) => (
            <article key={job.id} className="job-card">
              <div className="job-card__main">
                <Link to={`/jobs/${job.id}`} className="job-card__title">
                  {job.title}
                </Link>
                <p className="job-card__company">{job.company_name}</p>
                <div className="job-card__meta">
                  <span>{job.candidate_required_location}</span>
                  <span className="job-card__dot">•</span>
                  <span>{job.category}</span>
                </div>
              </div>
              <div className="job-card__side">
                <Link to={`/apply/${job.id}`} className="btn-primary btn-primary--small">
                  Apply
                </Link>
                <button type="button" className="save-btn save-btn--active" onClick={() => removeSaved(job.id)}>
                  Remove
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  )
}
