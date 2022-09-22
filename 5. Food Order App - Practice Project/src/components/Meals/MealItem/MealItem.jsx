import styles from './MealItem.module.css'
import { MealItemForm } from './MealItemForm'

export const MealItem = props => {
    const price = `$${props.price.toFixed(2)}`
    return (
        <li className={styles.meal}>
            <div>
                <h3>{props.title}</h3>
                <div classname={styles.description}>{props.description}</div>
                <div classname={styles.price}>{price}</div>
            </div>
            <div>
                <MealItemForm id={props.id}/>
            </div>
        </li>
    )
}