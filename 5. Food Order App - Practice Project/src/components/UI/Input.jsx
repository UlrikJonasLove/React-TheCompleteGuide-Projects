import styles from './Input.module.css';

export const Input = props => {
    return (
        <div className={styles.input}>
            {/*htmlFor (instead of for) is a reserved keyword in react, as className(instead of class) is */}
            <label htmlFor={props.input.id}>{props.label}</label>

            {/* this {...props.input} assures all the key-value pairs 
            in the input object which we recieve on props.input are added as props to input*/}
            <input {...props.input} /> 
        </div>
    )
}