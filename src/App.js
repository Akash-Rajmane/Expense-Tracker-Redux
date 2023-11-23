import './App.css';
import SignUp from './pages/signup/SignUp';
import Login from './pages/login/Login';
import Home from './pages/home/Home';
import Profile from "./pages/profile/Profile";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import { useEffect, useState } from 'react';
import Header from './components/header/Header';
import EditExpense from './pages/edit-expense/EditExpense';

function App() {
  let initialState = localStorage.getItem("profileComplete");
  const [isProfileComplete, setIsProfileComplete] = useState(initialState?JSON.parse(initialState):false);
  const [expenses, setExpenses] = useState([]);

  const fetchExpenses = async () => {
    try{
      let response = await fetch("https://expense-tracker-803d3-default-rtdb.firebaseio.com/expenses.json");
      let result;
      if(response.ok){
        result = await response.json();
        let arr = [];
        for(let key in result){
          let expense = {
            key,
            ...result[key],
          }
          arr.push(expense);
        }
        setExpenses(arr);
      }else{
        result = await response.json();
        throw new Error(result.error);
      }
    }catch(err){  
      console.log(err);
    }
  }
  
  useEffect(()=>{
    fetchExpenses()
  },[])
  
  return (
    <Router>
      <Header isProfileComplete={isProfileComplete}/>
      <main className='main'>
        <Routes>
          <Route path="/" element={<Home setExpenses={setExpenses} expenses={expenses} />}/>
          <Route path="/signup" element={<SignUp/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/edit/:key" element={<EditExpense expenses={expenses} setExpenses={setExpenses}/>} />
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
