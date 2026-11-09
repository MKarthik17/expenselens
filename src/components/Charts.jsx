import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { groupByMonth, groupByCategory } from "../utils/groupByMonth.js";
import formatCurrency from "../utils/formatCurrency.js";

const COLORS = [
  "#2f6f73",
  "#e0a030",
  "#6b5ca5",
  "#c8553d",
  "#4f8a3c",
  "#3d78b8",
  "#8a8a8a",
];

export default function Charts({ expenses }) {
  if (expenses.length === 0) return null;

  const monthly = groupByMonth(expenses);
  const byCategory = groupByCategory(expenses);

  return (
    <div className="charts">
      <div className="panel">
        <h2>Spending by month</h2>
        <ResponsiveContainer width="100%" height={240}>
          <BarChart data={monthly}>
            <XAxis dataKey="month" stroke="currentColor" />
            <YAxis stroke="currentColor" />
            <Tooltip formatter={(v) => formatCurrency(v)} />
            <Bar dataKey="total" fill="#2f6f73" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="panel">
        <h2>Spending by category</h2>
        <ResponsiveContainer width="100%" height={240}>
          <PieChart>
            <Pie data={byCategory} dataKey="value" nameKey="name" outerRadius={85}>
              {byCategory.map((_, i) => (
                <Cell key={i} fill={COLORS[i % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip formatter={(v) => formatCurrency(v)} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
