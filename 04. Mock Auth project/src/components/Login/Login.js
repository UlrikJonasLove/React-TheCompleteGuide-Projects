import React, { useState, useEffect, useReducer, useContext, useRef } from 'react';
import Input from '../input/input';
import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
import AuthContext from '../context/auth-context';

const Login = (props) => {
  const [formIsValid, setFormIsValid] = useState(false);

  // useReducer instead of useState
  const [emailState, dispatchEmail] = useReducer((state, action) => {
    if(action.type === "USER_INPUT") {
      return {value: action.val, isValid: action.val.includes("@") };
    }
    if(action.type === "INPUT_BLUR") {
      return {value: state.value, isValid: state.value.includes("@") };
    }
    return {value: "", isValid: false };
  }, 
  //initial state
  {value: '', isValid: null });


  // useReducer instead of useState
  const [passwordState, dispatchPassword] = useReducer((state, action) => {
    if(action.type === "USER_INPUT") {
      return {value: action.val, isValid: action.val.trim().length > 6 };
    }
    if(action.type === "USER_BLUR") {
      return {value: action.val, isValid: action.state.trim().length > 6 };
    }
    return {value: "", isValid: false}
  },
  //initial state
  {value: '', isValid: null });

  useEffect(() => {
    console.log('EFFECT RUNNING');

    return () => {
      console.log('EFFECT CLEANUP');
    };
  }, []);

  const authCtx = useContext(AuthContext); // get the context
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  //object destructioring
  //adding the isValid property into a variable
  // const { isValid: emailIsValid } = emailState;
  // const { isValid: passwordIsValid } = passwordState;

  //side effect are mostly http request, but also keystrokes like enter the data for emailState or passwordState
  useEffect(() => {
    const identifier = setTimeout(() => {
      console.log('Checking form validity!');
      //state updating function will never change, so no need to add as dependency
      setFormIsValid(
        emailState.isValid && passwordState.isValid
      );
    }, 500);

    //this return is a UseEffect CLEANUP function
    // this cleanup process cleans before the useeffect runs again, but not the first time it runs
    return () => {
      console.log('CLEANUP');
      //clears the timer before we sets a new one 
      clearTimeout(identifier);
    };

    // add dependencies for what is used in the UseEffect
    // if nothing changes, the UseEffect will never re-run
  }, [emailState.isValid, passwordState.isValid]);//needs dependencies cause state will change

  const emailChangeHandler = (event) => {
    dispatchEmail({type: 'USER_INPUT', val: event.target.value})

    // setFormIsValid(
    //   event.target.value.includes('@') && passwordState.isValid
    // );
  };

  const passwordChangeHandler = (event) => {
    dispatchPassword({type: 'USER_INPUT', val: event.target.value});

    // setFormIsValid(
    //   emailState.isValid && event.target.value.trim().length > 6
    // );
  };

  const validateEmailHandler = () => {
    dispatchEmail({type: 'INPUT_BLUR'})
  }

  const validatePasswordHandler = () => {
    dispatchPassword({type: "INPUT_BLUR"})
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if(formIsValid) {
      authCtx.onLogin(emailState.value, passwordState.value);
    } else if(!emailState.isValid) {
      emailInputRef.current.focus();
    } else {
      passwordInputRef.current.focus();
    }
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <Input
          ref={emailInputRef} 
          id="email" 
          label="E-Mail" 
          type="email" 
          isValid={emailState.isValid} 
          value={emailState.value}
          onChange={emailChangeHandler}
          onBlur={validateEmailHandler} />

        <Input
          ref={passwordInputRef}
          id="password" 
          label="Password" 
          type="password" 
          isValid={passwordState.isValid} 
          value={passwordState.value}
          onChange={passwordChangeHandler}
          onBlur={validatePasswordHandler} />

        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
