import mealsImage from '../../assets/meals.jpg'
import styles from './Header.module.css'
import { HeaderCartButton } from './HeaderCartButton'

export const Header = props => {
    return <>
        <header className={styles.header}>
            <h1>ReactMeals</h1>
            <HeaderCartButton onClick={props.onShowCart}/>
        </header>
        <div className={styles['main-image']}> {/* When css class has a - in the name, we cant use the . notation */}
            <img src={mealsImage} alt="A table full of food" />
        </div>
    </>
}