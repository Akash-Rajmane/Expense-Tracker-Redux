import React from 'react';
import SignUpForm from '../../components/signup-form/SignUpForm';
import classes from "./SignUp.module.css";

const SignUp = () => {
  return (
    <>
        <SignUpForm/>
        <button className={classes.btn}>Have an account? Login</button>
    </>
  )
}

export default SignUp;