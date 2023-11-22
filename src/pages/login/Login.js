import React from 'react'
import LoginForm from '../../components/login-form/LoginForm';
import classes from "./Login.module.css";
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();

    const redirectHandler = () => {
      navigate("/signup");
    }

  return (
    <div className={classes.container}>
        <LoginForm/>
        <button className={classes.btn} onClick={redirectHandler}>Don't have an account? Sign up</button>
    </div>
  )
}

export default Login;