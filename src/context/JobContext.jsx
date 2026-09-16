import { createContext, useContext, useEffect, useState } from 'react'

const SavedJobsContext = createContext(null)
const STORAGE_KEY = 'trailhead_saved_jobs'

export function SavedJobsProvider({ children }) {
  const [savedJobs, setSavedJobs] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      return raw ? JSON.parse(raw) : []
    } catch {
      return []
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(savedJobs))
    } catch {
      // storage unavailable — fail silently, saved list just won't persist
    }
  }, [savedJobs])

  const isSaved = (id) => savedJobs.some((j) => j.id === id)

  const toggleSave = (job) => {
    setSavedJobs((prev) =>
      prev.some((j) => j.id === job.id)
        ? prev.filter((j) => j.id !== job.id)
        : [...prev, job],
    )
  }

  const removeSaved = (id) => {
    setSavedJobs((prev) => prev.filter((j) => j.id !== id))
  }

  return (
    <SavedJobsContext.Provider value={{ savedJobs, isSaved, toggleSave, removeSaved }}>
      {children}
    </SavedJobsContext.Provider>
  )
}

export function useSavedJobs() {
  const ctx = useContext(SavedJobsContext)
  if (!ctx) throw new Error('useSavedJobs must be used within SavedJobsProvider')
  return ctx
}
