import { useState } from 'react';
import { Expenses } from "./components/Expenses/Expenses";
import { NewExpense } from "./components/NewExpense/NewExpense";
import "./App.css";

// the dummy data used for this expense tracker project
const DUMMY_EXPENSES = [
  {
    id: "e1",
    title: "Toilet Paper",
    amount: 94.12,
    date: new Date(2020, 7, 14),
  },
  { id: "e2", title: "New TV", amount: 799.49, date: new Date(2021, 2, 12) },
  {
    id: "e3",
    title: "Car Insurance",
    amount: 294.67,
    date: new Date(2021, 2, 28),
  },
  {
    id: "e4",
    title: "New Desk (Wooden)",
    amount: 450,
    date: new Date(2021, 5, 12),
  },
];

export const App = () => {
  const[expenses, setExpenses] = useState(DUMMY_EXPENSES);

  // this function is used to add a new expense to the list of expenses
  // and it is called from the NewExpense component
  const addExpenseHandler = expense => {
    // use the setExpenses function to get the previous state and add the new expense
    setExpenses((prevExpense) => {
      // this returns the previous state of the expenses array
      // and adds the new expense to the end of the array
      return [expense, ...prevExpense]
    })
  };

  return (
    <div>
      <NewExpense onAddExpense={addExpenseHandler} />
      <Expenses items={expenses} />
    </div>
  );
}