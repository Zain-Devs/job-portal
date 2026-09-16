import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useSavedJobs } from '../context/JobContext.jsx'
import { Loader, ErrorView, EmptyState } from '../components/StatusViews.jsx'

export default function JobDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { isSaved, toggleSave } = useSavedJobs()

  const [job, setJob] = useState(null)
  const [status, setStatus] = useState('loading')

  useEffect(() => {
    let cancelled = false
    setStatus('loading')

    fetch('https://remotive.com/api/remote-jobs')
      .then((res) => {
        if (!res.ok) throw new Error('Network response was not ok')
        return res.json()
      })
      .then((data) => {
        if (cancelled) return
        const found = (data.jobs || []).find((j) => String(j.id) === id)
        if (found) {
          setJob(found)
          setStatus('success')
        } else {
          setStatus('not-found')
        }
      })
      .catch(() => {
        if (!cancelled) setStatus('error')
      })

    return () => {
      cancelled = true
    }
  }, [id])

  if (status === 'loading') return <Loader />
  if (status === 'error') return <ErrorView />
  if (status === 'not-found') {
    return (
      <EmptyState
        title="This role couldn't be found."
        description="It may have closed, or the link may be out of date."
      />
    )
  }

  const saved = isSaved(job.id)

  return (
    <div className="page job-details">
      <button type="button" className="back-link" onClick={() => navigate(-1)}>
        ← Back to results
      </button>

      <div className="job-details__header">
        <div>
          <h1>{job.title}</h1>
          <p className="job-details__company">{job.company_name}</p>
          <div className="job-card__meta">
            <span>{job.candidate_required_location}</span>
            <span className="job-card__dot">•</span>
            <span>{job.category}</span>
            <span className="job-card__dot">•</span>
            <span>{(job.job_type || '').replace(/_/g, ' ')}</span>
          </div>
        </div>
        <div className="job-details__actions">
          <button
            type="button"
            className={`save-btn ${saved ? 'save-btn--active' : ''}`}
            onClick={() => toggleSave(job)}
          >
            {saved ? 'Saved' : 'Save for later'}
          </button>
          <Link to={`/apply/${job.id}`} className="btn-primary">
            Apply now
          </Link>
        </div>
      </div>

      {job.salary && <p className="job-details__salary">Salary: {job.salary}</p>}

      <div
        className="job-details__body"
        dangerouslySetInnerHTML={{ __html: job.description }}
      />
    </div>
  )
}
