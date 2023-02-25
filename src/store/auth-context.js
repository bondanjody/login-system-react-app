import React, {useState, useEffect} from "react";


const AuthContext = React.createContext({
    // Ini adalah data default
    isLoggedIn: false,
    onLogout: () => {},
    onLogin: (email, password) => {}
});

export const AuthContextProvider = props => {

    const [isLoggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        const storedLoggedInData = localStorage.getItem('isLoggedIn');
        if (storedLoggedInData === '1') {
          setLoggedIn(true);
        }
      }, []);

    const logoutHandler = () => {
        localStorage.removeItem('isLoggedIn');
        setLoggedIn(false);
    }

    const loginHandler = () => {
        localStorage.setItem('isLoggedIn', '1')
        setLoggedIn(true);
    }

    return (<AuthContext.Provider value={{
        isLoggedIn: isLoggedIn,
        onLogout: logoutHandler,
        onLogin: loginHandler
    }}>
        {props.children}
        </AuthContext.Provider>
    );
}

export default AuthContext;