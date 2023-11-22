import './App.css';
import SignUp from './pages/signup/SignUp';
import Login from './pages/login/Login';
import Home from './pages/home/Home';
import Profile from "./pages/profile/Profile";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import { useState } from 'react';

function App() {
  let initialState = localStorage.getItem("profileComplete");
  const [isProfileComplete, setIsProfileComplete] = useState(initialState?JSON.parse(initialState):false);
  console.log(initialState, isProfileComplete);
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home isProfileComplete={isProfileComplete}/>}/>
        <Route path="/signup" element={<SignUp/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/profile" element={<Profile setIsProfileComplete={setIsProfileComplete}/>}/>
      </Routes>
    </Router>
  );
}

export default App;
