import React, { useState, useEffect } from 'react';

const AuthContext = React.createContext({
    //adding context state initial values, also functions
    isLoggedIn: false,
    onLogout: () => {},
    onLogin: (email, password) => {}
});

export const AuthContextProvider = (props) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    useEffect(() => {
        // function runs only once unless dependency change
        const userLoggedIn = localStorage.getItem('isLoggedIn');
    
        // if this if statement was not in a useEffect, it would have caused a infinite loop
        if (userLoggedIn === '1') {
          setIsLoggedIn(true);
        }
      }, []); // updates only if dependencies change, also only runs once when adding a empty array

    const logoutHandler = () => {
        localStorage.removeItem('isLoggedIn')
        setIsLoggedIn(false);
    }
    const loginHandler = () => {
        localStorage.setItem('isLoggedIn', '1')
        setIsLoggedIn(true);
    }
                                //the contexts values/states, so we can use them in other components
    return <AuthContext.Provider value={{isLoggedIn: isLoggedIn, onLogout: logoutHandler, onLogin: loginHandler}}>{props.children}</AuthContext.Provider>
}

export default AuthContext;