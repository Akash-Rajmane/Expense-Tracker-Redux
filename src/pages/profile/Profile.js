import React, {useRef, useEffect, useState} from 'react';
import classes from "./Profile.module.css";
import { useNavigate } from 'react-router-dom';
import {useSelector} from "react-redux";

const Profile = ({setIsProfileComplete,isProfileComplete}) => {  
    const theme = useSelector(state=>state.theme.theme);
    const navigate = useNavigate();
    const [isEmailVerified, setIsEmailVerified] = useState(true);
    const nameRef = useRef();
    const photoRef = useRef();

    const redirectHandler = () => {
        navigate("/");
    }

    const fetchUserData = async () => {
      let user = JSON.parse(localStorage.getItem("user"));
      let idToken = user.token;
      try{
        const response = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${process.env.REACT_APP_KEY}`,{
          method: "POST",
          body: JSON.stringify(
            {idToken}
            ),
          headers: {
            "Content-Type":"application/json"
          }
        });
        let result;
        if(response.ok){
          result = await response.json();
          console.log(result);
          nameRef.current.value = result.users[0].displayName;
          photoRef.current.value = result.users[0].photoUrl;
          setIsEmailVerified(result.users[0].emailVerified);
        }else{
          result = await response.json();
          throw new Error(result.error.message);
        }
      }catch(err){
        console.log(err);
      }
     
    }
    
    useEffect(()=>{
      if(isProfileComplete){
        fetchUserData();
      }
    },[isProfileComplete,]);

    const submitHandler = (e) => {
        e.preventDefault();
        let displayName = nameRef.current.value;
        let photoUrl = photoRef.current.value;
        let user = JSON.parse(localStorage.getItem("user"));
        let token = user.token;
        fetch(`https://identitytoolkit.googleapis.com/v1/accounts:update?key=${process.env.REACT_APP_KEY}`,
        {
            method: "POST",
            body: JSON.stringify({
                idToken: token,
                displayName,
                photoUrl,
                returnSecureToken: true
            }),
            headers: {
                "Content-Type":"application/json"
            }
        }).then(res=>{
            if(res.ok){
              nameRef.current.value = "";
              photoRef.current.value = "";
              setIsProfileComplete(true);
              localStorage.setItem("profileComplete",true);
              navigate("/");
              return res.json().then(data=>console.log(data));
            }else{
                return res.json()
                        .then((data)=>{
                            alert(data.error.message);
                        })
            }
        })
      
    }

    const verifyEmailHandler = async () => {
      let user = JSON.parse(localStorage.getItem("user"));
      let token = user.token;
      try{
        const response = fetch(`https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${process.env.REACT_APP_KEY}`,{
          method: "POST",
          body: JSON.stringify({
            requestType: "VERIFY_EMAIL", 
            idToken: token
          }),
          headers: {
            "Content-Type": "application/json"
          }
        })

        
        console.log(response);
        alert("Email is sent to your registered mail id");
        
      }catch(err){
        console.log(err);
      }
    }

  return (
    <>
      <form className={`${theme==="dark"? classes.formDark : classes.form }`} onSubmit={submitHandler}>
          <h1 className={`${theme==="dark"? classes.formHeadingDark : classes.formHeading}`}>Update Profile</h1>
          <div className={classes.control}>
            <label htmlFor='name' className={`${theme==="dark"? classes.labelDark : classes.label}`}>Full Name</label>
            <input type='text' id='name' required ref={nameRef} className={`${theme==="dark"? classes.inputDark : classes.input}`}/>
          </div>
          <div className={classes.control}>
            <label htmlFor='photo' className={`${theme==="dark"? classes.labelDark : classes.label}`}>Profile Photo URL</label>
            <input type='text' id='photo' required ref={photoRef} className={`${theme==="dark"? classes.inputDark : classes.input}`}/>
          </div>
          <div className={classes.actions}>
              <button type="submit" className={`${theme==="dark"? classes.updateBtnDark : classes.updateBtn}`} onClick={submitHandler}>Update</button>
              <button type="button" className={`${theme==="dark"? classes.cancelBtnDark : classes.cancelBtn}`} onClick={redirectHandler}>Cancel</button>
          </div>
      </form>
      {!isEmailVerified && <button className={`${theme==="dark"? classes.verifyBtnDark : classes.verifyBtn}`} onClick={verifyEmailHandler}>
        Verify Email
      </button>}
    </>
  )
}

export default Profile;