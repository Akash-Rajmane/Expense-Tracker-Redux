import { Routes, Route, useNavigate} from "react-router-dom";
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
import { logout } from "./store/authSlice";

function App() {
  let email  = useSelector(state=>state.auth.email).replace("@","").replace(".","");
  let initialState = localStorage.getItem("profileComplete");
  console.log(initialState);
  const [isProfileComplete, setIsProfileComplete] = useState(initialState?JSON.parse(initialState):false);
  const isLoggedIn = useSelector(state=>state.auth.isLoggedIn);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fetchExpenses = useCallback(async () => {
    try{
      let response = await fetch(`https://expense-tracker-803d3-default-rtdb.firebaseio.com/expenses${email}.json`);
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
  },[dispatch,email])
  
  useEffect(()=>{
    fetchExpenses();
  },[fetchExpenses])

    // Auto-logout after 59 minutes 
  useEffect(() => {
      let logoutTimer;
      if (isLoggedIn) {
      logoutTimer = setTimeout(() => {
        dispatch(logout());
        navigate("/login");
      }, 59 * 60 * 1000); //  minutes in milliseconds
      }

      // Clear the timer when the component unmounts or when the user logs in again
      return () => {
      clearTimeout(logoutTimer);
      };
  }, [isLoggedIn,dispatch,navigate]);

  useEffect(()=>{
    let user = localStorage.getItem("user");
    if(user){
      dispatch(login(JSON.parse(user)));
    }
  },[dispatch])

  
  
  return (
    <>
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
    </>
  );
}

export default App;
