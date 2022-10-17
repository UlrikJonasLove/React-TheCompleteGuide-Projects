import { Chart } from "../Chart/Chart"

export const ExpensesChart = props => {
    // Every datapoint is an object
    const ChartDataPoints = [
        {label: "Jan", value: 0},
        {label: "Feb", value: 0},
        {label: "Mar", value: 0},
        {label: "Apr", value: 0},
        {label: "May", value: 0},
        {label: "Jun", value: 0},
        {label: "Jul", value: 0},
        {label: "Aug", value: 0},
        {label: "Sept", value: 0},
        {label: "Oct", value: 0},
        {label: "Nov", value: 0},
        {label: "Dec", value: 0}
    ];

    //for of returns an array, for in returns an object
    for(const expense of props.expenses) {
        const expenseMonth = expense.date.getMonth(); // starting at 0 => january => 0
        ChartDataPoints[expenseMonth].value += expense.amount;
    }
    // this component returns a Chart component
    // the Chart component is responsible for rendering the chart
    // it takes an array of data points
    return <Chart dataPoints={ChartDataPoints} />
}