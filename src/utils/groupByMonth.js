// Total spending per month, oldest first. Dates look like "2026-10-29".
export function groupByMonth(expenses) {
  const totals = {};
  expenses.forEach((e) => {
    const key = e.date.slice(0, 7); // "2026-10"
    totals[key] = (totals[key] || 0) + Number(e.amount);
  });

  return Object.keys(totals)
    .sort()
    .map((key) => {
      const [year, month] = key.split("-");
      const label = new Date(Number(year), Number(month) - 1).toLocaleString(
        "en-IN",
        { month: "short", year: "2-digit" }
      );
      return { month: label, total: totals[key] };
    });
}

// Total spending per category.
export function groupByCategory(expenses) {
  const totals = {};
  expenses.forEach((e) => {
    totals[e.category] = (totals[e.category] || 0) + Number(e.amount);
  });
  return Object.keys(totals).map((name) => ({ name, value: totals[name] }));
}
