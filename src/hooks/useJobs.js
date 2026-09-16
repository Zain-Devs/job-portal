import { useEffect, useMemo, useState } from 'react'

const API_URL = 'https://remotive.com/api/remote-jobs'
const PAGE_SIZE = 9

// Fetches the full job feed once, then does search/filter/pagination
// client-side over that data using React state + memoization.
export function useJobs() {
  const [allJobs, setAllJobs] = useState([])
  const [status, setStatus] = useState('loading') // loading | success | error
  const [errorMessage, setErrorMessage] = useState('')

  const [search, setSearch] = useState('')
  const [jobType, setJobType] = useState('')
  const [category, setCategory] = useState('')
  const [location, setLocation] = useState('')
  const [page, setPage] = useState(1)

  useEffect(() => {
    let cancelled = false

    async function fetchJobs() {
      setStatus('loading')
      try {
        const res = await fetch(API_URL)
        if (!res.ok) throw new Error(`Request failed with status ${res.status}`)
        const data = await res.json()
        if (!cancelled) {
          setAllJobs(data.jobs || [])
          setStatus('success')
        }
      } catch (err) {
        if (!cancelled) {
          setErrorMessage(err.message || 'Something went wrong while loading jobs.')
          setStatus('error')
        }
      }
    }

    fetchJobs()
    return () => {
      cancelled = true
    }
  }, [])

  const jobTypes = useMemo(
    () => [...new Set(allJobs.map((j) => j.job_type).filter(Boolean))].sort(),
    [allJobs],
  )

  const categories = useMemo(
    () => [...new Set(allJobs.map((j) => j.category).filter(Boolean))].sort(),
    [allJobs],
  )

  const filteredJobs = useMemo(() => {
    const term = search.trim().toLowerCase()
    const loc = location.trim().toLowerCase()

    return allJobs.filter((job) => {
      const matchesSearch =
        !term ||
        job.title?.toLowerCase().includes(term) ||
        job.company_name?.toLowerCase().includes(term)
      const matchesType = !jobType || job.job_type === jobType
      const matchesCategory = !category || job.category === category
      const matchesLocation =
        !loc || job.candidate_required_location?.toLowerCase().includes(loc)

      return matchesSearch && matchesType && matchesCategory && matchesLocation
    })
  }, [allJobs, search, jobType, category, location])

  // Reset to page 1 whenever a filter changes so results aren't hidden
  // on a page that no longer exists.
  useEffect(() => {
    setPage(1)
  }, [search, jobType, category, location])

  const totalPages = Math.max(1, Math.ceil(filteredJobs.length / PAGE_SIZE))
  const currentPage = Math.min(page, totalPages)

  const visibleJobs = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE
    return filteredJobs.slice(start, start + PAGE_SIZE)
  }, [filteredJobs, currentPage])

  return {
    status,
    errorMessage,
    jobTypes,
    categories,
    filters: { search, jobType, category, location },
    setSearch,
    setJobType,
    setCategory,
    setLocation,
    visibleJobs,
    totalResults: filteredJobs.length,
    page: currentPage,
    totalPages,
    setPage,
    allJobs,
  }
}
