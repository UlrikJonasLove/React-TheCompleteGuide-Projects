import React, { useState } from 'react';
import Button from '../../UI/Button/Button';
import styles from './CourseInput.module.css';
// import styled from 'styled-components';

// const FormControl = styled.div` <-- Creating a div as a styled component called FormControl with this specific css code
//   margin: 0.5rem 0;


// & label {
//   font-weight: bold;
//   display: block;
//   margin-bottom: 0.5rem;
//   color: ${props => props.invalid ? 'red' : 'black'} <-- Dynamically change css property
// }

// & input {
//   display: block;
//   width: 100%;
//   border: 1px solid ${props => (props.invalid ? 'red' : '#ccc')}; <-- Dynamically change css property
//   background: ${props => props.invalid ? '#eed1d1' : 'transparent'} <-- Dynamically change css property
//   font: inherit;
//   line-height: 1.5rem;
//   padding: 0 0.25rem;
// }

// & input:focus {
//   outline: none;
//   background: #fad0ec;
//   border-color: #8b005d;
// }`;

const CourseInput = props => {
  const [enteredValue, setEnteredValue] = useState('');
  const [isValid, setIsValid] = useState(true);

  const goalInputChangeHandler = event => {
    //resetting to the default
    if(event.target.value.trim().length === 0) {
      setIsValid(true);
    }
    setEnteredValue(event.target.value);
  };

  const formSubmitHandler = event => {
    event.preventDefault();

    //check if the entered value contains anything
    if(enteredValue.trim().length === 0){
      setIsValid(false);
      return; // function executions stops when return
    };

    props.onAddGoal(enteredValue);
  };

  return (
    <form onSubmit={formSubmitHandler}>
      {/* 
      ** Dynamically adding new classes to className with ternary operator **
        <div className={`form-control ${!isValid ? 'invalid' : ''}`}> Some content in here </div>
      ** Dynamically adding styles to styled-components via props ** 
       <FormControl invalid={!isValid}> Some content in here </FormControl> <-- FormControl is a styled component as a div
      */}

      {/* 
        gets the form-control class directly from the css module 
        when using css classnames with -, as form-control, it must be within []
      */}
      <div className={`${styles['form-control']} ${!isValid && styles.invalid}` /* Dynamically change style with css modules */}>
        <label>Course Goal</label>
        <input type="text" onChange={goalInputChangeHandler} />
      </div>
      <Button type="submit">Add Goal</Button>
      
    </form>
  );
};

export default CourseInput;
