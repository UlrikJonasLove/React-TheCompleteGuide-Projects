import { useState } from 'react';
import { AddUser } from './components/Users/AddUser';
import { UsersList } from './components/Users/UsersList';


export const App = () => {
  const [usersList, setUsersList] = useState([]);
  
  // the addUserHandler uses the setUsersList function to add a new user to the list
  // and it uses the previus state to update the list
  const addUserHandler = (userName, userAge) => {
    setUsersList(prevUsersList => {
      return [...prevUsersList, { name: userName, age: userAge, id: Math.random().toString() }];
    });
  };

  return (
    <>
      <AddUser onAddUser={addUserHandler} />
      <UsersList users={usersList} />
    </>
  );
};