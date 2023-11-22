import React from 'react';
import classes from "./Home.module.css";
import {Link} from "react-router-dom";

const Home = ({isProfileComplete}) => {
  return (
    <div>
      <div className={classes.header}>
        <h1>Welcome to Expense Tracker</h1>
        {!isProfileComplete &&<span className={classes.link}>Your profile is incomplete. <Link to="/profile">Complete Now</Link></span>}
      </div>
    </div>
  )
}

export default Home;