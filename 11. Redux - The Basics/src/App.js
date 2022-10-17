import { useSelector } from 'react-redux';
import Counter from './components/Counter';
import Header from './components/Header';
import Auth from './components/Auth';
import UserProfile from './components/UserProfile';


function App() {
  const isAuth = useSelector(state => state.auth.isAuthenticated); // useSelector needs a function that passes the state provided by redux

  return (
    <>
      <Header />
      {!isAuth  && <Auth />}
      {isAuth && <UserProfile />}
      <Counter />
    </>
    
  );
}

export default App;
