import styles from './MealItemForm.module.css';
import { Input } from '../../UI/Input';
import { useRef, useState } from 'react';

export const MealItemForm = props => {
    const [amountIsValid, setAmountIsValid] = useState(true);
    const amountInputRef = useRef();
    // get the event object, sent as an object automatically when calling function
    const submitHandler = event => {
        //make sure browser default of reloading page is prevented
        event.preventDefault();

        const enteredAmount = amountInputRef.current.value;
        const enteredAmountNumber = +enteredAmount // convert string number to a int number

        if(enteredAmount.trim().Length === 0 || enteredAmountNumber < 1 || enteredAmountNumber > 5){
            setAmountIsValid(false)
            return;
        }

        props.onAddToCart(enteredAmountNumber);
    }
    return(
        <form className={styles.form} onSubmit={submitHandler}>
            <Input label="Amount" 
            ref={amountInputRef}
            input={{
                //adding an object to the input prop
                //which will make these key-value pairs into props for the input component
                id: "amount" + props.id, // gets unique id's, otherwise clicking ANY label will always select the same
                type: "number",
                min: '1',
                max: '5',
                step: '1',
                defaultValue: '1'
            }}/>
            <button>+ Add</button>
            {!amountIsValid && <p>Please enter a valid amount between 1-5</p>}
        </form>
    )
}