import styles from './Checkout.module.css';
import { useRef, useState } from 'react';

// helper methods
const isEmpty = value => value.trim() === ''; // checks if the input is empty
const isFiveCharsLong = value => value.trim().length === 5; // checks if it has a length of 5, then its valid

export const Checkout = props => { 
    const [formInputsValidity, setFormInputValidity] = useState({
        name: true,
        street: true,
        postal: true,
        city: true
    }); // where we store the validity  of our inputs

    const nameInputRef = useRef();	// this is used to take the value of input for name
    const streetInputRef = useRef();	// this is used to take the value of input for street to delivery
    const postalInputRef = useRef();	// this is used to take the value of input for postal code
    const cityInputRef = useRef();	// this is used to take the value of input for city

    const confirmHandler = event => {
        event.preventDefault(); // we dont not want to send data to a server, prevent default behavior
        const enteredName = nameInputRef.current.value; // current is used to get value
        const enteredStreet = streetInputRef.current.value;
        const enteredPostal = postalInputRef.current.value;
        const enteredCity = cityInputRef.current.value;

        const enteredNameIsValid = !isEmpty(enteredName); // check if name input is not empty, then its valid
        const enteredStreetIsValid = !isEmpty(enteredStreet); // check if street input is not empty
        const enteredCityIsValid = !isEmpty(enteredCity); // check if city input is not empty
        const enteredPostalIsValid = !isEmpty(enteredPostal) && isFiveCharsLong(enteredPostal); // checks if the input is not empty and not 5 chars long

        setFormInputValidity({
            name: enteredNameIsValid,
            street: enteredStreetIsValid,
            postal: enteredPostalIsValid,
            city: enteredCityIsValid
        })

        const formIsValid = 
        enteredNameIsValid && 
        enteredStreetIsValid && 
        enteredPostalIsValid && 
        enteredCityIsValid;

        if(!formIsValid) {
            return;    // invalid form, do no submission
        }

        // adding user entered data into object
        //from the checkout to cart, the props are passed
        props.onConfirm({
            name: enteredName,
            street: enteredStreet,
            postal: enteredPostal,
            city: enteredCity
        });
    }

    return (
        <form onSubmit={confirmHandler}>
            <div className={`${styles.control} ${formInputsValidity.name ? "" : styles.invalid}`}>
                <label htmlFor="name">Your name</label>
                <input type="text" id="name" ref={nameInputRef} />
                {!formInputsValidity.name && <p>Please enter a valid name</p>}
            </div>
            <div className={`${styles.control} ${formInputsValidity.street ? "" : styles.invalid}`}>
                <label htmlFor="street">Street</label>
                <input type="text" id="street" ref={streetInputRef} />
                {!formInputsValidity.street && <p>Please enter a valid street</p>}
            </div>
            <div className={`${styles.control} ${formInputsValidity.postal ? "" : styles.invalid}`}>
                <label htmlFor="postal">Postal code</label>
                <input type="text" id="postal" ref={postalInputRef} />
                {!formInputsValidity.postal && <p>Please enter a valid postal code (5 characters long)</p>}
            </div>
            <div className={`${styles.control} ${formInputsValidity.city ? "" : styles.invalid}`}>
                <label htmlFor="city">City</label>
                <input type="text" id="city" ref={cityInputRef} />
                {!formInputsValidity.city && <p>Please enter a valid city</p>}
            </div>
            <div className={styles.action}>
                <button type="button" onClick={props.onCancel}>Cancel</button> {/* type button will not submit the form */}
                <button>Confirm</button>
            </div>
        </form>
    )
}