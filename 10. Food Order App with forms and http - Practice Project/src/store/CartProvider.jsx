import { useReducer } from "react";
import CartContext from "./cart-context";

const defaultCartState = {
    items: [],
    totalAmount: 0
}
// add useReducer outside main component
// useReducer wont need any data from the component
const cartReducer = (state, action) => {
    if(action.type === "ADD_CART_ITEM") {
        //checking if the item id that exist in the array is the same as the item id we are adding
        const existingCartItemIndex = state.items.findIndex(item => item.id === action.item.id);

        //if item already exist, the added item will be set to the existing item
        const existingCartitem = state.items[existingCartItemIndex];

        
        let updatedItems; 

        /*Check if existing cartitem is true, then we take the existing cartitem and add the new items to the item
        and update the amount with the existing cartitems amount and the added amount to the new item added to the existing item */
        if(existingCartitem) {
            const updatedItem = {
                ...existingCartitem,
                amount: existingCartitem.amount + action.item.amount
            }
            updatedItems = [...state.items]
            updatedItems[existingCartItemIndex] = updatedItem;
        }
        else {
            /*concat adds a new item to an array, but unlike of push, 
        it returns a whole new array instead of adding to an existing array
        we wanna update our state without updating the old state snapshot*/
            updatedItems = state.items.concat(action.item)
        }
        const updatedTotalAmount = state.totalAmount + action.item.price * action.item.amount;

        //returning the new state snapshot
        return {
            items: updatedItems,
            totalAmount: updatedTotalAmount
        }
    }
    if(action.type === "REMOVE_CART_ITEM") {
        // get the existing item in the cart
        const existingCartItemIndex = state.items.findIndex(item => item.id === action.id); //remove by just id, not entire item
        const existingItem = state.items[existingCartItemIndex];
        // updating the total amount with - the existing items price, that we are removing 
        const updatedTotalAmount = state.totalAmount - existingItem.price;
        let updatedItems;

        //check if it is the last of the item in the cart
        if(existingItem === 1) {
            //remove entire item from the array
            updatedItems = state.items.filter(item => item.id !== action.id) // all item id's that are not equal to the action.id will be kept
        } else {                                                             // but the action.id will be the item that is going to be removed
            //keep item in cart, but decrease list of items from the array
            const updatedItem = {...existingItem, amount: existingItem.amount - 1};
            //this will be the a copy of the items in the state
            updatedItems = [...state.items];
            updatedItems[existingCartItemIndex] = updatedItem;
        }

        return {
            items: updatedItems,
            totalAmount: updatedTotalAmount
        }
    };

    if(action.type === "CLEAR_CART") {
        return defaultCartState;
    }; 

    return defaultCartState;
}

const CartProvider = props => {
        //[State variable, state action]
    const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCartState)

    const addItemToCartHandler = item => {
        // the object is the action in cartReducer function,
        // we also need to forward the item in order to add it to the reducer function
        // the item will be expected to the CartContext in the MealItem.jsx
        dispatchCartAction({type: 'ADD_CART_ITEM', item: item})
    }

    const removeItemFromCartHandler = id => {
        dispatchCartAction({type: 'REMOVE_CART_ITEM', id: id})
    }

    const clearCartHandler = () => { 
        dispatchCartAction({type: "CLEAR_CART"})
    }

    // adding values to the context
    const cartContext = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: addItemToCartHandler,
        removeItem: removeItemFromCartHandler,
        clearCart: clearCartHandler
    };

    return (
        <CartContext.Provider value={cartContext}>
            {props.children}
        </CartContext.Provider>
    )
}

export default CartProvider;