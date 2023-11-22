import React, {useRef} from 'react';
import classes from "./Profile.module.css";
import { useNavigate } from 'react-router-dom';

const Profile = ({setIsProfileComplete}) => {
    const navigate = useNavigate();
    const nameRef = useRef();
    const photoRef = useRef();

    const redirectHandler = () => {
        navigate("/");
    }

    const submitHandler = (e) => {
        e.preventDefault();
        let displayName = nameRef.current.value;
        let photoURL = photoRef.current.value;
        let token = JSON.parse(localStorage.getItem("token"));
        console.log(token);
        fetch(`https://identitytoolkit.googleapis.com/v1/accounts:update?key=${process.env.REACT_APP_KEY}`,
        {
            method: "POST",
            body: JSON.stringify({
                idToken: token,
                displayName,
                photoURL,
                returnSecureToken: true
            }),
            headers: {
                "Content-Type":"application/json"
            }
        }).then(res=>{
            if(res.ok){
              console.log(res);
              nameRef.current.value = "";
              photoRef.current.value = "";
              setIsProfileComplete(true);
              localStorage.setItem("profileComplete",true);
              navigate("/");
            }else{
                return res.json()
                        .then((data)=>{
                            alert(data.error.message);
                        })
            }
        })
      
    }

  return (
    <form className={classes.form}>
        <h1>Update Profile</h1>
        <div className={classes.control}>
          <label htmlFor='name'>Full Name</label>
          <input type='text' id='name' required ref={nameRef}/>
        </div>
        <div className={classes.control}>
          <label htmlFor='photo'>Profile Photo URL</label>
          <input type='text' id='photo' required ref={photoRef}/>
        </div>
        <div className={classes.actions}>
            <button type="submit" className={classes.updateBtn} onClick={submitHandler}>Update</button>
            <button type="button" className={classes.cancelBtn} onClick={redirectHandler}>Cancel</button>
        </div>
    </form>
  )
}

export default Profile;