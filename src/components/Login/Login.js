import React, { useEffect, useState, useReducer, useContext } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
import AuthContext from '../../store/auth-context';
import Input from '../UI/Input/Input';


const emailReducer = (state, action) => {
  // argumen state : menangkap latest snapshot dari state
  // argumen action : adalah parameter yang kita masukkan ketika kita memanggil function ini
  if (action.type === 'USER_INPUT') {
    return {
      value: action.val,
      isValid: action.val.includes('@')
    }
  }
  
  if (action.type === 'INPUT_BLUR') {
    return {
      value: state.value,
      isValid: state.value.includes('@')
    }
  }
  return {
    value: '',
    isValid: false
  }
};

const passwordReducer = (state, action) => {
  if (action.type === 'USER_INPUT') {
    return {
      value: action.val,
      isValid: action.val.trim() > 6
    };
  }
  
  if (action.type === 'INPUT_BLUR') {
    return {
      value: state.value,
      isValid: state.value.trim() > 6
    };
  }
  return {
    value: '',
    isValid: false
  }
}


const Login = (props) => {
  // const [enteredEmail, setEnteredEmail] = useState('');
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState('');
  // const [passwordIsValid, setPasswordIsValid] = useState();

  const authContext = useContext(AuthContext);

  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState, dispatchEmail] = useReducer(emailReducer, {value: '', isValid: null});
  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {value: '', isValid: null});

  // Melakukan destructuring serta alias 
  const { isValid: emailIsValid } = emailState;
  const {isValid: passwordIsValid } = passwordState;

   // Menggunakan useEffect
   useEffect(() => {
    const identifier = setTimeout(() => {
      console.log('Checking validity!');
      setFormIsValid(
        emailIsValid && passwordIsValid
    );}, 500);

    return () => {
      clearTimeout(identifier);
    }
  }, [emailIsValid, passwordIsValid]);

  const emailChangeHandler = (event) => {
    dispatchEmail({type: 'USER_INPUT', val: event.target.value});

    setFormIsValid(
      event.target.value.includes('@') && passwordState.isValid
    );
  };

  const passwordChangeHandler = (event) => {
    dispatchPassword({type: 'USER_INPUT', val: event.target.value});

    setFormIsValid(
      emailState.isValid && event.target.value.trim().length > 6
    );
  };

  const validateEmailHandler = () => {
    dispatchEmail({type: 'INPUT_BLUR'})
  };

  const validatePasswordHandler = () => {
    dispatchPassword({type: 'INPUT_BLUR'});
  };

  const submitHandler = (event) => {
    event.preventDefault();
    authContext.onLogin(emailState.value, passwordState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        
        <Input 
        id="email" 
        label="E-Mail" 
        type="email" 
        value={emailState.value}
        isValid={emailIsValid} 
        onChange={emailChangeHandler} 
        onBlur={validateEmailHandler} 
        />
        <div className={classes.actions}>
        <Input 
        id="password" 
        label="Password" 
        type="password" 
        value={passwordState.value}
        isValid={passwordIsValid} 
        onChange={passwordChangeHandler} 
        onBlur={validatePasswordHandler} 
        />
        {/* <div
          className={`${classes.control} ${
            passwordState.value === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={passwordState.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div> */}
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
