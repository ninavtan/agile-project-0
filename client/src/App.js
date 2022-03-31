import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css";
import { useSelector } from 'react-redux';
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Board from './components/board';
import Home from './components/auth/home';
import Auth from './components/auth/auth';
import NavBar from './components/navbar';
import { userLogout } from "./components/actions/index.js";
import { useDispatch } from 'react-redux';

  const App = () => {
    const [auth, setAuth] = useState(null);
    const dispatch = useDispatch();

    const currentUser = useSelector(state => state.user);
    // if currentUser is true, set auth to true.

    console.log('Is the user logged in? ' + currentUser.isLoggedIn);
   
    // Gets the 'user' item from localStorage to check if the session is persisting.
    useEffect(() => {
      let user = localStorage.getItem("user");
      user && JSON.parse(user) ? setAuth(true) : setAuth(false);
      
    }, []);
  
    // If auth is true, sets a session in localStorage.
    useEffect(() => {
      localStorage.setItem("user", auth);
    }, [currentUser, auth]);
  
    useEffect(() => {
      dispatch(userLogout);
    }, [auth])

    return (
      <Routes>
        {!auth && (
          <Route
            path="/auth"
            element={<Auth authenticate={() => setAuth(true)} />}
          />
        )}
  
        {auth && (
          <>
            <Route
              path="/boards"
              element={<Home logout={() => setAuth(false)} />}
            >
               <Route path=":boardId" element={<Board />} />
            </Route>
          </>
        )}

        <Route path="*" 
          element=
            {<Navigate to={auth ? "/boards" : "/auth"}/>}
         />
       
      </Routes>

    );
  };

  export default App;

  