import { useState, useRef } from "react";

const SimpleInput = (props) => {
  const nameInputRef = useRef();
  const [enteredName, setEnteredName] = useState("");
  const [enteredNameTouched, setEnteredNameTouched] = useState(false);

  const enteredNameIsValid = enteredName.trim() !== "";

  const nameInputIsInvalid = 
    !enteredNameIsValid 
    && enteredNameTouched;

    let formIsValid = false;

    if (enteredNameIsValid) {
      formIsValid = true;
    }

  const nameInputChangeHandler = event => {
    // checking on every keystroke
    setEnteredName(event.target.value); // this is the value of the input
  }

  const nameInputBlurHandler = event => {
    setEnteredNameTouched(true);
  }

  const formSubmissionHandler = event => { 
    event.preventDefault(); // Prevents the default behavior of the browser, so the app wont reload
    setEnteredNameTouched(true);

    if(!enteredNameIsValid) {
      return; // if the input is empty, it will return and not execute the code below
    }

    console.log(enteredName) // this comes from the state
    const enteredValue = nameInputRef.current.value; // the current value of the input
    console.log(enteredValue) // this comes from the ref
    // no need to use both the state and the ref
    // if the value will only be used once after form is submitting, use the ref
    // if we need instant validation, and value after every keystroke, use the state

    // nameInputRef.current.value = ""; // not ideal, dont manipulate the dom

    setEnteredName(""); // reset the state, this is the ideal way
    setEnteredNameTouched(false); // reset the state
  }

  const nameInputClasses = nameInputIsInvalid 
    ? "form-control invalid" 
    : "form-control";

  return (
    <form onSubmit={formSubmissionHandler}>
      <div className={nameInputClasses}>
        <label htmlFor='name'>Your Name</label>
        <input 
        ref={nameInputRef} 
        type='text' 
        id='name' 
        onChange={nameInputChangeHandler} 
        onBlur={nameInputBlurHandler} value={enteredName}/>
      </div>
      {nameInputIsInvalid && <p className="error-text">Name must not be empty</p>}
      <div className="form-actions">
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;