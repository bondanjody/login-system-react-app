import React, { useState, useEffect } from 'react';

import Login from './components/Login/Login';
import Home from './components/Home/Home';
import MainHeader from './components/MainHeader/MainHeader';
import AuthContext from './store/auth-context';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {

    const storedLoggedInData = localStorage.getItem('isLoggedIn');

    if (storedLoggedInData === '1') {
      setIsLoggedIn(true);
    }
  }, []);

  const loginHandler = (email, password) => {
    // Set localStorage 
    localStorage.setItem('isLoggedIn', '1');
    // We should of course check email and password
    // But it's just a dummy/ demo anyways
    setIsLoggedIn(true);
  };

  const logoutHandler = () => {
    // Menghapus data loggedin user yang disimpan di localstorage
    localStorage.removeItem('isLoggedIn');
    setIsLoggedIn(false);
  };

  return (
      <AuthContext.Provider value={{
        isLoggedIn: isLoggedIn   // mengisi isLoggedIn dengan state kita
      }}>
        <MainHeader onLogout={logoutHandler} />
        <main>
          {!isLoggedIn && <Login onLogin={loginHandler} />}
          {isLoggedIn && <Home onLogout={logoutHandler} />}
        </main>
      </AuthContext.Provider>
  );
}

export default App;
