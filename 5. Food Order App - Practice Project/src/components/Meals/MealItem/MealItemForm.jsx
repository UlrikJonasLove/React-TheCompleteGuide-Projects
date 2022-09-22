import styles from './MealItemForm.module.css';
import { Input
 } from '../../UI/Input';
export const MealItemForm = props => {
    return(
        <form className={styles.form}>
            <Input label="Amount" input={{
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
        </form>
    )
}