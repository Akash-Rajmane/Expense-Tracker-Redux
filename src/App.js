import './App.css';
import SignUp from './pages/signup/SignUp';
import Login from './pages/login/Login';
import Home from './pages/home/Home';
import Profile from "./pages/profile/Profile";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import { useState } from 'react';
import Header from './components/header/Header';

function App() {
  let initialState = localStorage.getItem("profileComplete");
  const [isProfileComplete, setIsProfileComplete] = useState(initialState?JSON.parse(initialState):false);
  const [expenses, setExpenses] = useState([]);
  
  return (
    <Router>
      <Header isProfileComplete={isProfileComplete}/>
      <main className='main'>
        <Routes>
          <Route path="/" element={<Home setExpenses={setExpenses} expenses={expenses} />}/>
          <Route path="/signup" element={<SignUp/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/profile" element={<Profile 
            setIsProfileComplete={setIsProfileComplete}
            isProfileComplete={isProfileComplete}
          />}/>
        </Routes>
      </main>
    </Router>
  );
}

export default App;
