import { createSlice } from "@reduxjs/toolkit";


const cartSlice = createSlice({
    name: "cart",
    initialState: { 
        items: [], 
        totalQuantity: 0, 
        changed: false },
    reducers: {
        // reducers must be pure, side-effect free, syncronous functions
        addItemToCart(state, actions) {
            const newItem = actions.payload; // the payload is the item we want to add to the cart
            const existingItem = state.items.find(item => item.id === newItem.id); // find the item in the cart that matches the id of the item we want to add
            state.totalQuantity++; // increment the total quantity of items in the cart
            state.changed = true; // set the changed flag to true
            if (!existingItem) { // if the item doesn't exist in the cart
                state.items.push({ // push the item to the cart
                    id: newItem.id, // set the id of the item
                    price: newItem.price, // set the price of the item
                    title: newItem.title, // set the title of the item
                    quantity: 1, // set the quantity of the item to 1
                    totalPrice: newItem.totalPrice // set the total price of the item
                })
            } else {
                existingItem.quantity++; // increment the quantity of the item
                existingItem.totalPrice = existingItem.totalPrice + newItem.price; // increment the total price of the item
            }
        },
        removeItemFromCart(state, actions) {
            const id = actions.payload; // the id of the item to remove, payload is the data that is passed to the action
            const existingItem = state.items.find(item => item.id === id); // find the item to remove
            state.totalQuantity--; // decrement the total quantity
            state.changed = true; // set the changed flag to true
            if (existingItem.quantity === 1) { // if the quantity of the item to remove is 1
                state.items = state.items.filter(item => item.id !== id); // filter out the item to remove
            } else {
                existingItem.quantity--; // decrement the quantity of the item to remove
                existingItem.totalPrice = existingItem.totalPrice - existingItem.price; // decrement the total price of the item to remove
            }
        }
    } 
});

export const cartActions = cartSlice.actions;
export default cartSlice;