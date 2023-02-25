import React, { useContext } from 'react';

import Login from './components/Login/Login';
import Home from './components/Home/Home';
import MainHeader from './components/MainHeader/MainHeader';
import AuthContext from './store/auth-context';

function App() {
  const context = useContext(AuthContext);

    return (
        // <AuthContext.Provider value={{
        //   isLoggedIn: isLoggedIn,
        //   onLogout: logoutHandler  // mengisi isLoggedIn dengan state kita
        // }}>
      
        // </AuthContext.Provider>
        <React.Fragment>
          <MainHeader />
            <main>
              {!context.isLoggedIn && <Login onLogin={context.onLogin} />}
              {context.isLoggedIn && <Home onLogout={context.onLogout} />}
            </main>
        </React.Fragment>
    );
}

export default App;
