import './Card.css';

// this component is used to display a card
// it takes a className and a children property
// it returns a div with the className
// it was made to reuse in other components like ExpensesList and ExpensesChart
export const Card = props => {
    const classes = "card " + props.className;
    return <div className={classes}>{props.children}</div>
}