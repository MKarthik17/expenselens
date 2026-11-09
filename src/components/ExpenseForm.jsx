import { useState, useEffect } from "react";
import { CATEGORIES } from "../utils/categories.js";

const today = () => new Date().toISOString().slice(0, 10);
const emptyForm = () => ({ title: "", amount: "", category: "Food", date: today() });

export default function ExpenseForm({ onSave, editing, onCancel }) {
  const [form, setForm] = useState(emptyForm());
  const [errors, setErrors] = useState({});

  // When the user clicks "Edit", fill the form with that expense.
  useEffect(() => {
    setForm(editing ? editing : emptyForm());
    setErrors({});
  }, [editing]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const found = {};
    if (!form.title.trim()) found.title = "Enter what you spent on.";
    if (!form.amount || Number(form.amount) <= 0)
      found.amount = "Amount must be more than 0.";
    if (!form.date) found.date = "Pick a date.";
    return found;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const found = validate();
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    onSave({ ...form, title: form.title.trim(), amount: Number(form.amount) });
    setForm(emptyForm());
  };

  return (
    <form className="panel form" onSubmit={handleSubmit} noValidate>
      <h2>{editing ? "Edit expense" : "Add expense"}</h2>

      <label>
        Title
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Lunch at the canteen"
        />
        {errors.title && <span className="error">{errors.title}</span>}
      </label>

      <label>
        Amount (₹)
        <input
          name="amount"
          type="number"
          min="0"
          step="0.01"
          value={form.amount}
          onChange={handleChange}
        />
        {errors.amount && <span className="error">{errors.amount}</span>}
      </label>

      <label>
        Category
        <select name="category" value={form.category} onChange={handleChange}>
          {CATEGORIES.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
      </label>

      <label>
        Date
        <input
          name="date"
          type="date"
          value={form.date}
          onChange={handleChange}
        />
        {errors.date && <span className="error">{errors.date}</span>}
      </label>

      <div className="form-actions">
        <button className="btn" type="submit">
          {editing ? "Save changes" : "Add expense"}
        </button>
        {editing && (
          <button className="btn btn-ghost" type="button" onClick={onCancel}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
