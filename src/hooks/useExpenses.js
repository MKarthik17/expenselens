import { useReducer, useEffect } from "react";

const STORAGE_KEY = "expenselens-expenses";

function reducer(state, action) {
  switch (action.type) {
    case "add":
      return [action.expense, ...state];
    case "update":
      return state.map((e) => (e.id === action.expense.id ? action.expense : e));
    case "delete":
      return state.filter((e) => e.id !== action.id);
    default:
      return state;
  }
}

function loadExpenses() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
}

export default function useExpenses() {
  const [expenses, dispatch] = useReducer(reducer, [], loadExpenses);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(expenses));
    } catch {
      // ignore storage errors
    }
  }, [expenses]);

  const addExpense = (data) =>
    dispatch({ type: "add", expense: { ...data, id: Date.now().toString() } });
  const updateExpense = (expense) => dispatch({ type: "update", expense });
  const deleteExpense = (id) => dispatch({ type: "delete", id });

  return { expenses, addExpense, updateExpense, deleteExpense };
}
