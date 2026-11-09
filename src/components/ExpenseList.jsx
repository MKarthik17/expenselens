import formatCurrency from "../utils/formatCurrency.js";

export default function ExpenseList({ expenses, onEdit, onDelete }) {
  if (expenses.length === 0) {
    return (
      <div className="panel empty">
        No expenses to show. Add one using the form, or change the filters.
      </div>
    );
  }

  return (
    <ul className="panel list">
      {expenses.map((e) => (
        <li key={e.id} className="row">
          <div className="row-main">
            <strong>{e.title}</strong>
            <span className="muted">
              {e.category} · {e.date}
            </span>
          </div>
          <span className="amount">{formatCurrency(e.amount)}</span>
          <div className="row-actions">
            <button className="btn btn-ghost" onClick={() => onEdit(e)}>
              Edit
            </button>
            <button className="btn btn-danger" onClick={() => onDelete(e.id)}>
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
