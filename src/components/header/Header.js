import React from 'react';
import classes from "./Header.module.css";
import {Link, useNavigate, NavLink} from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import {logout} from "../../store/authSlice";

const Header = ({isProfileComplete}) => {
    const expenses = useSelector(state=>state.expense.expenses);
    const navigate = useNavigate();
    const isLoggedIn = useSelector(state=>state.auth.isLoggedIn);
    const dispatch = useDispatch();

    const logoutHandler = () => {
        dispatch(logout());
        navigate("/login");
    }

    const totalAmount = expenses.reduce((total,curr)=>total+=Number(curr.amount),0);


  return (
    <header className={classes.header}>
        <h1>Expense Tracker</h1>
        <nav className={classes.navigation}>
          { isLoggedIn && <NavLink to="/" className={({isActive})=>isActive ? `${classes.active}` : `${classes.inactive}`}>Home</NavLink>}
          { isProfileComplete && isLoggedIn && <NavLink to="/profile" className={({isActive})=>isActive ? `${classes.active}` : `${classes.inactive}`}>Profile</NavLink>}
          { !isProfileComplete && isLoggedIn && <span className={classes.link}>Your profile is incomplete. <Link to="/profile">Complete Now</Link></span>}
          { isLoggedIn && (totalAmount>10000) && <button className={classes.premiumBtn}>Activate Premium</button>}
          { isLoggedIn && <button className={classes.logoutBtn} onClick={logoutHandler}>Logout</button>}
        </nav>
    </header>
  )
}

export default Header;