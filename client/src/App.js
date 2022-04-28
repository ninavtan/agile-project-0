import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css";
import { useSelector } from 'react-redux';
import { Routes, Route, Navigate } from "react-router-dom";
import Board from './components/board';
import Home from './components/auth/home';
import { HomePage } from './components/HomePage';
import Auth from './components/auth/auth';
import { About } from './components/about';
import { userLogout } from "./components/actions/index.js";
import { useDispatch } from 'react-redux';

  const App = () => {
    const [auth, setAuth] = useState(null);
    const dispatch = useDispatch();

    const currentUser = useSelector(state => state.user);

    console.log('Is the user logged in? ' + currentUser.isLoggedIn);

    useEffect(() => {
      let user = localStorage.getItem("user");
      user && JSON.parse(user) ? setAuth(true) : setAuth(false);
      
    }, []);
  
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
    
        <Route path="/about"
          element={<About />}/>

        <Route path="/" element={<HomePage />}/>

       
      </Routes>

    );
  };

  export default App;

  