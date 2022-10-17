// import { createStore } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './counter';
import authReducer from './auth';

const store = configureStore({
    reducer: {counter: counterReducer, auth: authReducer} // this is the new way of doing it, we pass the reducers from the counter slice
}); // this creates a redux store

export default store; // export store