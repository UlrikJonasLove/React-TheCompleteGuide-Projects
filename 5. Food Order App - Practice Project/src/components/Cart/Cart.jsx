import styles from './Cart.module.css';
import { Modal } from '../UI/Modal';

export const Cart = props => {
    const cartItems = <ul className={styles['cart-items']}>{[{id: 'c1', name: 'sushi', amount: 2, price: 12.99}
    ].map(item => <li>{item.name}</li>)}</ul>
    return(
        <Modal onClose={props.onClose}>
            {cartItems}
            <div className={styles.total}>
                <span>Total Amount</span>
                <span>35.62</span>
            </div>
            <div className={styles.actions}>
                <button classname={styles['button--alt']} onClick={props.onClose}>
                    Close
                </button>
                <button classname={styles.button}>Order</button>
            </div>
        </Modal>
    )
}