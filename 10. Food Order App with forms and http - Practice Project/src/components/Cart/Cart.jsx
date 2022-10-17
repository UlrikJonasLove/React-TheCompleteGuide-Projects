import styles from './Cart.module.css';
import { Modal } from '../UI/Modal';
import { useContext, useState } from 'react';
import CartContext from '../../store/cart-context'
import CartItem from './CartItem';
import { Checkout } from './Checkout';

export const Cart = props => {
    const [isCheckout, setIsCheckout] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [didSubmit, setDidSubmit] = useState(false);

    const cartCtx = useContext(CartContext)
    const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
    const hasItems = cartCtx.items.length > 0;

    const cartItemRemoveHandler = id => {
        cartCtx.removeItem(id);
    }
    const cartItemAddHandler = item => {
        cartCtx.addItem(item);
    }

    const orderHandler = () => {
        setIsCheckout(true);
    }

    const submitHandler = async(userData) => { // the userData is the data from the form, name, street, city and postal via props from Checkout
        setIsSubmitting(true);
        await fetch('https://react-http-9fa33-default-rtdb.europe-west1.firebasedatabase.app/orders.json', {
            method: 'POST',
            body: JSON.stringify({
                user: userData, // userData contains the name and address, is stored here
                orderedItems: cartCtx.items, // getting all the items from the context, and send it to the database
            }),
        });

        setIsSubmitting(false); // setIsSumbitting = false means that we no longer submitting the order
        setDidSubmit(true); // setDidSubmit is true, which means that it has been submitted
        cartCtx.clearCart(); // clearCart clears the cart and set items to []
    }

    const cartItems = <ul className={styles['cart-items']}>
        {cartCtx.items.map((item, index) => <CartItem key={item.id} 
        name={item.name} amount={item.amount} 
        price={item.price} onRemove={cartItemRemoveHandler.bind(null, item.id)} // this ensures the id to be added is passed to the remove handler
        onAdd={cartItemAddHandler.bind(null, item)} />)}</ul>

        const modalActions = <div className={styles.actions}>
        <button className={styles['button--alt']} onClick={props.onClose}>
            Close
        </button>
        {hasItems && <button className={styles.button} onClick={orderHandler}>Order</button>}
    </div>

    const cartModalContent = <>
        {cartItems}
        <div className={styles.total}>
            <span>Total Amount</span>
            <span>{totalAmount}</span>
        </div>
        {isCheckout && <Checkout onConfirm={submitHandler} onCancel={props.onClose}/>}
        {!isCheckout && modalActions}
    </>

    const isSubmittingModalContent = <p>Sending order data...</p>
    const didSubmitModalContent = <>
        <p>Successfully sent the order</p>
        <button className={styles.button} onClick={props.onClose}>
            Close
        </button>
    </>
    return(
        <Modal onClose={props.onClose}>
            {!isSubmitting && !didSubmit && cartModalContent}
            {isSubmitting && isSubmittingModalContent}
            {didSubmit && didSubmitModalContent}
        </Modal>
    )
}