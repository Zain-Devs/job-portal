import { Link } from 'react-router-dom'
import { useSavedJobs } from '../context/JobContext.jsx'

function timeAgo(dateString) {
  const days = Math.floor((Date.now() - new Date(dateString).getTime()) / 86400000)
  if (Number.isNaN(days)) return ''
  if (days <= 0) return 'Posted today'
  if (days === 1) return 'Posted yesterday'
  if (days < 30) return `Posted ${days} days ago`
  const months = Math.floor(days / 30)
  return `Posted ${months} month${months > 1 ? 's' : ''} ago`
}

export default function JobCard({ job }) {
  const { isSaved, toggleSave } = useSavedJobs()
  const saved = isSaved(job.id)

  return (
    <article className={`job-card job-card--${(job.job_type || 'other').split('_')[0]}`}>
      <div className="job-card__main">
        <Link to={`/jobs/${job.id}`} className="job-card__title">
          {job.title}
        </Link>
        <p className="job-card__company">{job.company_name}</p>
        <div className="job-card__meta">
          <span>{job.candidate_required_location}</span>
          <span className="job-card__dot">•</span>
          <span>{job.category}</span>
          {job.publication_date && (
            <>
              <span className="job-card__dot">•</span>
              <span>{timeAgo(job.publication_date)}</span>
            </>
          )}
        </div>
      </div>
      <div className="job-card__side">
        <span className="job-card__type">{(job.job_type || '').replace(/_/g, ' ')}</span>
        <button
          type="button"
          className={`save-btn ${saved ? 'save-btn--active' : ''}`}
          onClick={() => toggleSave(job)}
          aria-pressed={saved}
        >
          {saved ? 'Saved' : 'Save'}
        </button>
      </div>
    </article>
  )
}
