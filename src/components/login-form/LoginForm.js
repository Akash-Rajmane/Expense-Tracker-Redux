import React, {useRef, useState} from 'react';
import classes from "./LoginForm.module.css";
import showImage from "../../assets/show.png";
import hideImage from "../../assets/hide.png";
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
    const navigate = useNavigate();
    const emailRef = useRef();
    const passwordRef = useRef();
    const [showPassword, setShowPassword] = useState(false);
    
    const submitHandler = (e) => {
        e.preventDefault();
        let email = emailRef.current.value;
        let password = passwordRef.current.value;
        
        fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.REACT_APP_KEY}`,
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
              return res.json().then(data=>{
                emailRef.current.value = "";
                passwordRef.current.value = "";
                localStorage.setItem("token",JSON.stringify(data.idToken));
                navigate("/");
              })
            }else{
                return res.json()
                        .then((data)=>{
                            alert(data.error.message);
                        })
            }
        })
      
    } 
    
    const resetPasswordHandler = async () => {
      let email = emailRef.current.value;
      if(email==="" || !email.includes("@") || !email.includes(".com")){
        alert("Please enter valid email address");
        return;
      }
      try{
        const response = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${process.env.REACT_APP_KEY}`,
        {
          method: "POST",
          body: JSON.stringify({
              email,
              requestType: "PASSWORD_RESET"
          }),
          headers: {
              "Content-Type":"application/json"
          }
        });
        let result;
        if(response.ok){
          result = await response.json();
          console.log(result);
          alert("Link to reset your password is sent to your mail");
        }else{
          result = await response.json();
          throw new Error(result.error.message);
        }
      }catch(err){
        console.log(err);
      }
    } 

    return (
    <form onSubmit={submitHandler} className={classes.form}>
        <h1>Login</h1>
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input type='email' id='email' required ref={emailRef}/>
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
          <button type="submit" >Login</button>
        </div>
        <div className={classes.actions}>
            <span className={classes.text} onClick={resetPasswordHandler}>Forgot Password</span>
        </div>
        
    </form>
  )
}

export default LoginForm;