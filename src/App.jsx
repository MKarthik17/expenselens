import { useState, useMemo } from "react";
import useExpenses from "./hooks/useExpenses.js";
import ExpenseForm from "./components/ExpenseForm.jsx";
import ExpenseList from "./components/ExpenseList.jsx";
import Filters from "./components/Filters.jsx";
import Charts from "./components/Charts.jsx";
import ThemeToggle from "./components/ThemeToggle.jsx";
import formatCurrency from "./utils/formatCurrency.js";

const defaultFilters = { search: "", category: "All", month: "", sort: "date-desc" };

export default function App() {
  const { expenses, addExpense, updateExpense, deleteExpense } = useExpenses();
  const [filters, setFilters] = useState(defaultFilters);
  const [editing, setEditing] = useState(null);

  // Apply filters and sorting. Recalculated only when something changes.
  const visible = useMemo(() => {
    const result = expenses.filter((e) => {
      if (filters.category !== "All" && e.category !== filters.category) return false;
      if (filters.month && !e.date.startsWith(filters.month)) return false;
      if (
        filters.search &&
        !e.title.toLowerCase().includes(filters.search.toLowerCase())
      )
        return false;
      return true;
    });

    result.sort((a, b) => {
      switch (filters.sort) {
        case "date-asc":
          return a.date.localeCompare(b.date);
        case "amount-desc":
          return b.amount - a.amount;
        case "amount-asc":
          return a.amount - b.amount;
        default:
          return b.date.localeCompare(a.date);
      }
    });
    return result;
  }, [expenses, filters]);

  const total = visible.reduce((sum, e) => sum + Number(e.amount), 0);

  const handleSave = (data) => {
    if (editing) {
      updateExpense({ ...data, id: editing.id });
      setEditing(null);
    } else {
      addExpense(data);
    }
  };

  const handleDelete = (id) => {
    if (window.confirm("Delete this expense?")) {
      deleteExpense(id);
      if (editing && editing.id === id) setEditing(null);
    }
  };

  return (
    <div className="app">
      <header className="header">
        <div>
          <h1>ExpenseLens</h1>
          <p className="muted">Track what you spend and see where it goes.</p>
        </div>
        <ThemeToggle />
      </header>

      <section className="summary">
        <span className="muted">Total for current view</span>
        <strong>{formatCurrency(total)}</strong>
      </section>

      <main className="layout">
        <ExpenseForm
          onSave={handleSave}
          editing={editing}
          onCancel={() => setEditing(null)}
        />
        <div className="content">
          <Filters filters={filters} onChange={setFilters} />
          <ExpenseList
            expenses={visible}
            onEdit={setEditing}
            onDelete={handleDelete}
          />
          <Charts expenses={visible} />
        </div>
      </main>
    </div>
  );
}
