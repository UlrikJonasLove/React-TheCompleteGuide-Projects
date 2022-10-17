import React from 'react';
import styles from './Input.module.css';

//adding ref so we can get access to our input through refs
export const Input = React.forwardRef((props, ref) => {
    return (
        <div className={styles.input}>
            {/*htmlFor (instead of for) is a reserved keyword in react, as className(instead of class) is */}
            <label htmlFor={props.input.id}>{props.label}</label>

            {/* this {...props.input} assures all the key-value pairs 
            in the input object which we recieve on props.input are added as props to input*/}
            <input ref={ref} {...props.input} /> 
        </div>
    )
})