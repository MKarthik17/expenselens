# ExpenseLens 💸

A simple, responsive expense tracker dashboard built with **React** and **Vite**. Add your daily expenses, filter them, and see where your money goes with clear charts.

🔗 **Live Demo:** _add your Vercel/Netlify link here_

![ExpenseLens screenshot](./screenshots/dashboard.png)
_(add a screenshot of your app in a `screenshots` folder)_

---

## What does this project do? (In simple words)

Think of it as a digital notebook for your spending:

1. You type in an expense (for example, "Lunch - ₹150 - Food").
2. The app saves it and shows it in a list.
3. You can search, filter by category or date, and sort by amount.
4. Charts show how much you spent each month and on which category.
5. Your data stays saved in your browser, so it is still there when you reopen the page.

---

## Features

- Add, edit and delete expenses
- Form validation (no empty or negative amounts)
- Filter by category and date, sort by amount or date
- Monthly spending chart and category-wise chart
- Dark / light theme toggle
- Data saved with `localStorage`
- Fully responsive (mobile, tablet, desktop)

## Tech Stack

| Area | Tools |
|------|-------|
| Framework | React 18 (Hooks) |
| Build tool | Vite |
| Styling | CSS (Flexbox / Grid) |
| Charts | Recharts |
| State | `useState`, `useReducer`, Context API |
| Storage | Browser `localStorage` |

## Project Structure

```
src/
├── components/
│   ├── ExpenseForm.jsx
│   ├── ExpenseList.jsx
│   ├── Filters.jsx
│   ├── Charts.jsx
│   └── ThemeToggle.jsx
├── hooks/
│   ├── useLocalStorage.js
│   └── useExpenses.js
├── context/
│   └── ThemeContext.jsx
├── utils/
│   ├── categories.js
│   ├── formatCurrency.js
│   └── groupByMonth.js
├── App.jsx
└── main.jsx
```

## How to Run Locally

```bash
# 1. Clone the repository
git clone https://github.com/MKarthik17/expenselens.git

# 2. Go into the folder
cd expenselens

# 3. Install dependencies
npm install

# 4. Start the development server
npm run dev
```

Open the link shown in the terminal (usually `http://localhost:5173`).

## What I Learned

- Breaking a UI into small reusable components
- Writing custom hooks (`useLocalStorage`, `useExpenses`)
- Managing shared state with Context API and `useReducer`
- Validating forms and handling user input
- Building responsive layouts and a theme switcher
- Deploying a React app to the web

## Future Improvements

- Export expenses to CSV
- Monthly budget limit with alerts
- Login and cloud storage
- Unit tests with Vitest

## Author

**M Karthik**
B.E. Computer Science, Cambridge Institute of Technology, Bengaluru
GitHub: [MKarthik17](https://github.com/MKarthik17)
