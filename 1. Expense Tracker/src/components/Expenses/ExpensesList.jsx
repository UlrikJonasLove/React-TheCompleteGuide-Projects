import { ExpenseItem } from "./ExpenseItem";
import './ExpensesList.css';

// this component is used to display the list of expenses
// it takes an array of expenses
// it returns a list of ExpenseItem components
// each ExpenseItem component is responsible for rendering an expense
export const ExpensesList = props => {
  if(props.items.length === 0) {
    // checks if the array of expenses is empty
    // if it is, it displays a message to the user
    return <h2 className="expenses-list__fallback">Found no expenses.</h2>
  }

  return(
    <ul className="expenses-list">
        {props.items.map((expense) => (
        <ExpenseItem
        key={expense.id}
        title={expense.title}
        date={expense.date}
        amount={expense.amount}
      />
    ))}
    </ul>
  )
};