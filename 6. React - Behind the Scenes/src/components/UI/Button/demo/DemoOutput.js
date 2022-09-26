import React from "react"
const DemoOutput = (props) => {
    return <p>{props.show ? "this is new" : ""}</p>
}

// memo tells react to look for the props this component gets, and checks for the new value, and check for the previous value
// only if the value of prop change, the component should be re-evaluated
// not all components need memo
export default React.memo(DemoOutput);

// props.show === props.previous.show
// this will work because show is a boolean