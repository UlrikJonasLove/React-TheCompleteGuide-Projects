import { useState, useRef } from "react";
import { Button } from "../UI/Button";
import { Card } from "../UI/Card";
import { Wrapper } from "../Helpers/Wrapper";
import { ErrorModal } from "../UI/ErrorModal";
import css from "./style/Users.module.css";

// AddUser arrow function with props
//this component is now an uncontrolled component because it doesn't have a state on input elements
//with refs we have uncontrolled inputs
export const AddUser = (props) => {
  const nameInputRef = useRef();
  const ageInputRef = useRef();
  // const [enteredUsername, setEnteredUsername] = useState(""); using refs instead of state
  // const [enteredAge, setEnteredAge] = useState(""); using refs instead of state
  const [error, setError] = useState();

  const addUserHandler = (event) => {
    event.preventDefault();
    const enteredName = nameInputRef.current.value;
    const enteredUserAge = ageInputRef.current.value;
    if (enteredName.trim().length === 0 || enteredUserAge.trim().length === 0) {
      setError({
        text: "Please enter a valid username and age",
        title: "Invalid input"
      });
      return;
    }
    if (+enteredUserAge < 1) {
      setError({
        text: "Please enter a valid age",
        title: "Invalid input"
      });
      return;
    }

    props.onAddUser(enteredName, enteredUserAge);
    // setEnteredAge("");
    // setEnteredUsername("");
    // this resets the value of the inputs
    nameInputRef.current.value = "";
    ageInputRef.current.value = "";
  };

  // const userNameChangeHandler = (event) => {
  //   setEnteredUsername(event.target.value);
  // };

  // const ageChangeHandler = (event) => {
  //   setEnteredAge(event.target.value);
  // };

  const errorHandler = () => {
    setError(null);
  };

  return (
    <Wrapper>
      {/* if error, display error modal */}
      {error && <ErrorModal
        title={error.title}
        text={error.text}
        btnText="Okay"
        onConfirm={errorHandler}
      />}
      <Card className={css.input}>
        <form onSubmit={addUserHandler}>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            placeholder="username"
            ref={nameInputRef}
          />

          <label htmlFor="age">Age</label>
          <input
            type="number"
            id="age"
            placeholder="age"
            ref={ageInputRef}
          />
          <Button type="submit">Add User</Button>
        </form>
      </Card>
    </Wrapper>
  );
};
