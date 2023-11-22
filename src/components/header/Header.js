import React from 'react';
import classes from "./Header.module.css";
import {Link, useNavigate} from "react-router-dom";

const Header = ({isProfileComplete}) => {
    const navigate = useNavigate();

    const logoutHandler = () => {
        localStorage.removeItem("token");
        navigate("/login");
    }

    const token = localStorage.getItem("token");

  return (
    <header className={classes.header}>
        <h1>Expense Tracker</h1>
        
        {!isProfileComplete && token && <span className={classes.link}>Your profile is incomplete. <Link to="/profile">Complete Now</Link></span>}
        { token && <button className={classes.logoutBtn} onClick={logoutHandler}>Logout</button>}
    </header>
  )
}

export default Header;