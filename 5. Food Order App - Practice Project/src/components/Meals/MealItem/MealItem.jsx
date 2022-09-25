import { useContext } from 'react'
import CartContext from '../../../store/cart-context'
import styles from './MealItem.module.css'
import { MealItemForm } from './MealItemForm'

export const MealItem = props => {
    const cartCtx = useContext(CartContext);
    const price = `$${props.price.toFixed(2)}`
    const addToCartHandler = amount => {
        //in this context, we expect the item that we forward into the useReducer in the CartProvider.jsx
        cartCtx.addItem({
            id: props.id,
            name: props.name,
            amount: amount,
            price: props.price
        });
    }

    return (
        <li className={styles.meal}>
            <div>
                <h3>{props.title}</h3>
                <div className={styles.description}>{props.description}</div>
                <div className={styles.price}>{price}</div>
            </div>
            <div>
                <MealItemForm onAddToCart={addToCartHandler} />
            </div>
        </li>
    )
}