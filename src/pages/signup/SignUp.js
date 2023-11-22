import React from 'react';
import SignUpForm from '../../components/signup-form/SignUpForm';
import classes from "./SignUp.module.css";
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const navigate = useNavigate();

  const redirectHandler = () => {
    navigate("/login");
  }

  return (
    <div className={classes.container}>
        <SignUpForm/>
        <button className={classes.btn} onClick={redirectHandler}>Have an account? Login</button>
    </div>
  )
}

export default SignUp;