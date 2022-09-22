import { useState } from "react";
import "./ExpenseForm.css";

export const ExpenseForm = props => {
  // multiply state approach
  const [enteredTitle, setEnteredTitle] = useState("");
  const [enteredAmont, setEnteredAmount] = useState("");
  const [enteredDate, setEnteredDate] = useState("");

  // one state approach
  // const [userInput, setUserInput] = useState({
  //     enteredTitle: "",
  //     enteredAmount: "",
  //     enteredDate: ""
  // });

  const titleChangeHandler = (event) => {
    setEnteredTitle(event.target.value);

    // setUserInput({
    //     ...userInput,// previous state
    //     enteredTitle: event.target.value, // update only this state
    // })

    // use this state function when my state update depends on my previous state
    //prevState is always the latest state
    // setUserInput((prevState) => {
    //     return {...prevState, enteredTitle: event.target.value};
    // });
  };

  const amountChangeHandler = event => {
    setEnteredAmount(event.target.value);

    // setUserInput({
    //     ...userInput, // previous state
    //     enteredAmount: event.target.value, // Update only this state
    // })
  };

  const dateChangeHandler = event => {
    setEnteredDate(event.target.value);

    // setUserInput({
    //     ...userInput, // previous state
    //     enteredDate: event.target.value, // update only this state
    // })
  };

  const submitHandler = event => {
    event.preventDefault(); // page will not reload when submitting the form, prevents the default behavior

    const expenseData = {
      title: enteredTitle,
      amount: +enteredAmont, // this converts the string to a number (+ sign is used to convert to a number)
      date: new Date(enteredDate),
    };

    props.onSaveExpenseData(expenseData); // sending a function via props that expects expenseData object

    // this three will set the state in the inputs to default value on the state variables, which is an empty string, when submitting the form
    setEnteredTitle(""); 
    setEnteredAmount(""); 
    setEnteredDate("");
  };

  return (
      // onSubmit sould be on the form, not on the button, cause we are submitting the form
    <form onSubmit={submitHandler}> 
      <div className="new-expense__controls">
        <div className="new-expense__control">
          <label>Title</label>
          <input
            type="text"
            value={enteredTitle} // returns to default value when submitting
            onChange={titleChangeHandler}
          />
        </div>
        <div className="new-expense__control">
          <label>Amount</label>
          <input
            type="number"
            min="0.01"
            step="0.01"
            value={enteredAmont} // returns to default value when submitting
            onChange={amountChangeHandler}
          />
        </div>
        <div className="new-expense__control">
          <label>Date</label>
          <input
            type="date"
            min="2019-01-01"
            max="2022-12-31"
            value={enteredDate} // returns to default value when submitting
            onChange={dateChangeHandler}
          />
        </div>
      </div>
      <div className="new-expense__actions">
        <button type="button" onClick={props.onCancel}>Cancel</button>
        <button type="submit">Add Expense</button>
      </div>
    </form>
  );
};
