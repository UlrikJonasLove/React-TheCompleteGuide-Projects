import "./Chart.css";
import { ChartBar } from "./ChartBar";

export const Chart = props => {
  // this dataPointsValues is an array of objects
  // each object has a key and a value
  // the key is the name of the expense
  // the value is the amount of the expense
    const dataPointsValues = props.dataPoints.map(dataPoint => dataPoint.value);
    const totalMaximum = Math.max(...dataPointsValues);

  return (
    <div className="chart">
      {props.dataPoints.map((dataPoint) => (
        <ChartBar
          key={dataPoint.label}
          value={dataPoint.value}
          maxValue={totalMaximum}
          label={dataPoint.label}
        />
      ))}
    </div>
  );
};
