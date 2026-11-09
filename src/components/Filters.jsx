import { CATEGORIES } from "../utils/categories.js";

export default function Filters({ filters, onChange }) {
  const handleChange = (e) => {
    onChange({ ...filters, [e.target.name]: e.target.value });
  };

  return (
    <div className="panel filters">
      <input
        name="search"
        placeholder="Search by title"
        value={filters.search}
        onChange={handleChange}
        aria-label="Search by title"
      />
      <select
        name="category"
        value={filters.category}
        onChange={handleChange}
        aria-label="Filter by category"
      >
        <option value="All">All categories</option>
        {CATEGORIES.map((c) => (
          <option key={c}>{c}</option>
        ))}
      </select>
      <input
        name="month"
        type="month"
        value={filters.month}
        onChange={handleChange}
        aria-label="Filter by month"
      />
      <select
        name="sort"
        value={filters.sort}
        onChange={handleChange}
        aria-label="Sort expenses"
      >
        <option value="date-desc">Newest first</option>
        <option value="date-asc">Oldest first</option>
        <option value="amount-desc">Highest amount</option>
        <option value="amount-asc">Lowest amount</option>
      </select>
    </div>
  );
}
