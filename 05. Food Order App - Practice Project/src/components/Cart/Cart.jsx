import styles from './Cart.module.css';
import { Modal } from '../UI/Modal';
import { useContext } from 'react';
import CartContext from '../../store/cart-context'
import CartItem from './CartItem';

export const Cart = props => {
    const cartCtx = useContext(CartContext)
    const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
    const hasItems = cartCtx.items.length > 0;

    const cartItemRemoveHandler = id => {
        cartCtx.removeItem(id);
    }
    const cartItemAddHandler = item => {
        cartCtx.addItem(item);
    }
    const cartItems = <ul className={styles['cart-items']}>
        {cartCtx.items.map((item, index) => <CartItem key={item.id} 
        name={item.name} amount={item.amount} 
        price={item.price} onRemove={cartItemRemoveHandler.bind(null, item.id)} // this ensures the id to be added is passed to the remove handler
        onAdd={cartItemAddHandler.bind(null, item)} />)}</ul>


    return(
        <Modal onClose={props.onClose}>
            {cartItems}
            <div className={styles.total}>
                <span>Total Amount</span>
                <span>{totalAmount}</span>
            </div>
            <div className={styles.actions}>
                <button className={styles['button--alt']} onClick={props.onClose}>
                    Close
                </button>
                {hasItems && <button className={styles.button}>Order</button>}
            </div>
        </Modal>
    )
}