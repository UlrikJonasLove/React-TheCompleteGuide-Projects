import { useState } from 'react';
import "./NewExpense.css";
import { ExpenseForm } from "./ExpenseForm";

export const NewExpense = props => {

  //use state hook to start and stop editing/adding form with boolean value, initial value = false
  const [isEditing, setIsEditing] = useState(false); 

  // entered expense data is the function that handles data entered into the form
  const saveExpenseDataHandler = enteredExpenseData => { 

    // new object with the data
    const expeseData = {
      ...enteredExpenseData, 

      // random id generator that converts to a string
      id: Math.random().toString(), 
    };

    // pass functionality via props
    props.onAddExpense(expeseData); 
    setIsEditing(false);
  };

  //this function is for open up the editing/adding form, make the boolean value in useState function to true
  const startEditingHandler = () => {
      setIsEditing(true)
  };

  //this function is for closing the editing/adding form, make the boolean value in useState function to false again
  const stopEditingHandler = () => {
    setIsEditing(false);
  };

  return (
    <div className="new-expense">
      {/* checking if isEditing useState variable is false, and then show button to add new expense*/}
      {!isEditing && <button onClick={startEditingHandler}>Add New Expense</button>}

      {/* Check if isEditing useState variable is true, display expenseForm component, */}
      {isEditing && <ExpenseForm onSaveExpenseData={saveExpenseDataHandler} onCancel={stopEditingHandler}/> } 
    </div>
  );
};
