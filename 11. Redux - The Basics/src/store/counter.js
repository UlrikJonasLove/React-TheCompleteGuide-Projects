import { createSlice } from "@reduxjs/toolkit";

// also working with diffrent states and data
// never change the existing state, always overwrite
const initialCounterState = { counter: 0, showCounter: true }

// this replaces all of the counterReducer function below, no longer need to use the if statement
// the methods will run when needed
const counterSlice = createSlice({
    name: 'counter', // first name
    initialState: initialCounterState, // second initial state
    reducers: { // third reducers
        // every method will recieve the latest state
        increment(state) {
            state.counter++; // here we can mutate the state, it will automatically clone the state and create a new state. so we dont need to copy it manually
        },
        decrement(state) {
            state.counter--;
        },
        increase(state, action) {
            state.counter = state.counter + action.payload; // get the value from the action payload
        },
        toggleCounter(state) {
            state.showCounter = !state.showCounter; // this will invert the value of the state
        },
        
    } 
}) //is a function from redux-toolkit that creates a slice of the store

// we dont need to worry about action types anymore, redux-toolkit will take care of that
export const counterActions = counterSlice.actions; // this will give us access to the actions
export default counterSlice.reducer; // this will give us access to the reducer

// this is the old way of doing it
// const counterReducer = (state = initialState, action) => {
//     if(action.type === 'increment') {
//         return {
//             // coping the existing state and overwriting the values we want to change
//             counter: state.counter + 1,
//             showCounter: state.showCounter,
//         };
//     }

//     if(action.type === 'increase') {
//         return {
//             counter: state.counter + action.value, // get the value from the action payload
//             showCounter: state.showCounter,
//         };
//     }

//     if(action.type === 'decrement') {
//         return {
//             counter: state.counter - 1,
//             showCounter: state.showCounter,
//         };
//     }

//     if(action.type === 'toggle') {
//         return {
//             showCounter: !state.showCounter, // this will invert the value
//             counter: state.counter,
//         };
//     }
//     return state;
// }

// const store = createStore(counterReducer);  this creates a redux store