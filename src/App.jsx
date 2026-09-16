import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Home from './pages/Home.jsx'
import JobDetails from './pages/JobDetails.jsx'
import SavedJobs from './pages/SavedJobs.jsx'
import ApplyForm from './pages/ApplyForm.jsx'

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/jobs/:id" element={<JobDetails />} />
          <Route path="/saved" element={<SavedJobs />} />
          <Route path="/apply/:id" element={<ApplyForm />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
      <footer className="site-footer">
        <p>Trailhead — a job portal built with React, hooks and a REST API.</p>
      </footer>
    </>
  )
}
