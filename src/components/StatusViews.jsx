export function Loader() {
  return (
    <div className="status-view" role="status">
      <div className="loader" aria-hidden="true" />
      <p>Loading open roles…</p>
    </div>
  )
}

export function ErrorView({ message, onRetry }) {
  return (
    <div className="status-view status-view--error" role="alert">
      <p>We couldn't load jobs right now{message ? `: ${message}` : '.'}</p>
      {onRetry && (
        <button type="button" onClick={onRetry}>
          Try again
        </button>
      )}
    </div>
  )
}

export function EmptyState({ title, description }) {
  return (
    <div className="status-view">
      <p className="status-view__title">{title}</p>
      {description && <p>{description}</p>}
    </div>
  )
}
