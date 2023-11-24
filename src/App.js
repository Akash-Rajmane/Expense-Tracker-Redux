import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import { useEffect, useState, useCallback } from 'react';
import './App.css';
import SignUp from './pages/signup/SignUp';
import Login from './pages/login/Login';
import Home from './pages/home/Home';
import Profile from "./pages/profile/Profile";
import Header from './components/header/Header';
import EditExpense from './pages/edit-expense/EditExpense';
import { useDispatch, useSelector } from 'react-redux';
import {login} from "./store/authSlice";
import { setExpenses } from './store/expenseSlice';
import ProtectedRoute from "./components/protected-route/ProtectedRoute";

function App() {
  let initialState = localStorage.getItem("profileComplete");
  const [isProfileComplete, setIsProfileComplete] = useState(initialState?JSON.parse(initialState):false);
  const isLoggedIn = useSelector(state=>state.auth.isLoggedIn);
  const dispatch = useDispatch();

  const fetchExpenses = useCallback(async () => {
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
        dispatch(setExpenses(arr));
      }else{
        result = await response.json();
        throw new Error(result.error);
      }
    }catch(err){  
      console.log(err);
    }
  },[dispatch])
  
  useEffect(()=>{
    fetchExpenses();
  },[fetchExpenses])

  useEffect(()=>{
    let user = localStorage.getItem("user");
    if(user){
      dispatch(login(JSON.parse(user)));
    }
  },[dispatch])

  
  
  return (
    <Router>
      <Header isProfileComplete={isProfileComplete}/>
      <main className='main'>
        <Routes>
          {!isLoggedIn && <Route path="/signup" element={<SignUp/>}/>}
          {!isLoggedIn && <Route path="/login" element={<Login/>}/>}
          <Route path="/" element={
            <ProtectedRoute>
              <Home/>
            </ProtectedRoute>
          }
          />
          <Route path="/edit/:key" element={<ProtectedRoute><EditExpense/></ProtectedRoute>} />
          <Route path="/profile" element={
            <ProtectedRoute>
              <Profile 
                setIsProfileComplete={setIsProfileComplete}
                isProfileComplete={isProfileComplete}
             />
            </ProtectedRoute>
            }
          />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
