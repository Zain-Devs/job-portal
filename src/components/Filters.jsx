function prettify(value) {
  return value.replace(/_/g, ' ').replace(/^\w/, (c) => c.toUpperCase())
}

export default function Filters({
  search,
  onSearch,
  jobType,
  onJobType,
  category,
  onCategory,
  location,
  onLocation,
  jobTypes,
  categories,
  onClear,
}) {
  return (
    <aside className="filters">
      <div className="filters__group">
        <label htmlFor="search">Search</label>
        <input
          id="search"
          type="text"
          placeholder="Title or company"
          value={search}
          onChange={(e) => onSearch(e.target.value)}
        />
      </div>

      <div className="filters__group">
        <label htmlFor="location">Location</label>
        <input
          id="location"
          type="text"
          placeholder="e.g. Europe, USA only"
          value={location}
          onChange={(e) => onLocation(e.target.value)}
        />
      </div>

      <div className="filters__group">
        <label htmlFor="jobType">Job type</label>
        <select id="jobType" value={jobType} onChange={(e) => onJobType(e.target.value)}>
          <option value="">Any type</option>
          {jobTypes.map((t) => (
            <option key={t} value={t}>
              {prettify(t)}
            </option>
          ))}
        </select>
      </div>

      <div className="filters__group">
        <label htmlFor="category">Category</label>
        <select id="category" value={category} onChange={(e) => onCategory(e.target.value)}>
          <option value="">Any category</option>
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      <button type="button" className="filters__clear" onClick={onClear}>
        Clear filters
      </button>
    </aside>
  )
}
