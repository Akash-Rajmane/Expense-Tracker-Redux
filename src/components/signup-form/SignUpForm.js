import React, {useRef, useState} from 'react';
import classes from "./SignUpForm.module.css";
import showImage from "../../assets/show.png";
import hideImage from "../../assets/hide.png";

const SignUpForm = () => {
    const emailRef = useRef();
    const confirmEmailRef = useRef();
    const passwordRef = useRef();
    const [showPassword, setShowPassword] = useState(false);
    
    const submitHandler = (e) => {
        e.preventDefault();
        let email = emailRef.current.value;
        let confirmEmail = confirmEmailRef.current.value;
        let password = passwordRef.current.value;
        if(email!==confirmEmail){
            alert("Emails don't match, enter again");
            return;
        }
        
        fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.REACT_APP_KEY}`,
        {
            method: "POST",
            body: JSON.stringify({
                email,
                password,
                returnSecureToken: true
            }),
            headers: {
                "Content-Type":"application/json"
            }
        }).then(res=>{
            if(res.ok){
              console.log(res);
              alert("Signed up successfuly");
            }else{
                return res.json()
                        .then((data)=>{
                            alert(data.error.message);
                        })
            }
        })
        emailRef.current.value = "";
        confirmEmailRef.current.value = "";
        passwordRef.current.value = "";

    }  

    return (
    <form onSubmit={submitHandler} className={classes.form}>
        <h1>Sign Up</h1>
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input type='email' id='email' required ref={emailRef}/>
        </div>
        <div className={classes.control}>
          <label htmlFor='confirmEmail'>Confirm Email</label>
          <input type='email' id='confirmEmail' required ref={confirmEmailRef}/>
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input
            type={showPassword?'text':'password'}
            id='password'
            required
            ref={passwordRef}
            minLength={7}
          />
          <img src={showPassword?showImage:hideImage} alt={"eye"} onClick={()=>setShowPassword(prev=>!prev)} className={classes.img}/>
        </div>
        <div className={classes.actions}>
          <button type="submit" >Sign Up</button>
        </div>
    </form>
  )
}

export default SignUpForm;