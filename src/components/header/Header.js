import React, { useState } from 'react';
import classes from "./Header.module.css";
import {Link, useNavigate, NavLink} from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import {logout} from "../../store/authSlice";
import { toggleTheme } from '../../store/themeSlice';
import Switch from "react-switch";
import DownloadBtn from '../download-btn/DownloadBtn';

const Header = ({isProfileComplete}) => {
    const theme = useSelector(state=>state.theme.theme);
    const expenses = useSelector(state=>state.expense.expenses);
    const navigate = useNavigate();
    const isLoggedIn = useSelector(state=>state.auth.isLoggedIn);
    const dispatch = useDispatch();
    let initialPremium = localStorage.getItem("isPremium");
    const [isPremium,setIsPremium] = useState(initialPremium?JSON.parse(initialPremium):false);
    const [checked, setChecked] = useState(false);

    const logoutHandler = () => {
        dispatch(logout());
        navigate("/login");
    }

    const totalAmount = expenses.reduce((total,curr)=>total+=Number(curr.amount),0);

    const activatePremiumHandler = () => {
      if(isPremium){
        alert("You are already a premium member");
        return;
      }
      setIsPremium(true);
      setChecked(true);
      localStorage.setItem("isPremium",true);
      dispatch(toggleTheme());
    }

    const toggleThemeHandler = () => {
      setChecked(prev=>!prev);
      dispatch(toggleTheme());
    }

  return (
    <header className={`${theme==="dark"? classes.headerDark : classes.header}`}>
        <h1>Expense Tracker</h1>
        <nav className={classes.navigation}>
          { isLoggedIn && <NavLink to="/" className={({isActive})=>isActive ? `${classes.active}` : `${classes.inactive}`}>Home</NavLink>}
          { isProfileComplete && isLoggedIn && <NavLink to="/profile" className={({isActive})=>isActive ? `${classes.active}` : `${classes.inactive}`}>Profile</NavLink>}
          { !isProfileComplete && isLoggedIn && <span className={classes.link}>Your profile is incomplete. <Link to="/profile">Complete Now</Link></span>}
          { isLoggedIn && isPremium && 
              <Switch 
                onChange={toggleThemeHandler}
                checked={checked}
                onHandleColor={"#09051f"}
                onColor={"#6c55f0"}
              /> 
          }
          { isLoggedIn && (totalAmount>10000) && <button className={classes.premiumBtn} onClick={activatePremiumHandler} >Activate Premium</button>}
          { isLoggedIn && isPremium && <DownloadBtn/>}
          { isLoggedIn && <button className={classes.logoutBtn} onClick={logoutHandler}>Logout</button>}
        </nav>
    </header>
  )
}

export default Header;