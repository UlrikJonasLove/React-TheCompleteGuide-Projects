import { useContext, useEffect, useState } from 'react'
import styles from './HeaderCartButton.module.css'
import { CartIcon } from '../Cart/CartIcon'
import CartContext from '../../store/cart-context'

export const HeaderCartButton = props => {
    const [btnHighlight, setBtnHighlight] = useState(false);
    const cartCtx = useContext(CartContext);
    const numberOfCartItems = cartCtx.items.reduce((curNumber, item) => {
        return curNumber + item.amount;
    }, 0) //reduce an array of data into a single value(number in this case)

    const btnClasses = `${styles.button} ${btnHighlight ? styles.bump : ""}`;
    useEffect(() => {
        if(cartCtx.items.length === 0){
            return;
        }
        setBtnHighlight(true);

        const timer = setTimeout(() => {
            setBtnHighlight(false);
        }, 300);

        //clean up function
        return () => {
            clearTimeout(timer);
        }

    }, [cartCtx.items])

    return <button className={btnClasses} onClick={props.onClick}>
        <span className={styles.icon}>
            <CartIcon />
        </span>
        <span>Your Cart</span>
        <span className={styles.badge}>{numberOfCartItems}</span>
    </button>
}