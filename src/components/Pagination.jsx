export default function Pagination({ page, totalPages, onChange }) {
  if (totalPages <= 1) return null

  const pages = []
  const start = Math.max(1, page - 2)
  const end = Math.min(totalPages, start + 4)

  for (let p = start; p <= end; p++) pages.push(p)

  return (
    <nav className="pagination" aria-label="Job results pages">
      <button disabled={page === 1} onClick={() => onChange(page - 1)}>
        Previous
      </button>
      {start > 1 && <span className="pagination__ellipsis">…</span>}
      {pages.map((p) => (
        <button
          key={p}
          className={p === page ? 'is-active' : ''}
          onClick={() => onChange(p)}
          aria-current={p === page ? 'page' : undefined}
        >
          {p}
        </button>
      ))}
      {end < totalPages && <span className="pagination__ellipsis">…</span>}
      <button disabled={page === totalPages} onClick={() => onChange(page + 1)}>
        Next
      </button>
    </nav>
  )
}
