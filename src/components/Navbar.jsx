import { NavLink } from 'react-router-dom'
import { useSavedJobs } from '../context/JobContext.jsx'

export default function Navbar() {
  const { savedJobs } = useSavedJobs()

  return (
    <header className="nav">
      <div className="nav__inner">
        <NavLink to="/" className="nav__brand">
          Trailhead
        </NavLink>
        <nav className="nav__links">
          <NavLink to="/" end className={({ isActive }) => (isActive ? 'is-active' : '')}>
            Browse jobs
          </NavLink>
          <NavLink to="/saved" className={({ isActive }) => (isActive ? 'is-active' : '')}>
            Saved
            {savedJobs.length > 0 && <span className="nav__badge">{savedJobs.length}</span>}
          </NavLink>
        </nav>
      </div>
    </header>
  )
}
