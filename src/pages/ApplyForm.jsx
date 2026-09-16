import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const PHONE_RE = /^[\d+\-\s()]{7,}$/
const URL_RE = /^https?:\/\/.+/i

function validate(values) {
  const errors = {}
  if (!values.fullName.trim()) errors.fullName = 'Full name is required.'
  if (!values.email.trim()) {
    errors.email = 'Email is required.'
  } else if (!EMAIL_RE.test(values.email)) {
    errors.email = 'Enter a valid email address.'
  }
  if (!values.phone.trim()) {
    errors.phone = 'Phone number is required.'
  } else if (!PHONE_RE.test(values.phone)) {
    errors.phone = 'Enter a valid phone number.'
  }
  if (!values.resumeLink.trim()) {
    errors.resumeLink = 'A link to your resume is required.'
  } else if (!URL_RE.test(values.resumeLink)) {
    errors.resumeLink = 'Enter a full URL, starting with http:// or https://'
  }
  if (values.coverLetter.trim().length < 20) {
    errors.coverLetter = 'Say a little more — at least 20 characters.'
  }
  return errors
}

const initialValues = { fullName: '', email: '', phone: '', resumeLink: '', coverLetter: '' }

export default function ApplyForm() {
  const { id } = useParams()
  const [values, setValues] = useState(initialValues)
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (field) => (e) => {
    setValues((prev) => ({ ...prev, [field]: e.target.value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const nextErrors = validate(values)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length === 0) {
      setSubmitted(true)
    }
  }

  if (submitted) {
    return (
      <div className="page apply-form">
        <div className="status-view">
          <p className="status-view__title">Application sent.</p>
          <p>We've recorded your details for this role. Good luck!</p>
          <Link to={`/jobs/${id}`} className="btn-primary">
            Back to the role
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="page apply-form">
      <Link to={`/jobs/${id}`} className="back-link">
        ← Back to role
      </Link>
      <h1 className="page__title">Apply for this role</h1>

      <form className="form" onSubmit={handleSubmit} noValidate>
        <div className="form__field">
          <label htmlFor="fullName">Full name</label>
          <input
            id="fullName"
            type="text"
            value={values.fullName}
            onChange={handleChange('fullName')}
            aria-invalid={Boolean(errors.fullName)}
          />
          {errors.fullName && <p className="form__error">{errors.fullName}</p>}
        </div>

        <div className="form__field">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            value={values.email}
            onChange={handleChange('email')}
            aria-invalid={Boolean(errors.email)}
          />
          {errors.email && <p className="form__error">{errors.email}</p>}
        </div>

        <div className="form__field">
          <label htmlFor="phone">Phone number</label>
          <input
            id="phone"
            type="tel"
            value={values.phone}
            onChange={handleChange('phone')}
            aria-invalid={Boolean(errors.phone)}
          />
          {errors.phone && <p className="form__error">{errors.phone}</p>}
        </div>

        <div className="form__field">
          <label htmlFor="resumeLink">Resume link</label>
          <input
            id="resumeLink"
            type="url"
            placeholder="https://…"
            value={values.resumeLink}
            onChange={handleChange('resumeLink')}
            aria-invalid={Boolean(errors.resumeLink)}
          />
          {errors.resumeLink && <p className="form__error">{errors.resumeLink}</p>}
        </div>

        <div className="form__field">
          <label htmlFor="coverLetter">Cover letter</label>
          <textarea
            id="coverLetter"
            rows={6}
            value={values.coverLetter}
            onChange={handleChange('coverLetter')}
            aria-invalid={Boolean(errors.coverLetter)}
          />
          {errors.coverLetter && <p className="form__error">{errors.coverLetter}</p>}
        </div>

        <button type="submit" className="btn-primary">
          Submit application
        </button>
      </form>
    </div>
  )
}
